"use client";
import Sidebar from "../components/SideBar";

export default function RootLayout({ children }: any) {
  // Track if the component has mounted

  return (
    <section className="select-none max-sm:pt-10 pt-0 flex h-screen max-sm:h-fit">
      <Sidebar />
      {children}
    </section>
  );
}
