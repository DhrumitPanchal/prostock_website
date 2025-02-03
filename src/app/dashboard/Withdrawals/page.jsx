"use client";
import Loading from "@/app/components/Loading";
import WithdrawalCard from "@/app/components/WithdrawalCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [data, setData] = useState([]); // Original fetched data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch data from API
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://groww-server.vercel.app/payment/getallwithdrawals"
      );

      const withdrawals = response.data?.data || [];

      // Reverse the data without mutating the original array
      const reversedData = [...withdrawals].reverse();

      const filter = reversedData?.filter((item) => item.status === "Pending");
      setData(filter);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.message || "An error occurred while fetching data.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  // Filter data whenever `selectedStatus` changes

  // Fetch data on component mount
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center h-screen items-center w-5/6 max-sm:w-full max-sm:left-0 absolute right-0 px-8 py-4 max-sm:px-4 text-slate-800">
          <Loading size={"large"} />
        </div>
      ) : (
        <section className="w-5/6 max-sm:w-full max-sm:left-0 absolute right-0 px-8 py-4 max-sm:px-4 text-slate-800">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold font-sans">
              Withdrawals Requests
            </h2>
          </div>

          {data.map((item, index) => (
            <WithdrawalCard key={index} Data={item} />
          ))}
        </section>
      )}
    </>
  );
};

export default Page;
