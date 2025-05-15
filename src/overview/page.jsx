"use client";
import StatCard from "@/components/StatCard";
import { DollarSign, ShoppingBag, SquareActivity, Users } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
const Overview = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-4 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Total Sales" icon={DollarSign} value="$184,240" />
          <StatCard name="Total Clients" icon={Users} value="1,240" />
          <StatCard name="Total Product" icon={ShoppingBag} value="640" />
          <StatCard name="Stock" icon={SquareActivity} value="12,845" />
        </motion.div>
      </main>
    </div>
  );
};

export default Overview;
