"use client";

import React from "react";
import axios from "axios";

function DownloadAPK() {
  const handleDownload = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api", {
        responseType: "blob", // Important to handle file downloads
      });

      // Create a blob from the response and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "prostock.apk"); // Specify the file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading APK:", error);
      alert("An error occurred while downloading the APK. Please try again.");
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="single-element flex items-center justify-center mt-6 h-12 w-44 font-bold uppercase text-white bg-theme_color rounded-md"
    >
      Download now
    </button>
  );
}

export default DownloadAPK;
