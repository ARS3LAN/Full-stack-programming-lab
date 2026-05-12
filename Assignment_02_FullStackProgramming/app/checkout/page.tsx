import React from 'react';

export default function CheckoutPage() {
  return (
    <div className="w-full">
      <div className="text-xs text-blue-600 mb-6 border-b pb-2">
        Home &gt; <span className="text-gray-600">Payments</span>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-slate-800">Secure Checkouts</h2>

      <div className="bg-gray-100 p-6 md:p-10 mb-10">
        <h3 className="font-bold text-lg text-slate-800 mb-6 bg-white p-2 border-b border-gray-300">
          Payment Information
        </h3>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Column: Step 1 */}
          <div className="flex-1 md:border-r border-gray-300 md:pr-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-bold text-red-600">Step 1.</span>
              <h4 className="text-lg text-slate-800">Billing Address</h4>
            </div>

            <form className="space-y-3 mb-6">
              {['First Name', 'Last Name', 'Email', 'Phone', 'Address'].map((field, idx) => (
                <div key={idx} className="flex items-center">
                  <label className="w-24 text-right pr-4 text-xs font-bold text-gray-700">
                    {field} <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="flex-1 border border-gray-300 p-1.5 text-sm bg-white" />
                </div>
              ))}
              {['City', 'State', 'Zip Code', 'Country'].map((field, idx) => (
                <div key={`sel-${idx}`} className="flex items-center">
                  <label className="w-24 text-right pr-4 text-xs font-bold text-gray-700">
                    {field} <span className="text-red-500">*</span>
                  </label>
                  {field === 'Zip Code' ? (
                     <input type="text" className="flex-1 border border-gray-300 p-1.5 text-sm bg-white" />
                  ) : (
                    <select className="flex-1 border border-gray-300 p-1.5 text-sm bg-white">
                      <option>New York</option>
                    </select>
                  )}
                </div>
              ))}
            </form>

            <label className="flex items-center text-xs text-blue-500 mb-6 pl-24">
              <input type="checkbox" className="mr-2" /> Ship to a different address
            </label>

            <form className="space-y-3">
              {['First Name', 'Last Name', 'Email', 'Phone', 'Address'].map((field, idx) => (
                <div key={`ship-${idx}`} className="flex items-center">
                  <label className="w-24 text-right pr-4 text-xs font-bold text-gray-700">
                    {field} <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="flex-1 border border-gray-300 p-1.5 text-sm bg-white" />
                </div>
              ))}
              {['City', 'State', 'Zip Code', 'Country'].map((field, idx) => (
                <div key={`ship-sel-${idx}`} className="flex items-center">
                  <label className="w-24 text-right pr-4 text-xs font-bold text-gray-700">
                    {field} <span className="text-red-500">*</span>
                  </label>
                  {field === 'Zip Code' ? (
                     <input type="text" className="flex-1 border border-gray-300 p-1.5 text-sm bg-white" />
                  ) : (
                    <select className="flex-1 border border-gray-300 p-1.5 text-sm bg-white">
                      <option>New York</option>
                    </select>
                  )}
                </div>
              ))}
            </form>
          </div>

          {/* Right Column: Step 2 & 3 */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl font-bold text-red-600">Step 2.</span>
                <h4 className="text-lg text-slate-800">Card Details</h4>
              </div>

              <form className="space-y-3 mb-4">
                <div className="flex items-center">
                  <label className="w-28 text-right pr-4 text-xs font-bold text-gray-700">Card Type <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Master Card" className="flex-1 border border-gray-300 p-1.5 text-sm bg-white" />
                </div>
                <div className="flex items-center">
                  <label className="w-28 text-right pr-4 text-xs font-bold text-gray-700">Card Number <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="1234 5678 9123 4567" className="flex-1 border border-gray-300 p-1.5 text-sm bg-white" />
                </div>
                <div className="flex items-center">
                  <label className="w-28 text-right pr-4 text-xs font-bold text-gray-700">Expiration <span className="text-red-500">*</span></label>
                  <div className="flex-1 flex gap-2">
                    <select className="border border-gray-300 p-1.5 text-sm bg-white"><option>01</option></select>
                    <select className="flex-1 border border-gray-300 p-1.5 text-sm bg-white"><option>December</option></select>
                    <select className="border border-gray-300 p-1.5 text-sm bg-white"><option>2015</option></select>
                  </div>
                </div>
                <div className="flex items-center">
                  <label className="w-28 text-right pr-4 text-xs font-bold text-gray-700">Secure Code <span className="text-red-500">*</span></label>
                  <input type="text" className="flex-1 border border-gray-300 p-1.5 text-sm bg-white" />
                </div>
              </form>
              <p className="text-[10px] text-gray-600 pl-28 mb-1">Note: Please ensure the billing address you enter matches your credit card billing address.</p>
              <label className="flex items-center text-[10px] text-blue-500 pl-28 mb-10">
                <input type="checkbox" className="mr-2" /> I Accept terms and Conditions
              </label>

              <div className="flex items-center gap-2 mb-6 border-t border-gray-300 pt-6">
                <span className="text-2xl font-bold text-red-600">Step 3.</span>
                <h4 className="text-lg text-slate-800">Review Your Order</h4>
              </div>

              <table className="w-full text-xs text-left mb-4">
                <thead className="border-b border-gray-400">
                  <tr>
                    <th className="py-2">Item name</th>
                    <th className="py-2">price</th>
                    <th className="py-2 text-center">Quantity</th>
                    <th className="py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="border-b border-gray-400">
                  <tr>
                    <td className="py-2 uppercase">XS SCYVA X SERUES 119</td>
                    <td className="py-2">$ 699</td>
                    <td className="py-2 text-center">1000</td>
                    <td className="py-2 text-right">12000</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-between font-bold text-sm text-slate-800 mb-4">
                <span>Total with shipping:</span>
                <span>$ 699.00</span>
              </div>
              
              <div className="flex justify-end">
                 <button className="bg-[#86B738] text-white font-bold px-6 py-2 text-sm flex items-center gap-2 uppercase rounded-md shadow-sm">
                   🔒 Place Your Order
                 </button>
              </div>
            </div>

            <div className="mt-10 pt-6 flex flex-col items-end">
              <div className="text-right mb-4">
                <span className="text-sm text-gray-700">Cart summary <span className="text-xs">(2 items)</span></span>
                <div className="text-lg font-bold text-slate-800">Total: $21.00</div>
              </div>
              <div className="flex gap-4">
                <button className="bg-white border border-blue-500 text-blue-500 px-6 py-2 text-xs uppercase">
                  Continue shopping
                </button>
                <button className="bg-red-600 text-white px-6 py-2 text-xs font-bold uppercase">
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}