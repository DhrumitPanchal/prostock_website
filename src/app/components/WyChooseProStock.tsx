"use client";

import React, { useState } from "react";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";

function WhyChooseProStock() {
  const [openIndex, setOpenIndex] = useState<
    { list: string; index: number } | undefined
  >(undefined);
  const whyChooseProStock = [
    {
      title: "User-Friendly Interface",
      content:
        "ProStock is built with simplicity in mind, offering a clean and intuitive interface that ensures a smooth user experience. It provides easy navigation for first-time users, streamlined processes for buying and selling stocks, and a minimal learning curve with clear tools and features.",
    },
    {
      title: "Real-Time Market Insights",
      content:
        "Stay ahead of the curve with live updates and accurate market data. ProStock ensures you never miss an opportunity to act with live stock prices, real-time market trends, and alerts to keep you informed of key changes.",
    },
    {
      title: "Full Trading Control",
      content:
        "ProStock puts you in the driver’s seat, giving you complete control over your investments. Buy and sell stocks seamlessly, tailor your portfolio according to your preferences, and execute trades instantly for faster decision-making.",
    },
    {
      title: "Affordable and Transparent",
      content:
        "Trade without worrying about high costs. ProStock offers competitive pricing with low brokerage charges and a transparent pricing model, ensuring you know exactly what you’re paying for.",
    },
    {
      title: "Advanced Trading Tools",
      content:
        "Enhance your trading strategy with powerful tools like technical charts for tracking stock performance, indicators for better market understanding, and portfolio tracking to monitor your investment performance.",
    },
    {
      title: "Built-In Security",
      content:
        "Your investments and data are safe with ProStock. The platform ensures secure transactions with advanced encryption, adopts a privacy-first approach, and delivers a reliable and uninterrupted trading experience.",
    },
    {
      title: "Accessible Anytime, Anywhere",
      content:
        "Trade on the go with ProStock’s mobile-optimized platform. Download the app for easy access across mobile, tablet, and desktop devices, ensuring fast and responsive trading anytime.",
    },
    {
      title: "Educational Support",
      content:
        "ProStock is your guide to smarter investing, offering blogs, tutorials, and trading tips for free. Beginners can explore resources to understand the stock market, while continuous updates keep users informed about the latest trends.",
    },
    {
      title: "Responsive Customer Support",
      content:
        "ProStock’s dedicated support team is available to answer your questions and resolve issues quickly. Reach out via email, WhatsApp, or chat for a smooth and hassle-free experience.",
    },
    {
      title: "Designed for Indian Investors",
      content:
        "ProStock is tailored for the unique needs of Indian traders and investors, with support for major Indian stock exchanges (NSE, BSE), low-cost trading options, and features designed to cater to the growing demand for stock market participation in India.",
    },
  ];

  const list1 = whyChooseProStock?.slice(0, 4);
  const list2 = whyChooseProStock?.slice(5, 9);

  return (
    <div className="mt-8 mg-10 w-full h-fit flex flex-wrap gap-10 max-sm:gap-4">
      <div className="w-[48%] max-sm:w-full flex flex-col gap-4">
        {list1.slice(0, 4).map((item, index) => {
          return (
            <div
              
              onClick={() =>
                setOpenIndex(
                  openIndex?.index === index && openIndex?.list === "first"
                    ? undefined
                    : { list: "first", index }
                )
              }
              key={index}
              className={`px-8 py-6 cursor-pointer rounded-lg ${
                openIndex?.index === index && openIndex?.list === "first"
                  ? "h-fit"
                  : "h-26"
              }  w-full flex flex-col gap-4 items-between justify-center transition-all duration-500  bg-slate-100`}
            >
              <div className="flex gap-4  h-10 items-center justify-between ">
                <h2 className="text-[1.4rem]  font-semibold text-text_color">
                  {item?.title}
                </h2>

                {openIndex?.index === index && openIndex?.list === "first" ? (
                  <FaAngleDown className="text-2xl text-text_color" />
                ) : (
                  <FaAngleRight className="text-2xl text-text_color" />
                )}
              </div>
              {openIndex?.index === index && openIndex?.list === "first" && (
                <p className=" font-semibold text-text_lite_color ">
                  {item?.content}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="w-[48%] max-sm:w-full flex flex-col gap-4">
        {list2.slice(0, 4).map((item, index) => {
          return (
            <div
              
              onClick={() =>
                setOpenIndex(
                  openIndex?.index === index && openIndex?.list === "second"
                    ? undefined
                    : { list: "second", index }
                )
              }
              key={index}
              className={`px-8 py-6 cursor-pointer rounded-lg ${
                openIndex?.index === index && openIndex?.list === "second"
                  ? "h-fit"
                  : "h-26"
              }  w-full flex flex-col gap-4 items-between justify-center transition-all duration-500  bg-slate-100`}
            >
              <div className="flex gap-4  h-10 items-center justify-between ">
                <h2 className="text-[1.4rem]  font-semibold text-text_color">
                  {item?.title}
                </h2>

                {openIndex?.index === index && openIndex?.list === "second" ? (
                  <FaAngleDown className="text-2xl text-text_color" />
                ) : (
                  <FaAngleRight className="text-2xl text-text_color" />
                )}
              </div>
              {openIndex?.index === index && openIndex?.list === "second" && (
                <p className=" font-semibold text-text_lite_color ">
                  {item?.content}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WhyChooseProStock;
