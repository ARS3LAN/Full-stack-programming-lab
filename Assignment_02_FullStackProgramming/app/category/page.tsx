import React from 'react';

export default function CategoryPage() {
  const products = Array(6).fill({
    name: "XS SCYBA X SERUES 119",
    desc: "The goods of our stores are very reliable and dur we care about the customer",
    price: "$500.00"
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
        Home &gt; <span className="text-gray-600">Category</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4">
          <h2 className="font-bold text-lg mb-4 border-b pb-2">Shopping Options</h2>
          
          <div className="mb-6">
            <h3 className="text-gray-500 font-semibold mb-3">SEATING CAPACITY</h3>
            <ul className="space-y-2 text-sm text-gray-600 ml-4">
              <li className="text-red-500">&gt; 2 - 4 PEOPLE</li>
              <li>&gt; 5 - 7 PEOPLE</li>
              <li>&gt; 8 PEOPLE AND MORE</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-gray-500 font-semibold mb-3 border-t pt-4">CHOOSE SIZES</h3>
            <ul className="space-y-2 text-sm text-gray-600 ml-4">
              <li>&gt; 5 - 6 FEET LONG</li>
              <li>&gt; 6 - 7 FEET LONG</li>
              <li>&gt; 7 - 8 FEET LONG</li>
              <li>&gt; 8 FEET TO LARGE SIZE</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-gray-500 font-semibold mb-3 border-t pt-4">SPAS BY TYLE</h3>
            <ul className="space-y-2 text-sm text-gray-600 ml-4">
              <li>&gt; PLUG AND PLAY 110 VOLT</li>
              <li>&gt; TV - STERIO SPAS</li>
              <li>&gt; CORNER SPAS</li>
              <li>&gt; PORTABLE SPAS</li>
              <li>&gt; DEEPER SPAS</li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-500 font-semibold mb-3 border-t pt-4">PRICE RANGES FROM</h3>
            <ul className="space-y-2 text-sm text-gray-600 ml-4">
              <li>&gt; UNDER $3,000</li>
              <li>&gt; $3,000 TO 4,000</li>
              <li>&gt; $4,000 TO 5,000</li>
              <li>&gt; $5,000 TO 6,000</li>
              <li>&gt; $6,000 +</li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          <h2 className="font-bold text-lg mb-2 text-slate-800 border-b pb-2">Top Product Listing</h2>
          
          <div className="flex justify-between items-center text-sm text-gray-600 mb-6 border-b pb-2">
            <span>6 Item(s)</span>
            <div>
              <span className="mr-2">Show</span>
              <select className="border px-2 py-1">
                <option>9</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {products.map((product, idx) => (
              <div key={idx} className="border p-4 flex flex-col bg-gray-50">
                <div className="h-40 bg-gray-200 mb-4 flex items-center justify-center text-gray-400">
                  [Image]
                </div>
                <h4 className="text-xs font-semibold mb-2">{product.name}</h4>
                <p className="text-[10px] text-gray-500 mb-2 leading-tight">{product.desc}</p>
                <div className="text-lg font-bold text-red-600 mb-3">{product.price}</div>
                
                <button className="bg-red-600 text-white w-full py-1.5 mb-2 flex justify-center items-center font-bold text-xs">
                  <span className="mr-2">🛒</span> ADD TO CART
                </button>
                
                <div className="flex justify-between text-[10px] text-red-600 mt-auto">
                  <button>ADD TO WISH LIST</button>
                  <button>MORE DETIALS</button>
                </div>
              </div>
            ))}
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
                <div className="w-16 h-16 bg-gray-200 flex-shrink-0 flex items-center justify-center text-xs text-gray-400 border">
                  [Img]
                </div>
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
      <div className="border border-gray-200 p-4 flex justify-between items-center mb-10">
        <div className="text-blue-500 font-bold text-xl italic">SAVE $1,000'S</div>
        <div className="text-blue-700 text-2xl font-serif">OCEANICSpa</div>
        <div className="text-orange-500 text-xl font-serif">CalderaSpas</div>
        <div className="text-green-700 text-xl font-serif">IslandSpas</div>
      </div>
    </div>
  );
}