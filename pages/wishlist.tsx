import React, { useState } from 'react';
import Link from 'next/link';
import { HeartIcon, ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  currency: string;
  image?: string;
  slug: string;
}

const WishlistPage: React.FC = () => {
  // TODO: Înlocuiește cu state management real
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const removeFromWishlist = (id: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id));
  };

  const addToCart = (item: WishlistItem) => {
    // TODO: Implementare adăugare în coș
    alert(`${item.name} a fost adăugat în coș!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <HeartIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Wishlist-ul tău este gol</p>
          <Link
            href="/"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Continuă Cumpărăturile
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <Link href={`/product/${item.id}`}>
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Fără imagine</span>
                  </div>
                )}
              </Link>
              <div className="p-4">
                <Link href={`/product/${item.id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-lg font-bold text-indigo-600 mb-4">
                  {item.price.toFixed(2)} {item.currency}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                    <span>Adaugă în Coș</span>
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="px-4 py-2 border-2 border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                    title="Șterge din Wishlist"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
