import React from 'react';

export default function RegisterPage() {
  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="text-xs text-blue-600 mb-6 border-b pb-2">
        Home &gt; <span className="text-gray-600">Register</span>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-slate-800">Create New Account</h2>

      <div className="bg-gray-100 p-6 md:p-10 mb-10">
        <h3 className="font-bold text-lg text-slate-800 mb-4">User Account Details</h3>
        <p className="text-xs text-gray-700 mb-6">
          To create a new account, please fill in the required information below. Passwords are case sensitive and must be 6 to 20 characters long<br/><br/>
          *Required Fields
        </p>

        <form className="max-w-xl space-y-4">
          {[
            { label: "Email Address", type: "email" },
            { label: "Password", type: "password" },
            { label: "Re-enter Password", type: "password" },
            { label: "First Name", type: "text" },
            { label: "Last Name", type: "text" },
          ].map((field, idx) => (
            <div key={idx} className="flex items-center">
              <label className="w-40 text-right pr-4 text-xs font-bold text-gray-700">
                {field.label} <span className="text-red-500">*</span>
              </label>
              <input type={field.type} className="flex-1 border border-gray-300 p-2 text-sm" />
            </div>
          ))}

          <div className="flex items-center mt-4">
            <div className="w-40 pr-4"></div>
            <label className="flex items-center text-xs text-gray-700 gap-2">
              <input type="checkbox" /> Yes, I want to receive email about new products and specials!
            </label>
          </div>

          <div className="flex items-center mt-6">
            <div className="w-40 pr-4"></div>
            <div className="flex items-center gap-4">
              <button type="submit" className="bg-red-600 text-white font-bold px-6 py-2 text-sm uppercase">
                Create Account
              </button>
              <a href="/forgot-password" className="text-blue-500 text-xs hover:underline">Forgor your password?</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}