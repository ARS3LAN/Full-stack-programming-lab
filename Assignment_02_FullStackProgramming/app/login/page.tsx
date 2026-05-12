import React from 'react';

export default function LoginPage() {
  const viewedItems = Array(4).fill({
    name: "Bosch 22 Cu. Ft Stainless Refrigerator",
    model: "B22CS30SNSS",
    price: "$2,549.15"
  });

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="text-xs text-blue-600 mb-6 border-b pb-2">
        Home &gt; <span className="text-gray-600">My Account</span>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-slate-800">Login Or Creat Account</h2>

      <div className="bg-gray-100 p-6 md:p-10 mb-10 flex flex-col md:flex-row gap-10">
        
        {/* Login Form */}
        <div className="flex-1 md:border-r border-gray-300 md:pr-10">
          <h3 className="font-bold text-lg text-slate-800 mb-4">User Login Details</h3>
          <p className="text-xs text-gray-700 mb-6">
            Please sign in below wih your login information.<br/><br/>
            *Required Fields
          </p>

          <form className="space-y-4">
            <div className="flex items-center">
              <label className="w-24 text-right pr-4 text-xs font-bold text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input type="email" className="flex-1 border border-gray-300 p-2 text-sm" />
            </div>
            
            <div className="flex items-center">
              <label className="w-24 text-right pr-4 text-xs font-bold text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <input type="password" className="flex-1 border border-gray-300 p-2 text-sm" />
            </div>

            <div className="flex items-center mt-4">
              <div className="w-24 pr-4"></div>
              <label className="flex items-center text-xs text-gray-700 gap-2">
                <input type="checkbox" /> Remember me th next time i visit
              </label>
            </div>

            <div className="flex items-center mt-6">
              <div className="w-24 pr-4"></div>
              <div className="flex items-center gap-4">
                <button type="submit" className="bg-red-600 text-white font-bold px-8 py-2 text-sm uppercase">
                  Sign In
                </button>
                <a href="/forgot-password" className="text-blue-500 text-xs hover:underline">Forgor your password?</a>
              </div>
            </div>
          </form>
        </div>

        {/* New Customer */}
        <div className="flex-1">
          <h3 className="font-bold text-lg text-slate-800 mb-4">New Customer</h3>
          <p className="text-xs text-gray-700 mb-4">
            As a registered Abt.com customer you can:
          </p>
          <ul className="text-xs text-gray-700 list-disc ml-4 space-y-1 mb-6">
            <li>Store billing & shipping information</li>
            <li>Check your order status</li>
            <li>Track your delivery Status</li>
            <li>View your order history</li>
          </ul>
          <button className="bg-red-600 text-white font-bold px-6 py-2 text-sm uppercase">
            Create New Account
          </button>
        </div>
      </div>

      {/* Customers Who Viewed This Item Also */}
      <div className="mt-8 border-t pt-6 mb-10">
        <h2 className="font-bold text-lg mb-6">Customers Who Viewed This Item Also</h2>
        <div className="flex items-center justify-between">
          <button className="text-blue-500 text-3xl font-bold">&lt;</button>
          <div className="flex justify-between w-full px-4 gap-4 overflow-hidden">
            {viewedItems.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-center w-1/4">
                <div className="w-16 h-16 bg-gray-200 flex-shrink-0 flex items-center justify-center text-xs text-gray-400 border">[Img]</div>
                <div className="flex flex-col text-xs">
                  <span className="text-red-600 font-bold">{item.price}</span>
                  <span className="text-gray-600 leading-tight">{item.name}</span>
                  <span className="text-gray-400 text-[10px] mt-1">{item.model}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="text-blue-500 text-3xl font-bold">&gt;</button>
        </div>
      </div>
    </div>
  );
}