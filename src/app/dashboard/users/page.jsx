"use client";
import Loading from "@/app/components/Loading";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import Cookies from "js-cookie";

function Page() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const fetchUsers = async () => {
    const token = await Cookies.get("access_token");

    try {
      const res = await axios.get(
        "https://groww-server.vercel.app/admin//getallusers",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = res.data?.users.reverse();
      setUsers(user);
      setLoading(false);
      setFilteredUsers(user);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(search);
    const handelSearch = () => {
      const lowercaseSearch = search.toLowerCase();
      const filtered = users?.filter((user) =>
        user?.name?.toLowerCase()?.includes(lowercaseSearch)
      );
      setFilteredUsers(filtered);
    };
    handelSearch();
  }, [search, users]);
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      {loading ? (
        <section className="w-5/6 flex justify-center h-screen items-center max-sm:w-full max-sm:left-0 absolute right-0 px-8 py-4 max-sm:px-4 text-slate-800">
          <Loading />
        </section>
      ) : (
        <section className="w-5/6 max-sm:w-full max-sm:left-0 absolute right-0 px-8 py-4 max-sm:px-4 text-slate-800">
          <h2 className="text-2xl font-bold font-sans">User management</h2>

          <div className="my-6 flex justify-between items-center w-full ">
            <div className="text-xl flex gap-2 text-slate-800 font-semibold">
              <h2>All Users </h2>
              <h2 className="mt-[.1px] text-slate-600">{users.length}</h2>
            </div>

            <div className="flex items-center gap-4 px-2 py-1 border-2 border-slate-800 rounded-md ">
              <IoSearchOutline className="text-slate-800" />

              <input
                type="text"
                placeholder="Search"
                className="bg-transparent"
                onChange={(e) => setSearch(e.target.value)}
              />

              {search !== "" && (
                <RxCross2
                  onClick={() => {
                    setSearch("");
                    setFilteredUsers(users);
                  }}
                  className="cursor-pointer bg-slate-800/20"
                />
              )}
            </div>
          </div>

          <div className="py-2 rounded-md mb-4 flex font-semibold bg-slate-700/10">
            <h2 className="w-3/4 pl-4">User Info</h2>
            <h2 className="w-1/4">Date added</h2>
          </div>

          <div>
            {filteredUsers?.map((user, index) => {
              return (
                <Link
                  href={"/dashboard/users/" + user._id}
                  key={user._id}
                  className={`flex cursor-pointer border-b-2 ${
                    index === 0 ? "pb-4" : "py-4"
                  }`}
                >
                  <div className="flex gap-4 w-3/4 items-center">
                    <div className="h-11 w-11 flex justify-center uppercase items-center text-base font-semibold text-white rounded-full bg-slate-700 ">
                      {user?.name?.split(" ")[0][0]}
                      {user?.name?.split(" ")?.[1]
                        ? user?.name?.split(" ")?.[1]?.[0]
                        : user?.name?.split(" ")[0][1]}
                    </div>
                    <div>
                      <h2 className="font-semibold">{user.name}</h2>
                      <h2 className="text-sm">{user.email}</h2>
                    </div>
                  </div>

                  <div className="w-1/4 text-base font-semibold text-slate-800/80">
                    <h2>{formatTimestamp(user?.createdAt)}</h2>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}

export default Page;
