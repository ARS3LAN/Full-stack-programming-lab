import React from 'react';

export default function ContactPage() {
  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="text-xs text-blue-600 mb-6 border-b pb-2">
        Home &gt; Customer Support &gt; <span className="text-gray-600">Contact Us</span>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-slate-800">Contact Us</h2>

      <div className="bg-gray-100 p-6 md:p-10 mb-10">
        
        {/* Contact Info Header */}
        <div className="mb-8 border-b border-gray-300 pb-6">
          <h3 className="font-bold text-lg text-slate-800 mb-1">Contact Our Customer Support</h3>
          <p className="text-xs text-gray-700 mb-6">
            To create a new account, please fill in the required information below. Passwords are case sensitive and must be 6 to 20 characters long
          </p>

          <h3 className="font-bold text-lg text-slate-800 mb-1">Online Sales & Customer Support</h3>
          <p className="text-sm text-gray-800 font-semibold mb-6">
            Call Us: <span className="font-normal text-gray-600">020 78989845</span>
          </p>

          <div className="flex flex-col md:flex-row gap-10">
            <div>
              <h4 className="font-bold text-slate-800 mb-2">Retail Store Location</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Hottub Store Loc<br />
                5000N. Ford avenue<br />
                Newyourk, NY 20145<br />
                888.123.1234
              </p>
            </div>
            <div className="border-l border-gray-300 pl-10 hidden md:block"></div>
            <div>
              <h4 className="font-bold text-slate-800 mb-2">Services</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Hottub Store Loc<br />
                5000N. Ford avenue<br />
                Newyourk, NY 20145<br />
                888.123.1234
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="font-bold text-lg text-slate-800 mb-6">Contact Us</h3>
          
          <form className="max-w-xl space-y-4">
            <div className="flex items-center">
              <label className="w-32 text-right pr-4 text-xs font-bold text-gray-700">
                First name <span className="text-red-500">*</span>
              </label>
              <input type="text" className="flex-1 border border-gray-300 p-2 text-sm" />
            </div>
            
            <div className="flex items-center">
              <label className="w-32 text-right pr-4 text-xs font-bold text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input type="email" className="flex-1 border border-gray-300 p-2 text-sm" />
            </div>

            <div className="flex items-center">
              <label className="w-32 text-right pr-4 text-xs font-bold text-gray-700">
                Subject <span className="text-red-500">*</span>
              </label>
              <input type="text" className="flex-1 border border-gray-300 p-2 text-sm" />
            </div>

            <div className="flex items-start pt-2">
              <label className="w-32 text-right pr-4 text-xs font-bold text-gray-700 pt-2">
                Your Message
              </label>
              <textarea rows={6} className="flex-1 border border-gray-300 p-2 text-sm"></textarea>
            </div>

            <div className="flex items-center mt-4">
              <div className="w-32 pr-4"></div>
              <button type="submit" className="bg-red-600 text-white font-bold px-8 py-2 text-sm uppercase">
                Submit
              </button>
            </div>
          </form>
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