import React from 'react';

export default function ProductPage() {
  const viewedItems = Array(4).fill({
    name: "Bosch 22 Cu. Ft Stainless Refrigerator",
    model: "B22CS30SNSS",
    price: "$2,549.15"
  });

  return (
    <div className="w-full">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Emerald Bay XL TV DVD Stereo Hot Tub with 90 Jets</h2>
        <p className="text-xs text-gray-500">Abt Model: B22CS30SNSS | UPC Code : 825225868729</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-10">
        {/* Left Column: Images */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="w-full h-64 bg-gray-200 mb-4 flex items-center justify-center text-gray-400 border">
            [Main Product Image]
          </div>
          <p className="text-xs text-gray-500 mb-2">Roll over image to zoom in</p>
          <div className="flex gap-2 mb-2">
            <div className="w-12 h-12 border-2 border-blue-400 bg-gray-100 flex items-center justify-center text-[8px] text-gray-400">Thumb 1</div>
            <div className="w-12 h-12 border border-gray-300 bg-gray-100 flex items-center justify-center text-[8px] text-gray-400">Thumb 2</div>
            <div className="w-12 h-12 border border-gray-300 bg-gray-100 flex items-center justify-center text-[8px] text-gray-400">Thumb 3</div>
            <div className="w-12 h-12 border border-gray-300 bg-blue-100 flex items-center justify-center text-[8px] text-gray-400">Thumb 4</div>
          </div>
          <button className="text-blue-500 text-xs flex items-center gap-1">
            <span>+</span> Larger View
          </button>
        </div>

        {/* Middle Column: Info & Tabs */}
        <div className="w-full md:w-1/3">
          {/* Reviews & Price */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm mb-2">
              <div className="text-orange-400">★★★★☆</div>
              <span className="bg-gray-700 text-white px-1 text-xs">3.4</span>
              <a href="#" className="text-blue-500 text-xs">(14 reviews)</a>
            </div>
            <p className="text-xs text-gray-500 line-through">Retail Price: $2199.00</p>
            <p className="text-sm font-bold text-red-600">Sale price</p>
            <p className="text-3xl font-bold text-red-600 mb-1">$1979.00</p>
            <a href="#" className="text-blue-500 text-xs">Low Price Guarantee</a>
          </div>

          {/* Specs */}
          <div className="text-sm text-slate-800 space-y-2 mb-6">
            <p><strong>Size/Seating Capicity:</strong><br/>77", 77", 32" / 6 Persons</p>
            <p><strong>Seating Design:</strong><br/>Bucket, Lounge, Chair, Bench</p>
            <p><strong>Water Capacity / Dry Weight:</strong><br/>305 Gallons / 573 lbs.</p>
            <p><strong>Number of Pumps:</strong><br/>2 X 5HP</p>
            <p><strong>Electrical:</strong><br/>5.5 KW Heavy Heater, 220V, 50 amp /ETL Certificate</p>
            <p className="text-xs">In Stock <span className="text-blue-500">(available)</span></p>
          </div>

          <button className="bg-red-600 text-white px-6 py-2 font-bold text-sm flex items-center gap-2 uppercase mb-8">
            <span>+</span> Add to cart
          </button>
        </div>

        {/* Right Column: Calculator */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="border border-gray-300 p-4">
            <h3 className="font-bold text-lg mb-4 text-slate-800">Price Calculator</h3>
            <div className="space-y-2 text-xs">
              {[
                "Interior Color:", "Outside Shell Color:", "Circulation Pump:", "Polar Foam:",
                "Cover / Steps:", "Extra Filter Sets:", "Deluxe Cover Lifter:", "Salt Water Sanitation System:",
                "TV/DVD/Entertainment", "Backyard Delivery:", "Jets:", "Perimeter Lighting:",
                "Premium Popup Speakers:", "Waterfall:", "Spa Surround:"
              ].map((label, i) => (
                <div key={i}>
                  <label className="block text-gray-700 mb-1">{label}</label>
                  <select className="w-full border border-gray-300 p-1 bg-white"></select>
                </div>
              ))}
              <div>
                <label className="block text-gray-700 mb-1">Quantity:</label>
                <input type="text" className="w-full border border-gray-300 p-1" />
              </div>
            </div>
            <div className="mt-4 p-2 border border-gray-300 text-center">
              <span className="text-lg text-red-600">Total Price: <strong className="font-bold">$650.00</strong></span>
            </div>
            <div className="mt-4 flex justify-center">
              <button className="bg-red-600 text-white px-6 py-2 font-bold text-sm flex items-center gap-2 uppercase">
                <span>+</span> Add to cart
              </button>
            </div>
          </div>

          <div className="border border-gray-300 p-4">
            <h3 className="font-bold text-lg mb-4 text-slate-800">Download Resources</h3>
            <ul className="space-y-2 text-xs text-blue-500">
              <li className="flex items-center gap-2">📄 <a href="#" className="underline">Full Line Brochure</a></li>
              <li className="flex items-center gap-2">📄 <a href="#" className="underline">Owner's Manual</a></li>
              <li className="flex items-center gap-2">📄 <a href="#" className="underline">Specifications Sheet</a></li>
            </ul>
            <div className="mt-6">
              <button className="border border-gray-300 px-2 py-1 flex items-center gap-2 text-xs text-red-600 font-bold">
                 Get Adobe Reader
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="w-full md:w-2/3 mb-10">
        <div className="flex border-b border-gray-300 mb-4">
          <button className="border border-b-0 border-gray-300 px-6 py-2 text-sm font-bold bg-white -mb-[1px]">Details</button>
          <button className="px-6 py-2 text-sm text-gray-600 border border-transparent hover:border-gray-300">Quick Specs</button>
          <button className="px-6 py-2 text-sm text-gray-600 border border-transparent hover:border-gray-300">Accessories</button>
          <button className="px-6 py-2 text-sm text-gray-600 border border-transparent hover:border-gray-300">Reviews</button>
          <button className="px-6 py-2 text-sm text-gray-600 border border-transparent hover:border-gray-300">Q & A</button>
        </div>
        
        <div className="border border-gray-300 p-6 text-xs text-gray-700 leading-relaxed">
          <p className="font-bold mb-2">Product Details</p>
          <p className="mb-4">Energy Star Rated - No</p>
          <h4 className="text-lg font-bold text-slate-800 mb-4">Emerald Bay XL TV DVD Stereo Hot Tub with 90 Jets</h4>
          <p className="mb-4">The Hottub B22CS30SNS<br/>stain</p>
          <p className="mb-4">This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
          <p className="mb-4">nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
          <p>odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque.</p>
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