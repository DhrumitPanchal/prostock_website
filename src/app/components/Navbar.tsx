"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { usePathname } from "next/navigation";

function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const list = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/#about",
    },
    {
      name: "Why Prostock",
      path: "/#why-prostock",
    },
    {
      name: "Testimonials",
      path: "/#Testimonials",
    },
  ];

  return (
    <>
      <div className="absolute top-0 left-0 w-full px-20 max-sm:px-6 py-4 max-sm:py-3 flex gap-10 items-center max-sm:justify-between">
        <div className="flex gap-4 items-center">
          <div className="single-element">
            <Image
              className=" h-[2.6rem] w-[2.6rem]"
              src="/images/logo.png"
              alt=""
              width={1000}
              height={1000}
            />
          </div>
          <h2 className="text-2xl font-bold text-text_color">Prostock</h2>
        </div>

        <div className="h-6 w-[2px] bg-text_color max-sm:hidden" />
        <div onClick={() => setIsOpen(!isOpen)}>
          <FaBars className="hidden max-sm:block text-[1.8rem] text-text_color " />
        </div>
        <div className="flex gap-6 max-sm:hidden ">
          {list?.map((item, index) => (
            <Link
              className="text-xl font-bold text-text_color"
              href={item.path}
              key={index}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <div
        className={`hidden gap-6 max-sm:fixed max-sm:px-6 max-sm:py-3 max-sm:flex max-sm:flex-col max-sm:z-50 max-sm:top-0 ${
          isOpen ? "max-sm:left-0" : "max-sm:-left-full"
        } max-sm:h-screen max-sm:w-full transition-all duration-300 max-sm:bg-white`}
      >
        <div className="flex gap-4 items-center">
          <div className="single-element">
            <Image
              className=" h-[2.6rem] w-[2.6rem]"
              src="/images/logo.png"
              alt=""
              width={1000}
              height={1000}
            />
          </div>
          <h2 className="text-2xl font-bold text-text_color">Prostock</h2>
          <div className="ml-auto " onClick={() => setIsOpen(!isOpen)}>
            <FaTimes className="hidden max-sm:block text-[1.8rem] text-text_color" />
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-6 ">
          {list?.map((item, index) => (
            <Link
              onClick={() => setIsOpen(!isOpen)}
              className={`text-xl border-b-[2px] border-text_color pb-3 max-sm:text-[1.6rem] font-bold ${
                pathname === item?.name.split("/")[1]
                  ? "text-theme_color"
                  : "text-text_color"
              }`}
              href={item.path}
              key={index}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;
