"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
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
    <div className="absolute top-0 left-0 w-full px-20 max-sm:px-6 py-4 max-sm:py-3 flex gap-10 items-center">
      <div className="flex gap-4 items-center">
        <Image src="/images/logo.png" alt="" width={35} height={35} />
        <h2 className="text-xl font-bold text-text_color">Prostock</h2>
      </div>

      <div className="h-6 w-[2px] bg-text_color" />

      <div className="flex gap-6">
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
  );
}

export default Navbar;
