import React from 'react';

export default function EditBillingAddressPage() {
  return (
    <div className="w-full">
      <div className="text-xs text-blue-600 mb-6 border-b pb-2">
        Home &gt; User Account &gt; <span className="text-gray-600">My Account</span>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-slate-800">Edit Billing Address</h2>

      <div className="bg-gray-100 p-6 md:p-10 mb-10">
        <p className="text-xs text-gray-700 mb-6">
          Please fill the form bellow to update your Profile details.<br/><br/>
          *Required Fields
        </p>

        <form className="max-w-xl space-y-4">
          {[
            { label: "First Name", type: "text" },
            { label: "Last Name", type: "text" },
            { label: "Email", type: "email" },
            { label: "Phone", type: "text" },
            { label: "City", type: "text" },
            { label: "State", type: "text" },
            { label: "Zip Code", type: "text" },
            { label: "Country", type: "text" },
          ].map((field, idx) => (
            <div key={idx} className="flex items-center">
              <label className="w-32 text-right pr-4 text-xs font-bold text-gray-700">
                {field.label} <span className="text-red-500">*</span>
              </label>
              <input type={field.type} className="flex-1 border border-gray-300 p-2 text-sm" />
            </div>
          ))}

          <div className="flex items-center mt-6">
            <div className="w-32 pr-4"></div>
            <button type="submit" className="bg-red-600 text-white font-bold px-6 py-2 text-sm uppercase">
              Update Address
            </button>
          </div>
        </form>
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