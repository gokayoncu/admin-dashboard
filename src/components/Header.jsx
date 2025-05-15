import React from "react";
import Image from "next/image";
import uk from "../../public/images/uk.png";
import admin from "../../public/images/admin.jpg";
import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-[#1e1e1e] shadow-lg border-b border-[#1f1f1f] mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg">
      <div className="mx-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-100">
          Dashboard
        </h1>
        <div className="flex items-center space-x-3 sm:space-x-6">
          <Image
            className="rounded-full shadow-md cursor-pointer "
            src={uk}
            alt="country flag"
            width={28}
            height={28}
          />
          <div className="relative">
            <Bell className="w-5 sm:w-6 h-5 sm:h-6 text-gray-300 cursor-pointer hover:text-white " />
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Image
              className="rounded-full border border-gray-600 "
              src={admin}
              alt="Admin"
              width={35}
              height={35}
            />
            <span className="hidden sm:block text-gray-100 font-medium">
              John Mark
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
