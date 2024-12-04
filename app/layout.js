"use client";

import "./globals.css";
import Link from "next/link";


export default function RootLayout({ children }) {
  const handleLogout = () => {
    localStorage.removeItem("userId");
    // You might want to add redirect logic here
    window.location.href = "/";
  };

  return (
    <html lang="en">
      <body>
        <nav className="bg-amber-600 text-white shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link
                href="/"
                className="text-2xl font-bold hover:text-amber-200"
              >
                Delicious Java
              </Link>
              <div className="flex space-x-4">
                <Link href="/" className="hover:text-amber-200 py-2 px-3">
                  Menu
                </Link>
                <Link href="/cart" className="hover:text-amber-200 py-2 px-3">
                  Cart
                </Link>
                <Link href="/orders" className="hover:text-amber-200 py-2 px-3">
                  Orders
                </Link>
                <Link href="/admin" className="hover:text-amber-200 py-2 px-3">
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-amber-200 py-2 px-3 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
          {children}
        </main>
      </body>
    </html>
  );
}
