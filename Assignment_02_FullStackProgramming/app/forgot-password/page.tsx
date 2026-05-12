import React from 'react';

export default function ForgotPasswordPage() {
  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="text-xs text-blue-600 mb-6 border-b pb-2">
        Home &gt; <span className="text-gray-600">My Account</span>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-slate-800">Forget Your Password</h2>

      <div className="bg-gray-100 p-6 md:p-10 mb-10">
        <h3 className="font-bold text-lg text-slate-800 mb-4">User Account Details</h3>
        <p className="text-xs text-gray-700 mb-6">
          Please enter your email address below to retrieve your password.<br/><br/>
          *Required Fields
        </p>

        <form className="max-w-xl space-y-4">
          <div className="flex items-center">
            <label className="w-32 text-right pr-4 text-xs font-bold text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input type="email" className="flex-1 border border-gray-300 p-2 text-sm" />
          </div>

          <div className="flex items-center mt-4">
            <div className="w-32 pr-4"></div>
            <label className="flex items-center text-xs text-gray-700 gap-2">
              <input type="checkbox" /> Remember me th next time i visit
            </label>
          </div>

          <div className="flex items-center mt-6">
            <div className="w-32 pr-4"></div>
            <button type="submit" className="bg-red-600 text-white font-bold px-8 py-2 text-sm uppercase">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}