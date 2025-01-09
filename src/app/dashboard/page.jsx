import Link from "next/link";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const page = () => {
  const list = [
    {
      name: "Credit requests",
      path: "/dashboard/credits",
    },
    {
      name: "Withdrawal requests",
      path: "/dashboard/Withdrawals",
    },
    {
      name: "customers",
      path: "/dashboard/customers",
    },
    {
      name: "analytics",
      path: "/dashboard/analytics",
    },
  ];
  return (
    <>
      <section className="w-5/6 max-sm:w-full absolute top-0 right-0 flex flex-col  h-screen justify-center gap-3 px-16 pt-8 pb-6 text-text_color">
        <h2 className="text-4xl font-semibold text-950">Welcome to</h2>
        <h2 className="text-3xl font-semibold text-950">
          Our Prostock dashboard!
        </h2>
        <h2 className="mt-3 text-xl w-[60%]">
          Here, you can track your Orders performance, manage orders, and make
          data-driven decisions to grow your business.
        </h2>

        <div className="mt-8 flex gap-1">
          {list.map((item, index) => {
            return (
              <Link
                href={item?.path}
                key={index}
                className="flex gap-1 items-center h-8 px-2 hover:text-blue-800 text-base rounded-md capitalize"
              >
                {item?.name}
                <IoIosArrowForward className="mt-[2px]" />
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default page;
