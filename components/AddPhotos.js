import React, { useState, useEffect } from 'react';
import { storage } from '../utils/firebase';
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject, getMetadata, uploadString } from 'firebase/storage';
import Modal from 'react-modal';
import '../src/app/globals.css';
import Link from 'next/link';

const AddPhotos = () => {
  const [image, setImage] = useState(null);
  const [albumName, setAlbumName] = useState('');
  const [albums, setAlbums] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [editedMemoryTitle, setEditedMemoryTitle] = useState('');
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const openModal = (photoUrl, albumName) => {
    setSelectedPhoto(photoUrl);
    setSelectedAlbum(albumName);
    setModalOpen1(true);
  };

  const getAlbumName = (photoUrl) => {
    const urlParts = photoUrl.split('/');
    const albumName = urlParts[urlParts.length - 2];
    return albumName || null;
  };

  const handleUpdateMemoryTitle = () => {
    if (!selectedPhoto || !editedMemoryTitle) return;

    const albumName = getAlbumName(selectedPhoto);
    const album = albums.find((album) => album.name === albumName);
    const photoIndex = album ? album.photos.findIndex((url) => url === selectedPhoto) : -1;
    if (photoIndex !== -1) {
      const updatedAlbums = [...albums];
      updatedAlbums.find((album) => album.name === albumName).photos[photoIndex] = editedMemoryTitle;
      setAlbums(updatedAlbums);
    }

    setEditedMemoryTitle('');
    setModalOpen1(false);
  };

  const handleDeleteAlbum = async () => {
    if (!selectedAlbum) return;
  
    const albumRef = ref(storage, `albums/${selectedAlbum}`);
  
    await listAll(albumRef)
      .then((res) => {
        const deletePromises = res.items.map((item) => deleteObject(item));
        return Promise.all(deletePromises);
      })
      .then(() => {
        deleteObject(albumRef) // Delete the album directory itself
          .then(() => {
            setAlbums((prevAlbums) =>
              prevAlbums.filter((prevAlbum) => prevAlbum.name !== selectedAlbum)
            );
  
            setModalOpen1(false);
  
            console.log('Album deleted successfully!');
            window.location.reload(); // Auto refresh the page
          })
          .catch((error) => {
            if (error.code === 'storage/object-not-found') {
              // Ignore the error if the album directory does not exist
              console.log('Album does not exist in Firebase Storage.');
              setModalOpen1(false);
            } else {
              console.error('Failed to delete album:', error);
            }
          });
      })
      .catch((error) => {
        console.error('Failed to delete album:', error);
      });
  };

  const createAlbumIfNeeded = async () => {
    const albumsRef = ref(storage, 'albums');
    const albumsMetadata = await getMetadata(albumsRef).catch(() => null);

    if (!albumsMetadata || !albumsMetadata.isDirectory) {
      const placeholderFileRef = ref(albumsRef, '__placeholder__');
      await uploadString(placeholderFileRef, '');
      await deleteObject(placeholderFileRef);
    }
  };

  const handleSubmit = async () => {
    if (!image || !albumName) {
      setError('Please choose a file and provide an album name.');
      return;
    }

    setError('');

    await createAlbumIfNeeded();

    const albumRef = ref(storage, `albums/${albumName}`);
    const imageRef = ref(albumRef, image.name);

    await uploadBytes(imageRef, image);
    const downloadURL = await getDownloadURL(imageRef);

    const updatedAlbums = albums.map((album) => {
      if (album.name === albumName) {
        return {
          ...album,
          photos: [...album.photos, downloadURL],
        };
      }
      return album;
    });

    setAlbums(updatedAlbums);
    setImage(null);

    console.log('Image uploaded successfully!');
    setModalOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    const fetchAlbums = async () => {
      await createAlbumIfNeeded();

      const albumsRef = ref(storage, 'albums');
      const albumsList = await listAll(albumsRef);

      const albumsData = await Promise.all(
        albumsList.prefixes.map(async (albumRef) => {
          const albumName = albumRef.name;
          const photosRef = ref(storage, `albums/${albumName}`);
          const photosList = await listAll(photosRef);

          const photosData = await Promise.all(
            photosList.items.map(async (photoRef) => {
              const downloadURL = await getDownloadURL(photoRef);
              return downloadURL;
            })
          );

          return {
            name: albumName,
            photos: photosData,
          };
        })
      );

      setAlbums(albumsData);
    };

    fetchAlbums();
  }, []);

  return (
    <div className="container">
      <div className="membutton">
        <button onClick={() => setModalOpen(true)}>Add Memory</button>
      </div>

      <div className="album-grid">
        {albums.map((album) => (
          <div key={album.name} className="album-container">
            <h3>{album.name}</h3>
            {album.photos.map((photoUrl) => (
              <img
                key={photoUrl}
                src={photoUrl}
                alt="Album Photo"
                className="album-photo"
                onClick={() => openModal(photoUrl, album.name)}
              />
            ))}
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="modal"
        overlayClassName="modal-overlay"
        contentLabel="Add Memory"
      >
        <button className="modal-close" onClick={() => setModalOpen(false)}>
          X
        </button>
        <h2>Add Memory</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input type="file" onChange={handleImageChange} />
        <input
          type="text"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
          placeholder="Album Name"
        />
        <button onClick={handleSubmit}>Upload</button>
      </Modal>

      <Modal
        isOpen={modalOpen1}
        onRequestClose={() => setModalOpen1(false)}
        className="modal"
        overlayClassName="modal-overlay"
        contentLabel="Photo Modal"
      >
        <button className="modal-close" onClick={() => setModalOpen1(false)}>
          X
        </button>
        {selectedPhoto && (
          <div className="photo-details">
            <img src={selectedPhoto} alt="Selected Photo" className="selected-photo" />
            <div className="photo-actions">
              <input
                type="text"
                value={editedMemoryTitle}
                onChange={(e) => setEditedMemoryTitle(e.target.value)}
                className="edit-input"
              />
              <button className="edit-button" onClick={handleUpdateMemoryTitle}>
                Update
              </button>
              <button className="delete-button" onClick={handleDeleteAlbum}>
                Delete
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AddPhotos;
