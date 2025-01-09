"use client";
import WithdrawalCard from "@/app/components/WithdrawalCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface User {
  name: string;
  bank_account_number: string;
  bank_account_type: string;
  bank_ifsc_number: string;
  bank_name: string;
}

interface Withdrawal {
  _id: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  userId: User; // Change userId to User type
  status: string;
}

const Page = () => {
  const [data, setData] = useState<Withdrawal[]>([]); // Original fetched data
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
    <section className="w-5/6 max-sm:w-full max-sm:left-0 absolute right-0 px-8 py-4 max-sm:px-4 text-slate-800">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-sans">Withdrawals Requests</h2>

        {/* <div className="bg-gray-100 py-1 px-2 rounded-md">
          <select
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-transparent w-40 capitalize"
          >
            {statusOptions.map((item, index) => (
              <option key={index} className="px-4 capitalize" value={item}>
                {item}
              </option>
            ))}
          </select>
        </div> */}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        data.map((item, index) => <WithdrawalCard key={index} Data={item} />)
      )}
    </section>
  );
};

export default Page;
