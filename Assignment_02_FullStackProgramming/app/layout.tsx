import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 bg-white shadow-sm mt-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}