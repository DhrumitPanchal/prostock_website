"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function Page() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "https://groww-server.vercel.app/auth/login",
        {
          ...data,
        }
      );
      console.log(response?.data);
      setLoading(false);

      Cookies.set("access_token", response.data?.tokens?.access_token);
      Cookies.set("refresh_token", response.data?.tokens?.refresh_token);
      router.push("/dashboard/home");
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.msg);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form className="px-6 py-4 h-[20rem] w-[30rem] rounded-md bg-gray-400/10 text-slate-800">
        <h2 className="text-2xl font-semibold">Login</h2>

        <div className="mt-10 flex flex-col gap-4">
          <input
            className="w-full px-3 py-2 rounded-md bg-transparent border-slate-400 border-[1px] focus:outline-none"
            type="email"
            placeholder="Email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />
          <input
            className="w-full px-3 py-2 rounded-md bg-transparent border-slate-400 border-[1px] focus:outline-none"
            type="password"
            placeholder="Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
        </div>

        {!loading ? (
          <button
            type="submit"
            onClick={() => login()}
            className="cursor-pointer mt-14 h-12 flex justify-center items-center rounded-md py-3 bg-slate-800 w-full text-white font-semibold "
          >
            Login
          </button>
        ) : (
          <div className="flex h-12 justify-center mt-14 rounded-md py-3 bg-slate-800/80 w-full text-white font-semibold ">
            <Loading size={"small"} />
          </div>
        )}
      </form>
    </div>
  );
}

export default Page;
