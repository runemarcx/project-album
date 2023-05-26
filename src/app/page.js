import Link from 'next/link';


const IndexPage = () => {
  return (
    <div className="">
      <header className="text-gray-600 body-font bg-blue-500">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <span className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-images"
              viewBox="0 0 16 16"
            >
              <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
              <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
            </svg>
            <span className="ml-3 text-xl">PhotoBooms</span>
          </span>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          </nav>
          <button>
            <Link href="/login">
              <span className="bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 px-4 rounded">
                Login
              </span>
            </Link>
          </button>
        </div>
      </header>
      <main className="mt-8">
      <img
          className="w-32 h-32 mx-auto mb-4"
          src="https://scontent.fdvo4-1.fna.fbcdn.net/v/t1.15752-9/349278619_2150411271831638_8011813468460155789_n.png?_nc_cat=110&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHZ88PqppelDXjzQBLmHXQMY7TJDiP49wljtMkOI_j3CToWxYZkhjFiiBqkOSbbIJbKYg0ljF-vO0cQvUM-hQkb&_nc_ohc=7lTfb8VqrqcAX8OKPvN&_nc_ht=scontent.fdvo4-1.fna&oh=03_AdSZAJR_WGwZliNLLB9-8oln9T4W8rmuYFvq_NU9iMe5Rw&oe=6497F378"
          alt="Logo"
        />
        <p className="text-xl mb-4 text-center text-style-italic">PhotoBooms. upload your memories!</p>
        <div className="flex flex-wrap -m-4">
          <div className="p-4 w-full md:w-1/3">
            <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
              <img
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src="https://g1.img-dpreview.com/8ABA6362533940E683F5870B45905762.jpg"
                alt="Photo 1"
              />
            </div>
          </div>
          <div className="p-4 w-full md:w-1/3">
            <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
              <img
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src="https://www.shootproof.com/blog/wp-content/uploads/2025/07/1-1-ratio_Morgan-Caddell-2191-scaled.jpg"
                alt="Photo 2"
              />
            </div>
          </div>
          <div className="p-4 w-full md:w-1/3">
            <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
              <img
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src="https://g2.img-dpreview.com/2E3F787848C541C3BB196015762B1CFD.jpg"
                alt="Photo 3"
              />
            </div>
          </div>
          <div className="p-4 w-full md:w-1/3">
            <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
              <img
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src="https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2012/10/image1.jpg?fit=500%2C500&ssl=1"
                alt="Photo 4"
              />
            </div>
          </div>
          <div className="p-4 w-full md:w-1/3">
            <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
              <img
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src="https://35hunter.files.wordpress.com/2019/04/7949859022_3d988322c0_z.jpg?w=640"
                alt="Photo 5"
              />
            </div>
          </div>
          <div className="p-4 w-full md:w-1/3">
            <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
              <img
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src="https://photographylife.com/wp-content/uploads/2017/08/Hells-Half-Acre-at-Sunset.jpg"
                alt="Photo 6"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IndexPage;
