import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  const socialLinks = [
    { icon: "/images/facebook.png", link: "#" },
    { icon: "/images/twitter.png", link: "#" },
    { icon: "/images/instagram.png", link: "#" },
    { icon: "/images/linkedin.png", link: "#" },
    { icon: "/images/youtube.png", link: "#" },
    { icon: "/images/telegram.png", link: "#" },
  ];

  return (
    <>
      <div className="px-44 py-10 flex  bg-[#f0f0f2]">
        <div className="w-1/3 flex flex-col gap-2 text-base font-semibold text-text_lite_color">
          <div className="flex gap-3 items-center">
            <Image
              className="h-12 w-fit"
              src={"/images/logo.png"}
              alt=""
              width={1000}
              height={1000}
            />
            <h2 className="text-text_color font-bold text-3xl ">Prostock</h2>
          </div>
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            aspernatur quod, cum ducimus non illo natus officiis ipsam nemo
            vitae.
          </h2>
          <h2>+91 9725393939</h2>
          <h2>example123@gmail.com</h2>
        </div>

        <div className="w-1/4 flex flex-col items-center mx-auto gap-4">
          <h2 className="text-text_color font-bold text-2xl ">Quick Links</h2>
          <ul className="flex flex-col gap-2 text-lg text-text_color font-semibold">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/#about">About Us</Link>
            </li>
            <li>
              <Link href="/#why-prostock">Why Prostock</Link>
            </li>
            <li>
              <Link href="/#Testimonials">Testimonials</Link>
            </li>
          </ul>
        </div>

        <div className="w-1/3 flex flex-col mx-auto gap-4">
          <h2 className="text-text_color font-bold text-2xl ">contact us</h2>
          <div className="flex gap-3 w-full">
            {socialLinks.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item?.link}
                  className="h-12 w-12 flex justify-center items-center rounded-full bg-white "
                >
                  <Image
                    className="h-6 w-6"
                    src={item?.icon}
                    alt=""
                    width={1000}
                    height={1000}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-44 mb-4 flex flex-col gap-4 justify-center   bg-[#f0f0f2]">
        <div className="h-[.8px] w-full bg-text_color" />
        <h2>@2024-2025 Prostock. All rights reserved, Built with in India</h2>
      </div>
    </>
  );
}

export default Footer;
