"use client";
import { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";

import { ReactNode } from "react";
import axios from "axios";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const checkUser = async () => {
    try {
      const token = await Cookies.get("access_token");
      if (!token) {
        setLoading(false);
        router.push("/dashboard");
      }
      const res = await axios.get(
        "https://groww-server.vercel.app/admin/checkadmin",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAuthenticated(true);
      setLoading(false);

      if (pathname === "/dashboard") {
        router.push("/dashboard/home");
      }
    } catch (error) {
      console.log(error);
      setAuthenticated(true);
      setLoading(false);
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (!loading && authenticated) {
    return (
      <section className="select-none max-sm:pt-10 pt-0 flex h-screen max-sm:h-fit">
        {pathname !== "/dashboard" && <Sidebar />}
        {children}
      </section>
    );
  } else {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading size={"large"} />
      </div>
    );
  }
}
