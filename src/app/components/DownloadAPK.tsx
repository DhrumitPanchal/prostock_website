"use client";


function DownloadAPK() {


  return (
    <>
      <a
        href="/prostock.apk" // URL to the file in the public folder
        download="prostock.apk" // Suggests the filename to the browser
        className="single-element flex items-center justify-center mt-6 h-12 w-44 font-bold uppercase text-white bg-theme_color rounded-md"
      >
        Download now
      </a>
    </>
  );
}

export default DownloadAPK;
