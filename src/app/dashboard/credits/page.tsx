"use client";
import CreditCard from "@/app/components/CreditsCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface Withdrawal {
  status: string;
  // Add other properties of the withdrawal object here
}

const Page = () => {
  const [data, setData] = useState<Withdrawal[]>([]); // Original fetched data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch data from API
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://groww-server.vercel.app/payment/getallpayments"
      );
      console.log(response.data?.data);

      const credits = response.data?.data || [];

      // Reverse the data without mutating the original array
      const reversedData = [...credits].reverse();

      const filter = reversedData?.filter((item) => item.status === "Pending");
      setData(filter);

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      toast.error(error.message || "An error occurred while fetching data.");
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
        <h2 className="text-2xl font-bold font-sans">Credit Requests</h2>

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
        data.map((item, index) => <CreditCard key={index} Data={item} />)
      )}
    </section>
  );
};

export default Page;
