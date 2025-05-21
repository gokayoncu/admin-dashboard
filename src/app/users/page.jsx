"use client";
import React from "react";
import { motion } from "framer-motion";
import StatCard from "@/components/StatCard";
import { RotateCcw, UserCheck, UserPlus, UsersIcon } from "lucide-react";
import UsersTable from "@/components/UsersTable";
const UsersPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Total Client" icon={UsersIcon} value="7670" />
          <StatCard name="New Client" icon={UserPlus} value="860" />
          <StatCard name="Active Client" icon={UserCheck} value="4080" />
          <StatCard name="Returning Client" icon={RotateCcw} value="2730" />
        </motion.div>
        <UsersTable />
      </main>
    </div>
  );
};

export default UsersPage;
