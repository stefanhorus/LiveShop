import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MagnifyingGlassIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { getTotalItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

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

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors ${
                  router.pathname === '/'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                Acasă
              </Link>
              <Link
                href="/categories"
                className={`text-sm font-medium transition-colors ${
                  router.pathname === '/categories'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                Categorii
              </Link>
            </nav>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-lg mx-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Caută produse..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Link
                href="/account"
                className="p-2 text-gray-700 hover:text-indigo-600 transition-colors relative"
                title={isAuthenticated ? user?.email || 'Cont' : 'Cont'}
              >
                <UserIcon className="h-6 w-6" />
                {isAuthenticated && (
                  <span className="absolute top-0 right-0 bg-green-500 rounded-full h-2 w-2"></span>
                )}
              </Link>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">LiveShop</h3>
              <p className="text-gray-400 text-sm">
                Magazinul tău online pentru produse sportive și trofee.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Link-uri utile</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Acasă</Link></li>
                <li><Link href="/categories" className="text-gray-400 hover:text-white transition-colors">Categorii</Link></li>
                <li><Link href="/account" className="text-gray-400 hover:text-white transition-colors">Contul meu</Link></li>
                <li><Link href="/cart" className="text-gray-400 hover:text-white transition-colors">Coșul meu</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: contact@liveshop.ro</li>
                <li>Telefon: +40 7XX XXX XXX</li>
                <li>Adresă: Strada Exemplu, Nr. 10, Oraș, România</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2024 LiveShop. Toate drepturile rezervate.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
