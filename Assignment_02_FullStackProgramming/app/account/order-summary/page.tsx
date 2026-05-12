import React from 'react';

export default function OrderSummaryPage() {
  return (
    <div className="w-full">
      <div className="text-xs text-blue-600 mb-6 border-b pb-2">
        Home &gt; User Account &gt; <span className="text-gray-600">Order Summry</span>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-slate-800">Order Summery</h2>

      <div className="bg-gray-100 p-6 md:p-10 mb-10">
        
        <p className="text-xs text-green-600 mb-10 bg-[#E5F9E7] p-2">
          Thank you. your order has been recieved
        </p>

        <h3 className="font-bold text-lg text-slate-800 mb-4 border-b border-gray-300 pb-2">Yor Order Summry</h3>
        <div className="text-xs text-slate-800 space-y-2 mb-6">
          <p><span className="text-gray-600 w-20 inline-block">Order # :</span> 0303</p>
          <p><span className="text-gray-600 w-20 inline-block">Date :</span> December 21 2014</p>
          <p><span className="text-gray-600 w-20 inline-block">Total :</span> 1 x $2500 = $2500</p>
        </div>
        <p className="text-xs text-slate-800 mb-10">
          Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order wont be shipped until the funds have cleared in our account.
        </p>

        <h3 className="font-bold text-lg text-slate-800 mb-4 border-b border-gray-300 pb-2">Yor Order Details</h3>
        <table className="w-full text-xs text-left mb-6">
          <thead className="border-b border-gray-300">
            <tr>
              <th className="py-2 font-normal text-gray-600">Product</th>
              <th className="py-2 font-normal text-gray-600 text-center">Quantity</th>
              <th className="py-2 font-normal text-gray-600 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-3 text-blue-500">Five person hottube spa with green light inside</td>
              <td className="py-3 text-center">1</td>
              <td className="py-3 text-right">$ 699.00</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 text-blue-500">Five person hottube spa with green light inside</td>
              <td className="py-3 text-center">1</td>
              <td className="py-3 text-right">$ 699.00</td>
            </tr>
          </tbody>
        </table>

        <div className="flex flex-col items-end text-xs text-slate-800 space-y-2 mb-10">
          <div className="flex w-64 justify-between font-bold"><span className="text-gray-700">Cart Subtotal:</span> $ 1400.00</div>
          <div className="flex w-64 justify-between font-bold"><span className="text-gray-700">Shipping:</span> Free Shippment</div>
          <div className="flex w-64 justify-between font-bold"><span className="text-gray-700">Payment method:</span> Direct Bank Transfer</div>
          <div className="flex w-64 justify-between font-bold text-sm"><span className="text-gray-700">Total with shipping:</span> $ 1400.00</div>
        </div>

        <h3 className="font-bold text-lg text-slate-800 mb-4 border-b border-gray-300 pb-2">Yor Bank details</h3>
        <div className="text-xs text-slate-800 space-y-2 mb-10">
          <p><span className="text-gray-600 w-16 inline-block">Bank :</span> Your Bank Name</p>
          <p><span className="text-gray-600 w-16 inline-block">Acc# :</span> 2014 2545 4524 5654</p>
          <p><span className="text-gray-600 w-16 inline-block">BIC :</span> 012476 541245641212</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h4 className="font-bold text-slate-800 mb-4 border-b border-gray-300 pb-2">Customer details</h4>
            <div className="text-xs text-slate-800 space-y-2">
              <p><span className="text-gray-600 w-24 inline-block">Customer Name</span> Farrukh Javaid</p>
              <p><span className="text-gray-600 w-24 inline-block">Email</span> email@hotubdirect.com</p>
              <p><span className="text-gray-600 w-24 inline-block">Phone</span> 0888 7578 787</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-4 border-b border-gray-300 pb-2">Billing address</h4>
            <p className="text-xs text-slate-800 leading-relaxed">
              Farrukh Javaid<br/>Hottub Spas<br/>Plot 10 Tech Society<br/>California, CA 20112<br/>United State
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-4 border-b border-gray-300 pb-2">Shipping address</h4>
            <p className="text-xs text-slate-800 leading-relaxed">
              Farrukh Javaid<br/>Hottub Spas<br/>Plot 10 Tech Society<br/>California, CA 20112<br/>United State
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}