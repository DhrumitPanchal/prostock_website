import React, { useState } from "react";
import { formatTimestamp } from "../utils/DateAndTime";
import axios from "axios";
import { toast } from "sonner";


const CreditCard = ({ Data }) => {
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [status, setStatus] = useState(Data?.status);
  const { amount, createdAt, transactionId, utr } = Data;

  const handelAccept = async () => {
    setAcceptLoading(true);
    try {
      await axios.post(
        "https://groww-server.vercel.app/payment/updatepaymentstatus",
        {
          paymentId: Data._id,
          status: "Approved",
          userId: Data.userId,
          amount,
        }
      );

      setStatus("Approved");
      setAcceptLoading(false);
      toast.success("status updated successfully");
    } catch (error) {
      console.log(error);

      setAcceptLoading(false);
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handelReject = async () => {
    setRejectLoading(true);
    try {
      await axios.post(
        "https://groww-server.vercel.app/payment/updatepaymentstatus",
        {
          paymentId: Data._id,
          status: "Approved",
          userId: Data.userId,
          amount,
        }
      );
      setStatus("Rejected");
      setRejectLoading(false);
      toast.success("status updated successfully");
    } catch (error) {
      console.log(error);
      setRejectLoading(false);
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  return (
    <div className="py-2 rounded-xl flex flex-col gap-2 mt-4 bg-gray-100">
      <div className="flex capitalize justify-between px-4 border-b-[2px] border-gray-300 text-base pb-1 font-medium text-text_lite_color ">
        <h2 className="">{formatTimestamp(createdAt)}</h2>
        <h2>{status}</h2>
      </div>

      <div className="flex px-4 justify-between">
        <div className="flex w-3/4 flex-col text-base gap-1 ">
          <div className="flex gap-3 capitalize">
            <h2 className="w-[16%] font-medium">Transaction ID :</h2>
            <h2 className="font-medium text-gray-600">{transactionId}</h2>
          </div>
          <div className="flex gap-3 ">
            <h2 className=" w-[16%] capitalize  font-medium">UTR :</h2>
            <h2 className="font-medium text-gray-600">{utr}</h2>
          </div>
          <div className="flex gap-3 capitalize">
            <h2 className=" w-[16%]  font-medium">Amount :</h2>
            <h2 className="font-medium text-gray-600">
              <span className="mr-1">₹</span>
              {amount}
            </h2>
          </div>
        </div>
        {status === "Pending" && (
          <div className="flex pt-1 flex-col gap-2">
            {acceptLoading || rejectLoading ? (
              <div className="h-8 flex justify-center items-center rounded-[4px] text-white font-semibold w-32 bg-green-500/50">
                {rejectLoading ? (
                  <h2>Accept</h2>
                ) : (
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-200 animate-spin fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="transparent"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                )}
              </div>
            ) : (
              <button
                onClick={() => handelAccept()}
                className="h-8 rounded-[4px] text-white font-semibold w-32 bg-green-500"
              >
                Accept
              </button>
            )}
            {rejectLoading || acceptLoading ? (
              <div className="h-8 flex justify-center items-center rounded-[4px] text-white font-semibold w-32 bg-red-500/50">
                {acceptLoading ? (
                  <h2>Reject</h2>
                ) : (
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-200 animate-spin fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="transparent"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />{" "}
                  </svg>
                )}
              </div>
            ) : (
              <button
                onClick={() => handelReject()}
                className="h-8 rounded-[4px] text-white font-semibold w-32 bg-red-500"
              >
                Reject
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditCard;
