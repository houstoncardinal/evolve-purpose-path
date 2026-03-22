import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AnnouncementBar from "./AnnouncementBar";

const Layout = ({ children }: { children?: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <AnnouncementBar />
    <Navbar />
    <main className="flex-1 pt-[113px]">{children ?? <Outlet />}</main>
    <Footer />
  </div>
);

export default Layout;
