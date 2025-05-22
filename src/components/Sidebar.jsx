"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  DollarSign,
  Settings,
  Users,
  Info,
  Bell,
  ShoppingBag,
  ShoppingCart,
  Mail,
  Menu,
} from "lucide-react";

const icons = {
  Home,
  DollarSign,
  Settings,
  Users,
  ShoppingBag,
  ShoppingCart,
  Mail,
  Bell,
  Info,
};
const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarItems, setSideBarItems] = useState();
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 650) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setSideBarItems(data.sidebarItems);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  return (
    <div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-21"
      }`}
    >
      <div className="h-full bg-[#1e1e1e] backdrop-blur-md p-4 flex flex-col border-r border-[#2f2f2f]">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-[#2f2f2f] transition-colors max-w-fit cursor-pointer"
        >
          <Menu size={32} />
        </button>
        <nav className="mt-14 flex-grow space-y-1">
          {sidebarItems?.map((item) => {
            const IconComponent = icons[item.icon];
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#2f2f2f] transition-colors mb-2 ${
                  pathname === item.href ? "bg-[#2f2f2f]" : ""
                }`}
              >
                <IconComponent size={20} style={{ minWidth: "20px" }} />
                <span
                  className={`${
                    isSidebarOpen
                      ? "ml-4 whitespace-nowrap"
                      : "opacity-0 hidden transition-opacity duration-500"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
