"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import {
  IoTimeOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoArrowForward,
  IoArrowBackOutline,
} from "react-icons/io5";

function Page({ params }) {
  const [user, setUser] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    createdAt: "",
    phone_number: "",
    gender: "",
  });
  const [holdings, setHoldings] = useState([]);
  const [history, setHistory] = useState([]);
  const [Invested, setInvested] = useState(0);
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const combineStocks = (data) => {
    const result = data.reduce((acc, curr) => {
      const stockName = curr.stock.stockName;
      const stockKey = curr.stock.instrumentKey;

      // Check if the stock name already exists in the accumulator
      if (acc[stockName]) {
        acc[stockName].buyPrice += curr.buyPrice; // Add buyPrice
        acc[stockName].quantity += curr.quantity; // Add quantity
      } else {
        // Initialize the stock in the accumulator
        acc[stockName] = {
          stockName,
          price: curr.stock.price,
          instrumentKey: stockKey,
          buyPrice: curr.buyPrice,
          quantity: curr.quantity,
        };
      }

      return acc;
    }, {});

    // Convert the result back to an array
    return Object.values(result);
  };

  const fetchUsers = async () => {
    const ID = await params?.ID;
    const token = await Cookies.get("access_token");

    try {
      const res = await axios.post(
        "https://groww-server.vercel.app/admin/getReadonlydetails",
        { userId: ID, headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res?.data?.users?.users);
      setHistory(res?.data?.users?.history);
      const holdings = combineStocks(res?.data?.users?.holdings);
      setHoldings(holdings);

      let total = Invested;
      holdings?.map((item) => (total += item?.buyPrice));
      setInvested(total.toFixed(2));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <section className="w-5/6 h-screen max-sm:w-full max-sm:left-0 absolute right-0 px-8 py-4 max-sm:px-4 text-slate-800">
      <h2 className="text-2xl font-bold font-sans">User Details</h2>

      <div className="mt-6 flex flex-col gap-4">
        <div className="flex gap-4  items-center w-full  rounded-md px-4 py-3 bg-slate-500/10 ">
          <div className="h-14 w-14 flex justify-center uppercase items-center text-lg font-semibold text-white rounded-full bg-slate-700 ">
            {user?.name?.split(" ")[0][0]}
            {user?.name?.split(" ")?.[1]
              ? user?.name?.split(" ")?.[1]?.[0]
              : user?.name?.split(" ")[0][1]}
          </div>
          <div>
            <h2 className="font-semibold text-lg">{user.name}</h2>
            <h2 className="text-sm">{user.email}</h2>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full bg-slate-500/10  rounded-md px-4 py-3 ">
          <h2 className="text-lg font-semibold">Personal Information</h2>

          <div className="flex gap-20 justify-between capitalize    ">
            <div>
              <h2 className="font-medium ">Mobile Number</h2>
              <h2>{user?.phone_number}</h2>
            </div>

            <div>
              <h2 className="font-medium">Gender</h2>
              <h2>{user?.gender}</h2>
            </div>

            <div>
              <h2 className="font-medium">Added</h2>
              {user.createdAt && <h2>{formatTimestamp(user.createdAt)}</h2>}
            </div>

            <div>
              <h2 className="font-medium">Bank Name</h2>
              <h2>{user?.bank_name || "Not added"}</h2>
            </div>

            <div>
              <h2 className="font-medium">Acc Number</h2>
              <h2>{user?.bank_account_number || "Not added"}</h2>
            </div>

            <div>
              <h2 className="font-medium">Acc Type</h2>
              <h2>{user?.bank_account_type || "Not added"}</h2>
            </div>
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="flex h-[25.4rem] w-1/2 flex-col gap-4">
            <div className="flex gap-4 ">
              <div className="flex flex-col justify-center items-center h-40 w-full rounded-md bg-slate-500/10 ">
                <h2 className="text-2xl font-semibold">{user?.balance}</h2>
                <h2>Balance</h2>
              </div>

              <div className="flex flex-col justify-center items-center h-40 w-full rounded-md bg-slate-500/10">
                <h2 className="text-2xl font-semibold">{Invested}</h2>
                <h2>Invested</h2>
              </div>

              {/* <div className="flex  flex-col justify-center items-center h-40 w-full rounded-md bg-slate-500/10">
                <h2 className="text-2xl font-semibold">+20,000</h2>
                <h2>Current</h2>
              </div> */}
            </div>

            <div className="py-2 h-full rounded-md bg-slate-500/10">
              <div className="flex px-6 pb-2 capitalize gap-2 font-medium border-b-[.1px] border-slate-500/30">
                <h2 className="w-5/6">Holdings</h2>
                <h2 className="w-1/6">quantity</h2>
                <h2 className="w-3/12  text-end">amount</h2>
              </div>

              <div className="mt-2 overflow-y-auto h-[11rem]">
                {holdings.length > 0 ? (
                  holdings?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex px-6 w-full gap-2 pb-1 border-b-[.1px] border-slate-500/30"
                      >
                        <h2 className="w-5/6">{item?.stockName}</h2>
                        <h2 className="w-1/6 pl-6">{item?.quantity}</h2>
                        <h2 className="w-3/12  font-semibold text-end">
                          {(item?.quantity * item?.buyPrice).toFixed(2)}
                        </h2>
                      </div>
                    );
                  })
                ) : (
                  <div className="w-full h-full flex justify-center items-center">
                    <h2>Not have any Holdings</h2>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="py-2 h-[25.4rem] w-1/2 rounded-md bg-slate-500/10">
            <h2 className="px-6 pb-2 font-medium border-b-[.1px] border-slate-500/30">
              History
            </h2>

            <div className="overflow-y-auto  h-[22.4rem]">
              {history.length > 0 ? (
                history?.map((item, index) => {
                  return (
                    <div key={index}>
                      {item?.TransactionType === "withdrawal" && (
                        <div className="flex flex-col px-6 w-full pt-2 pb-3 border-b-[.1px] border-slate-500/30">
                          <div className="flex justify-between text-sm">
                            <div className="flex gap-1 items-center">
                              <IoArrowForward className="-rotate-[45deg]" />
                              {/* <IoArrowBackOutline className="-rotate-[45deg]" /> */}
                              <h2>Mony withdraw</h2>
                            </div>
                            <h2>{formatTimestamp(item?.createdAt)}</h2>
                          </div>
                          <div className="flex justify-between items-center">
                            <h2 className="text-end font-semibold">
                              {item?.amount}
                            </h2>

                            {item?.status === "Pending" && (
                              <IoTimeOutline className=" text-xl" />
                            )}

                            {item?.status === "Approved" && (
                              <IoCheckmarkCircleOutline className=" text-xl" />
                            )}

                            {item?.status === "Rejected" && (
                              <IoCloseCircleOutline className=" text-xl" />
                            )}
                          </div>
                        </div>
                      )}

                      {item?.TransactionType === "order" && (
                        <div className="flex flex-col  px-6 w-full pt-2 pb-3 border-b-[.1px] border-slate-500/30">
                          <div className="flex justify-between text-sm">
                            <h2>{item?.type === "buy" ? "Buy" : "Sell"}</h2>
                            <h2>{formatTimestamp(item?.createdAt)}</h2>
                          </div>
                          <div className="flex justify-between">
                            <h2 className="font-semibold">jio finance</h2>
                            <div className="w-1/4 justify-between flex">
                              <h2>3</h2>
                              <h2 className="w-2/4 text-end font-semibold">
                                {item?.buyPrice.toFixed(2)}
                              </h2>
                            </div>
                          </div>
                        </div>
                      )}

                      {item?.TransactionType === "payment" && (
                        <div className="flex flex-col px-6 w-full pt-2 pb-3 border-b-[.1px] border-slate-500/30">
                          <div className="flex justify-between text-sm">
                            <div className="flex gap-1 items-center">
                              <IoArrowBackOutline className="-rotate-[45deg]" />
                              <h2>Mony Added</h2>
                            </div>
                            <h2>{formatTimestamp(item?.createdAt)}</h2>
                          </div>
                          <div className="flex justify-between items-center">
                            <h2 className="text-end font-semibold">
                              {item?.amount}
                            </h2>

                            {item?.status === "Pending" && (
                              <IoTimeOutline className=" text-xl" />
                            )}

                            {item?.status === "Approved" && (
                              <IoCheckmarkCircleOutline className=" text-xl" />
                            )}

                            {item?.status === "Rejected" && (
                              <IoCloseCircleOutline className=" text-xl" />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <h2>Not have any History</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
