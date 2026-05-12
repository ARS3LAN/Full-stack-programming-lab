import React from 'react';

export default function CartPage() {
  const cartItems = Array(2).fill({
    name: "The Cabaret 3 Person 41 Jet Hot Tub-110 Volt Plug in or 220 Volt Version",
    desc: "220 V/50 AMP – 4.5KW Heater 110 V/15 AMP – 1KW Heater/ convertible To 220 V / 4KW Heater",
    price: "$9.00",
    delivery: "Standard ( 7 - 10 business days)"
  });

  const viewedItems = Array(4).fill({
    name: "Bosch 22 Cu. Ft Stainless Refrigerator",
    model: "B22CS30SNSS",
    price: "$2,549.15"
  });

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="text-xs text-blue-600 mb-6 border-b pb-2">
        Home &gt; <span className="text-gray-600">Shopping Cart</span>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-slate-800">Shopping Cart</h2>

      <div className="bg-gray-100 p-6 md:p-10 mb-10">
        <h3 className="font-bold text-lg mb-4 text-slate-800">Your Shopping Cart</h3>
        
        {/* Success Message */}
        <div className="bg-[#E5F9E7] border border-green-500 text-green-800 px-4 py-2 text-sm mb-6 flex items-center">
          <span className="bg-green-600 text-white w-5 h-5 flex justify-center items-center mr-2 text-xs">✓</span>
          <span className="text-blue-500 mr-1">The Cabaret 3 Person 41 Jet Hot Tub-110 Volt Plug in</span> was just added cart.
        </div>

        <div className="flex justify-between text-sm text-gray-700 border-b border-gray-300 pb-2 mb-4">
          <span>Items added: <span className="text-blue-500">user_name</span></span>
          <span>Items total</span>
        </div>

        {/* Cart Items */}
        <div className="space-y-6 border-b border-gray-300 pb-6 mb-6">
          {cartItems.map((item, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="w-24 h-24 bg-white border border-gray-300 flex items-center justify-center flex-shrink-0 text-gray-400 text-xs">
                [Img]
              </div>
              <div className="flex-1">
                <a href="#" className="text-blue-500 text-sm font-semibold hover:underline block mb-1">
                  {item.name}
                </a>
                <p className="text-[10px] text-gray-600 mb-2 max-w-sm">{item.desc}</p>
                <div className="text-[10px] text-blue-500 text-right mt-2 md:mt-0">
                  <a href="#" className="hover:underline">Remove</a> | <a href="#" className="hover:underline">Edit Your Order</a>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 min-w-[150px]">
                <div className="font-bold text-sm text-slate-800">{item.price}</div>
                <div className="flex items-center gap-2 text-xs">
                  <span>Quantity:</span>
                  <select className="border border-gray-300 p-1 bg-white">
                    <option>10</option>
                  </select>
                </div>
                <div className="text-[10px] text-gray-500">{item.delivery}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="flex flex-col items-end">
          <div className="text-right mb-4">
            <span className="text-sm text-gray-700">Cart summary <span className="text-xs">(2 items)</span></span>
            <div className="text-lg font-bold text-slate-800">Total: $21.00</div>
          </div>
          <div className="flex gap-4">
            <button className="bg-white border border-red-600 text-red-600 px-6 py-2 text-xs font-bold uppercase">
              Continue Shopping
            </button>
            <button className="bg-red-600 text-white px-6 py-2 text-xs font-bold uppercase">
              Proceed to checkout
            </button>
          </div>
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

      {/* Bottom Brand Banner */}
      <div className="border border-gray-200 p-4 flex flex-wrap justify-between items-center mb-10 gap-4">
        <div className="text-blue-500 font-bold text-xl italic">SAVE $1,000'S</div>
        <div className="text-blue-700 text-2xl font-serif">OCEANICSpa</div>
        <div className="text-orange-500 text-xl font-serif">CalderaSpas</div>
        <div className="text-green-700 text-xl font-serif">IslandSpas</div>
      </div>
    </div>
  );
}