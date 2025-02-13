"use client";
import Loading from "@/app/components/Loading";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";

function Page() {
  const [ID, setID] = useState("");
  const [loading, setLoading] = useState(true);
  const [editLoading, setEditLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  const getPaymentID = async () => {
    try {
      const res = await axios.get(
        "https://groww-server.vercel.app/payment/paymentID"
      );
      setID(res.data.paymentID);
      console.log(res.data.paymentID);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch payment ID");
      setLoading(false);
    }
  };

  const ChangePaymentID = async () => {
    setEditLoading(true);
    try {
      const token = await Cookies.get("access_token");
      const res = await axios.post(
        "https://groww-server.vercel.app/payment/paymentID",
        { ID },
        { headers: { authorization: `Bearer ${token}` } }
      );
      setEditLoading(false);
      setID(res.data.paymentID);
      toast.success("Payment ID updated successfully");
      setEdit(false);
    } catch (err) {
      console.log(err);
      setEditLoading(false);
      toast.error("Failed to update payment ID");
    }
  };

  useEffect(() => {
    getPaymentID();
  }, []);

  return (
    <>
      {loading ? (
        <section className="w-5/6 flex justify-center h-screen items-center max-sm:w-full max-sm:left-0 absolute right-0 px-8 py-4 max-sm:px-4 text-slate-800">
          <Loading size="large" />
        </section>
      ) : (
        <section className="w-5/6 max-sm:w-full max-sm:left-0 absolute right-0 px-8 py-4 max-sm:px-4 text-slate-800">
          <h2 className="text-2xl font-bold font-sans">Payment ID</h2>

          <div className="my-6 flex justify-between items-center w-full ">
            <div className="py-4 px-6 w-full rounded-md flex items-center justify-between gap-4  bg-slate-700/10">
              <input
                type="text"
                name=""
                className=" text-xl w-full bg-transparent"
                value={ID}
                onChange={(e) => setID(e.target.value)}
                id=""
              />
              {edit ? (
                editLoading ? (
                  <button className="w-24 py-2 flex justify-center rounded-md bg-green-300 text-white font-semibold">
                    <Loading size="small" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      ChangePaymentID();
                    }}
                    className="w-24 py-2 rounded-md bg-green-500 text-white font-semibold"
                  >
                    Save
                  </button>
                )
              ) : (
                <button
                  onClick={() => {
                    setEdit(true);
                  }}
                  className="w-24 py-2 rounded-md bg-slate-800 text-white font-semibold"
                >
                  Change
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Page;
