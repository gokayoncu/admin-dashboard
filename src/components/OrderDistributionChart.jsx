"use client";
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { COLORS } from "./CategoryDistributionChart";
import { motion } from "framer-motion";

const OrderDistributionChart = () => {
  const [orderStatus, setOrderStatus] = useState();

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setOrderStatus(data.orderStatus);
      });
  }, []);
  return (
    <motion.div
      className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <h2 className="text-base md:text-xl font-semibold mb-4 text-gray-100 text-center md:text-left">
        Order Status Distribution
      </h2>
      <div className="w-full h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              data={orderStatus}
              cx="45%"
              cy="45%"
              outerRadius={80}
              labelLine={false}
              label={({ name, percent }) => {
                return `${name} ${(percent * 100).toFixed(0)} %`;
              }}
            >
              {orderStatus?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31,41,55,0.8)",
                borderBlock: "rgba(31,41,55,0.8)",
                borderRadius: "8px",
                padding: "8px",
                fontSize: "12px",
              }}
              itemStyle={{ color: "#fff" }}
              cursor={{ fill: "rgba(255,255,255,0.8)" }}
            />
            <Legend
              wrapperStyle={{ fontSize: 14 }}
              align="center"
              layout="horizontal"
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default OrderDistributionChart;
