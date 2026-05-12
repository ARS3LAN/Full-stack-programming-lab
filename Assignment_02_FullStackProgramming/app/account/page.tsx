import React from 'react';

export default function MyAccountPage() {
  const orders = [
    { id: "#303", date: "December 18, 2014", status: "On hold", total: "$ 699.00" },
    { id: "#307", date: "December 18, 2014", status: "On hold", total: "$ 799.00" }
  ];

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="text-xs text-blue-600 mb-6 border-b pb-2">
        Home &gt; User Account &gt; <span className="text-gray-600">My Account</span>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-slate-800">User Profile Details</h2>

      <div className="bg-[#f8f8f8] p-6 md:p-10 mb-10">
        
        {/* User Profile Welcome */}
        <div className="mb-8">
          <h3 className="font-bold text-lg text-slate-800 mb-4 border-b border-gray-300 pb-2">
            User profile
          </h3>
          <p className="text-xs text-gray-700 leading-relaxed">
            Hellow User name! From your account you can view your reent orders, manage your shipping and billing addresss.<br/>
            <a href="/account/edit-profile" className="text-blue-500 hover:underline">edit your password and account details.</a>
          </p>
        </div>

        {/* Recent Orders Table */}
        <div className="mb-10">
          <h3 className="font-bold text-lg text-slate-800 mb-4">
            Recent Orders
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="border-b border-gray-300">
                <tr>
                  <th className="py-2 font-normal text-gray-600">Order</th>
                  <th className="py-2 font-normal text-gray-600">Date</th>
                  <th className="py-2 font-normal text-gray-600">Status</th>
                  <th className="py-2 font-normal text-gray-600">Total</th>
                  <th className="py-2 font-normal text-gray-600 text-right">Options</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={idx} className="border-b border-gray-200">
                    <td className="py-4 text-blue-500">
                      <a href="/account/order-details" className="hover:underline">{order.id}</a>
                    </td>
                    <td className="py-4">{order.date}</td>
                    <td className="py-4">{order.status}</td>
                    <td className="py-4">{order.total}</td>
                    <td className="py-4 text-right">
                      <a href="/account/order-details" className="inline-block bg-red-600 text-white px-4 py-1.5 text-xs uppercase font-bold hover:bg-red-700 transition">
                        View Orders
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* My Addresses Section */}
        <div>
          <h3 className="font-bold text-lg text-slate-800 mb-2">
            My Addresses
          </h3>
          <p className="text-xs text-gray-700 mb-6">
            The following addressess will be used on the checkout page by default
          </p>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Left Address Column */}
            <div className="flex-1">
              <h4 className="font-bold text-slate-800 border-b border-gray-300 pb-2 mb-4">
                Billing address
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed mb-4 h-24">
                Farrukh Javaid<br/>
                Hottub Spas<br/>
                Plot 10 Tech Society<br/>
                California, CA 20112<br/>
                United State
              </p>
              <a href="/account/edit-billing" className="inline-block bg-red-600 text-white px-6 py-2 text-xs uppercase font-bold hover:bg-red-700 transition">
                Edit Adresses
              </a>
            </div>

            {/* Right Address Column */}
            <div className="flex-1">
              {/* Note: The original image typo has "Billing address" here twice, but I updated this one to Shipping so it makes logical sense for your routing! */}
              <h4 className="font-bold text-slate-800 border-b border-gray-300 pb-2 mb-4">
                Shipping address
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed mb-4 h-24">
                Farrukh Javaid<br/>
                Hottub Spas<br/>
                Plot 10 Tech Society<br/>
                California, CA 20112<br/>
                United State
              </p>
              <a href="/account/edit-shipping" className="inline-block bg-red-600 text-white px-6 py-2 text-xs uppercase font-bold hover:bg-red-700 transition">
                Edit Adresses
              </a>
            </div>
          </div>
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