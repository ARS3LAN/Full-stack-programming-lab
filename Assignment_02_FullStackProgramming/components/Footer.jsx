export default function Footer() {
  return (
    <footer className="bg-[#00213B] text-white pt-10 pb-4 text-sm mt-10">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Contact Us */}
        <div>
          <h3 className="text-lg mb-4 uppercase">Contact Us</h3>
          <p className="mb-2">yoursitename.com</p>
          <p className="text-xl mb-4">CALL 24/7: 888 - 201 -8899</p>
          <p>Your Address:</p>
          <p>Street</p>
          <p>State & Zip Code</p>
          <p>City & Country</p>
          <p className="mt-2">Email: servicemail@yoursitename.com</p>
          <div className="flex space-x-2 mt-4">
            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center cursor-pointer">t</div>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">f</div>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer">in</div>
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center cursor-pointer">g+</div>
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center cursor-pointer">y</div>
          </div>
        </div>

        {/* Information */}
        <div>
          <h3 className="text-lg mb-4 uppercase">Information</h3>
          <ul className="space-y-2 border-t border-gray-600 pt-2">
            <li className="border-b border-gray-600 pb-2"><a href="/about" className="hover:text-blue-400">ABOUT US</a></li>
            <li className="border-b border-gray-600 pb-2"><a href="/contact" className="hover:text-blue-400">CUSTOMER SERVICE</a></li>
            <li className="border-b border-gray-600 pb-2"><a href="/terms" className="hover:text-blue-400">PRIVACY POLICY</a></li>
            <li className="border-b border-gray-600 pb-2"><a href="#" className="hover:text-blue-400">SITE MAP</a></li>
            <li className="border-b border-gray-600 pb-2"><a href="#" className="hover:text-blue-400">SEARCH TERMS</a></li>
            <li className="border-b border-gray-600 pb-2"><a href="/contact" className="hover:text-blue-400">CONTACT US</a></li>
          </ul>
        </div>

        {/* My Account */}
        <div>
          <h3 className="text-lg mb-4 uppercase">My Account</h3>
          <ul className="space-y-2 border-t border-gray-600 pt-2">
            <li className="border-b border-gray-600 pb-2"><a href="/login" className="hover:text-blue-400">SIGN IN</a></li>
            <li className="border-b border-gray-600 pb-2"><a href="/cart" className="hover:text-blue-400">VIEW CART</a></li>
            <li className="border-b border-gray-600 pb-2"><a href="/account" className="hover:text-blue-400">MY ACCOUNT</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg mb-4 uppercase">Signup For A News Leter</h3>
          <p className="mb-2">SIGN UP FOR OUR NEWS LETTER:</p>
          <div className="flex mb-4">
            <input type="text" className="w-full px-2 py-1 text-black" />
          </div>
          <h3 className="text-sm mb-2 uppercase">Payment Solutions</h3>
          <div className="flex space-x-2 bg-white p-1 inline-flex">
            <span className="text-black font-bold text-xs">VISA / MC / PAYPAL</span>
          </div>
        </div>
      </div>

      <div className="text-center border-t border-gray-600 pt-4 text-xs">
        © 2014 Hottubspaservice.com. All Rights Reserved.
      </div>
    </footer>
  );
}