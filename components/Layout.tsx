import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { getTotalItems } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-indigo-600">
                LiveShop
              </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Link
                href="/cart"
                className="p-2 text-gray-700 hover:text-indigo-600 transition-colors relative"
                title="Coș"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute top-0 right-0 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">LiveShop</h3>
            <p className="text-gray-400 text-sm">
              &copy; 2024 LiveShop. Toate drepturile rezervate.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
