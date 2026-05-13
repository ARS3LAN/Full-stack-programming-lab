"use client";
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(true);
  
  // 1. ADDED: isCartOpen state to control the modal visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // 2. ADDED: Pulled 'cart' array out of the context to display the items
  const { cart, addToCart, cartTotalCount } = useCart(); 

  useEffect(() => {
    fetch('http://10.120.171.101:5000/api/products')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-black relative">
      {/* Top Navigation */}
      <nav className="flex justify-between items-center p-6 bg-gray-200">
        <h1 className="text-2xl font-bold text-orange-600">Rustik Plank</h1>
        <div className="flex space-x-6 text-sm uppercase items-center">
          <a href="#">Beds</a>
          <a href="#">Cabinets</a>
          <a href="#">Bookcases</a>
          <a href="#">Boxes</a>
          <a href="#">Chairs</a>
          <a href="#">Tables</a>
          
          {/* 3. CHANGED: Div turned into a button that opens the modal */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="ml-4 flex items-center gap-2 font-bold text-orange-600 bg-white px-4 py-2 rounded-full shadow-sm hover:bg-orange-50 transition cursor-pointer"
          >
            🛒 {cartTotalCount} Items
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-orange-500 text-white p-16 flex items-center justify-between" style={{ clipPath: "ellipse(100% 60% at 50% 40%)" }}>
        <div className="max-w-lg">
          <h2 className="text-5xl font-light mb-4">Chairs<br/><span className="font-bold">Collection</span></h2>
          <p className="text-4xl font-bold">£129<span className="text-xl">.99</span></p>
          <button className="mt-6 bg-gray-200 text-black px-6 py-2 rounded-full font-bold shadow hover:bg-white transition">
            ADD TO CART
          </button>
        </div>
      </section>

      {/* Products Filter Section */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <div className="flex justify-center space-x-12 border-b-2 border-gray-200 pb-4 mb-8 uppercase tracking-widest text-gray-500">
          <button className="text-black font-bold border-b-2 border-black pb-4 -mb-[18px]">Featured</button>
          <button className="hover:text-black transition">Special</button>
          <button className="hover:text-black transition">Popular</button>
        </div>

        {/* Debugging UI */}
        {loading && <p className="text-center text-xl font-bold text-gray-500 my-12">Loading products from database...</p>}
        {error && <p className="text-center text-xl font-bold text-red-500 bg-red-100 p-4 rounded border border-red-400 my-12">Connection Error: {error}</p>}

        {/* Dynamic Product Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {products.length === 0 && <p className="col-span-3 text-center">No products found in the database.</p>}
             
             {products.map((product: any) => (
               <div key={product._id} className="bg-white p-6 shadow-sm border text-center flex flex-col items-center">
                 <div className="h-32 w-full bg-gray-100 mb-4 rounded flex items-center justify-center text-gray-400">
                   {product.image}
                 </div>
                 <h3 className="font-semibold mb-2">{product.name}</h3>
                 <p className="font-bold text-orange-500">£{product.price}</p>
                 
                 <button 
                   onClick={() => addToCart(product)} 
                   className="mt-4 border border-gray-300 px-6 py-1 rounded text-sm hover:bg-orange-500 hover:text-white transition"
                 >
                   Add to Cart
                 </button>
               </div>
             ))}
          </div>
        )}
      </section>

      {/* 4. ADDED: Cart Modal Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity">
          <div className="bg-white p-8 rounded-lg max-w-md w-full relative shadow-2xl">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsCartOpen(false)} 
              className="absolute top-4 right-5 text-2xl font-bold text-gray-400 hover:text-red-500 transition"
            >
              &times;
            </button>
            
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Your Cart</h2>
            
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center my-8">Your cart is currently empty.</p>
            ) : (
              <div className="max-h-64 overflow-y-auto pr-2">
                {cart.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center border-b py-3">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-orange-500">
                      £{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
            
            {/* Total and Checkout */}
            {cart.length > 0 && (
              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between text-xl font-bold mb-4">
                  <span>Total:</span>
                  <span>
                    £{cart.reduce((total: number, item: any) => total + (item.price * item.quantity), 0).toFixed(2)}
                  </span>
                </div>
                <button className="w-full bg-orange-500 text-white py-3 rounded-md font-bold hover:bg-orange-600 transition shadow-md">
                  PROCEED TO CHECKOUT
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}