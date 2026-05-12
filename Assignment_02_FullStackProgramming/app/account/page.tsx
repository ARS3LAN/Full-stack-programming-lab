import React from 'react';

export default function Home() {
  const products = Array(8).fill({
    name: "XS SCYBA X SERUES 119",
    desc: "The goods of our stores are very reliable and dur we care about the customer",
    price: "$500.00"
  });

  return (
    <div className="w-full">
      {/* Secondary Nav underneath Main Nav */}
      <div className="flex justify-center space-x-8 py-2 text-sm text-gray-600 font-semibold mb-4">
        <a href="/" className="text-red-600">HOME</a>
        <a href="/app/category/page.tsx" className="hover:text-blue-500">PRODUCTS</a>
        <a href="#" className="hover:text-blue-500">SPECIAL OFFERS</a>
        <a href="/app/contact/page.tsx" className="hover:text-blue-500">CUSTOMER SERVICE</a>
      </div>

      {/* Hero Section */}
      <div className="relative bg-slate-300 w-full h-[400px] mb-2 flex items-center p-10">
        <div className="z-10 max-w-md">
          <h2 className="text-4xl text-red-600 font-normal leading-tight mb-4">
            Barrier Reef 158 Jet<br/>
            TV- Stereo - Home Theater<br/>
            Supter Spa
          </h2>
          <p className="text-black mb-6">
            Extra Large and Deep 8 Person<br/>
            158 Jet Supper Spa, TV-Home Theater Spa System.
          </p>
          <div className="text-4xl font-bold text-black mb-2">$4899.00</div>
          <a href="/product" className="inline-block bg-red-600 text-white px-6 py-2 uppercase font-semibold">More Details</a>
        </div>
      </div>

      {/* Promo Banners */}
      <div className="grid grid-cols-3 gap-2 mb-10">
        <div className="bg-[#1C2C42] text-white p-6 h-32 flex flex-col justify-end">
          <h3 className="text-3xl font-light">5-7 PERSON<br/>SPA</h3>
        </div>
        <div className="bg-[#2B3A4F] text-white p-6 h-32 flex flex-col justify-end">
          <h3 className="text-2xl font-light">TV THEATER SPA</h3>
        </div>
        <div className="bg-red-600 text-white p-6 h-32 flex flex-col justify-center text-center">
          <h3 className="text-5xl font-bold">SAVE<br/>50%</h3>
        </div>
      </div>

      {/* New Products */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">NEW PRODUCTS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <div key={idx} className="border p-4 flex flex-col bg-gray-50">
              <a href="/product" className="h-48 bg-gray-200 mb-4 flex items-center justify-center text-gray-400 hover:opacity-80 transition">
                [Product Image]
              </a>
              <a href="/product" className="text-sm font-semibold mb-2 hover:text-blue-500 transition">{product.name}</a>
              <p className="text-xs text-gray-500 mb-2">{product.desc}</p>
              <div className="text-xl font-bold text-red-600 mb-4">{product.price}</div>
              
              <button className="bg-red-600 text-white w-full py-2 mb-2 flex justify-center items-center font-bold text-sm hover:bg-red-700 transition">
                <span className="mr-2">🛒</span> ADD TO CART
              </button>
              
              <div className="flex justify-between text-xs text-red-600 mt-auto">
                <button className="hover:underline">ADD TO WISH LIST</button>
                <a href="/product" className="hover:underline">MORE DETIALS</a>
              </div>
            </div>
          ))}
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