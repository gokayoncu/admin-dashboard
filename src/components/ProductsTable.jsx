"use client";
import React, { useMemo, useEffect, useCallback, useState } from "react";
import productData from "../../public/data/data.json";
import { motion } from "framer-motion";
import { Edit, Save, Search, Trash2 } from "lucide-react";
import Image from "next/image";
const ProductsTable = () => {
  const [products, setProducts] = useState(productData.products);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingRow, setEditingRow] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, products]);

  const handleEdit = (id) => {
    setEditingRow(id);
  };

  const handleSave = (row) => {
    setEditingRow(null);
  };

  const handleChange = (id, field, value) => {
    if (!/^\d*\.?\d*$/.test(value)) return;
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, [field]: Number(value) } : product
      )
    );
    sessionStorage.setItem(
      JSON.stringify({ id: id, field: field }),
      JSON.stringify(value)
    );
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
      if (typeof window !== "undefined") {
        // Tüm sessionStorage anahtarlarını dön
        Object.keys(window.sessionStorage).forEach((key) => {
          try {
            // Anahtarı parse et ve id'sini kontrol et
            const keyData = JSON.parse(key);
            if (keyData.id === id) {
              window.sessionStorage.removeItem(key);
            }
          } catch (e) {
            // JSON parse hatası olursa (geçersiz anahtar) devam et
            console.log("Geçersiz sessionStorage anahtarı:", key);
          }
        });
      }
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getSessionStorageValue = useCallback(
    (id, field) => {
      if (!isClient) return null;
      try {
        const value = window.sessionStorage?.getItem(
          JSON.stringify({ id, field })
        );
        return value ? JSON.parse(value) : null;
      } catch (error) {
        console.error("sessionStorage erişim hatası:", error);
        return null;
      }
    },
    [isClient]
  );
  return (
    <motion.div
      className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-6">
        <h2 className="text-lg font-semibold md:text-xl text-gray-100 text-center md:text-left">
          Products
        </h2>
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className="bg-[#2f2f2f] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full md:w-64 focus:outline-none focus:ring-gray-500 transition duration-20 text-sm"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              {[
                "Name",
                "Product",
                "Category",
                "Price",
                "Stock",
                "Sales",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-3 md:px-6 py-2 md:py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 ">
            {filteredProducts.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className={`flex flex-col md:table-row mb-4 md:mb-0 border-b md:border-b-0 border-gray-700 md:border-none p-2 md:p-0 ${
                  editingRow === product.id ? "bg-[#2f2f2f] ring-gray-500" : ""
                }`}
              >
                <td className="md:hidden px-3 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-100">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          ID : {product.id}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1 -mt-1 -mr-1 ">
                      <button
                        className="text-indigo-500 hover:text-indigo-300"
                        onClick={() =>
                          editingRow === product.id
                            ? handleSave(product)
                            : handleEdit(product.id)
                        }
                      >
                        {editingRow === product.id ? (
                          <Save size={16} />
                        ) : (
                          <Edit size={16} />
                        )}
                      </button>
                      <button
                        className="text-red-500 hover:text-red-300"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-300">
                    <div>Category : {product.category}</div>
                    {["price", "stock", "sales"].map((field) => (
                      <div key={field}>
                        <span className="capitalize ">{field} :</span>
                        {editingRow === product.id ? (
                          <input
                            type="text"
                            className="bg-transparent text-white border border-gray-400 w-16 text-center text-xs ml-1 "
                            value={product[field]}
                            onChange={(e) =>
                              handleChange(product.id, field, e.target.value)
                            }
                          />
                        ) : field === "price" ? (
                          `$${product[field].toFixed(2)}`
                        ) : (
                          product[field]
                        )}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  <div className="flex items-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-4">{product.name}</div>
                  </div>
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  {product.id}
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  {product.category}
                </td>
                {["price", "stock", "sales"].map((item) => (
                  <td
                    key={item}
                    className={`hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300 ${
                      editingRow === product.id ? "border border-gray-400" : ""
                    }`}
                  >
                    {editingRow === product.id ? (
                      <input
                        type="text"
                        className="bg-transparent text-white border-none outline-none w-16 text-center "
                        value={
                          getSessionStorageValue(product.id, item) ||
                          product[item]
                        }
                        onChange={(e) =>
                          handleChange(product.id, item, e.target.value)
                        }
                      />
                    ) : item === "price" ? (
                      `$${product[item].toFixed(2)}`
                    ) : (
                      getSessionStorageValue(product.id, item) || product[item]
                    )}
                  </td>
                ))}
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  <div className="flex space-x-1 ml-2">
                    <button
                      className="text-indigo-500 hover:text-indigo-300 cursor-pointer"
                      onClick={() =>
                        editingRow === product.id
                          ? handleSave(product)
                          : handleEdit(product.id)
                      }
                    >
                      {editingRow === product.id ? (
                        <Save size={18} />
                      ) : (
                        <Edit size={18} />
                      )}
                    </button>
                    <button
                      className="text-red-500 hover:text-red-300 cursor-pointer"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ProductsTable;
