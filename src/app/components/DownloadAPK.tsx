"use client";

function DownloadAPK() {
  const handleDownload = () => {
    const url =
      "https://drive.google.com/file/d/1Jw5pecACw6LWKCNYQeGhKJkmlAse1kBY/view?usp=drive_link";
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "ProStock.apk";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <>
      <button
        className="single-element flex items-center justify-center mt-6 h-12 w-44 font-bold uppercase text-white bg-theme_color rounded-md"
        onClick={handleDownload}
      >
        Download now
      </button>
    </>
  );
}

export default DownloadAPK;
