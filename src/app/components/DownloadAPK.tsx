"use client";

function DownloadAPK() {
  const handleDownload = () => {
    const url =
      "https://media.githubusercontent.com/media/DhrumitPanchal/prostock_website/main/public/prostock.apk";
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
