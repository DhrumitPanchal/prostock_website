"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoBagOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { IoStatsChartSharp } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import { HiMiniBars3 } from "react-icons/hi2";

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  console.log(pathname);
  const list = [
    {
      name: "Credit requests",
      path: "/dashboard/credits",
      icon: <IoBagOutline />,
    },
    {
      name: "Withdrawal requests",
      path: "/dashboard/Withdrawals",
      icon: <BsStars />,
    },
    {
      name: "customers",
      path: "/dashboard/users",
      icon: <IoPersonOutline />,
    },
    // {
    //   name: "analytics",
    //   path: "/dashboard/analytics",
    //   icon: <IoStatsChartSharp />,
    // },
  ];
  return (
    <>
      <aside className="max-sm:hidden fixed top-0 left-0 h-screen flex flex-col w-1/6 px-4 py-2 gap-4 bg-100 text-text_color bg-gray-100">
        <Link className="flex gap-4 items-center" href={"/"}>
          <div className="single-element">
            <Image
              className=" h-[2.6rem] w-[2.6rem]"
              src="/images/logo.png"
              alt=""
              width={1000}
              height={1000}
            />
          </div>
          <h2 className="text-2xl font-semibold ">Prostock</h2>
        </Link>

        <div className="flex flex-col gap-1">
          <h2 className="text-sm text-400 uppercase ">geneal</h2>
          <div className="flex flex-col gap-2">
            {list.map((item, index) => {
              return (
                <Link key={index} href={item.path}>
                  <div
                    className={`flex h-10 items-center gap-2 capitalize text-lg pl-4 rounded-md ${
                      pathname.includes(item.path)
                        ? "bg-slate-800 text-slate-200"
                        : "bg-100 text-gray-600 hover:text-gray-900"
                    }  `}
                  >
                    {item.icon}
                    <p>{item.name}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* <div className="cursor-pointer mt-auto mb-2 w-full h-10 flex items-center gap-2 pl-4 rounded-md bg-slate-800 text-50">
        <IoIosArrowBack className="text-[20px] mb-[.1px]" />
        <p>Back to Home</p>
      </div> */}
      </aside>

      <aside
        className={`${
          menuOpen ? "max-sm:left-0" : "max-sm:-left-[100%]"
        } z-50 fixed top-0 left-0 h-screen max-sm:flex hidden flex-col w-[84%] px-4 py-2 gap-4 bg-100 max-sm:transition-all max-sm:duration-300`}
      >
        <Link href={"/"}>
          <div className="single-element">
            <Image
              className=" h-[2.6rem] w-[2.6rem]"
              src="/images/logo.png"
              alt=""
              width={1000}
              height={1000}
            />
          </div>
        </Link>

        <div className="flex flex-col gap-1">
          <h2 className="text-sm text-400 uppercase">geneal</h2>
          <div className="flex flex-col gap-2">
            {list.map((item, index) => {
              return (
                <Link
                  onClick={() => setMenuOpen(false)}
                  key={index}
                  href={item.path}
                >
                  <div
                    className={`flex h-10 items-center gap-2 capitalize text-lg pl-4 rounded-md ${
                      pathname.includes(item.path)
                        ? "bg-slate-800 text-slate-200"
                        : "bg-100 text-gray-600 hover:text-gray-900"
                    }  `}
                  >
                    {item.icon}
                    <p>{item.name}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* <div className="cursor-pointer mt-auto mb-2 w-full h-10 flex items-center gap-2 pl-4 rounded-md bg-slate-800 text-50">
        <IoIosArrowBack className="text-[20px] mb-[.1px]" />
        <p>Back to Home</p>
      </div> */}
      </aside>

      <div
        onClick={() => setMenuOpen(!menuOpen)}
        className="hidden h-12 max-sm:flex px-4 justify-between  items-center absolute top-0 left-0 w-full "
      >
        <Link href={"/"}>
          <div className="single-element">
            <Image
              className=" h-[2.6rem] w-[2.6rem]"
              src="/images/logo.png"
              alt=""
              width={1000}
              height={1000}
            />
          </div>
        </Link>

        <div className="mt-[1px] h-8 w-8 flex justify-center rounded-md items-center bg-slate-900 text-100">
          {!menuOpen ? (
            <HiMiniBars3 className={"text-xl"} />
          ) : (
            <RxCross2 className={"text-xl"} />
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
