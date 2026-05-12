export default function Navbar() {
  return (
    <header className="w-full">
      <div className="bg-gray-100 flex justify-between px-8 py-2 text-xs">
        <span>Call for Customer support: <span className="text-red-600">020 38989565</span></span>
        <div className="space-x-4 text-gray-600">
          <a href="/account" className="hover:text-blue-500">My Account</a>
          <a href="#" className="hover:text-blue-500">Wishlist</a>
          <a href="/checkout" className="hover:text-blue-500">To Checkout</a>
        </div>
      </div>

      <div className="flex justify-between items-center px-8 py-6">
        <div>
          <a href="/">
            <h1 className="text-4xl font-bold text-slate-800 tracking-tighter">HOTSPRING®</h1>
            <span className="text-red-600 font-semibold tracking-widest text-sm">Portable Spas</span>
          </a>
        </div>
        <a href="/cart" className="border p-2 flex items-center space-x-2 text-sm hover:bg-gray-50">
          <span className="bg-red-600 text-white p-1 rounded">🛒</span>
          <span>My Cart: 0 Items (s)</span>
        </a>
      </div>

      <div className="bg-red-600 text-white flex justify-between px-8 py-3 text-sm font-semibold">
        <nav className="flex space-x-8">
          <a href="/" className="hover:text-gray-200">HOME</a>
          <a href="/category" className="hover:text-gray-200">CATEGORY</a>
          <a href="/about" className="hover:text-gray-200">ABOUT US</a>
          <a href="/contact" className="hover:text-gray-200">CONTACT</a>
        </nav>
        <div className="flex">
          <input type="text" className="px-2 py-1 text-black" placeholder="Search..." />
          <button className="bg-gray-800 px-4 py-1">SEARCH</button>
        </div>
      </div>
    </header>
  );
}