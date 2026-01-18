import React from 'react';
import Link from 'next/link';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const { items: cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  const handleUpdateQuantity = (id: string, delta: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      updateQuantity(id, item.quantity + delta);
    }
  };

  const subtotal = getTotalPrice();
  const shipping = 0; // TODO: Calculare livrare
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Coș de Cumpărături</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Coșul tău este gol</p>
          <Link
            href="/"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Continuă Cumpărăturile
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista Produse */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm divide-y">
              {cartItems.map((item) => (
                <div key={item.id} className="p-6 flex items-center space-x-4">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-400 text-xs">Fără imagine</span>
                    </div>
                  )}

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-indigo-600 font-semibold">
                      {item.price} {item.currency}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, -1)}
                      className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, 1)}
                      className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      {(item.price * item.quantity).toFixed(2)} {item.currency}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-2 text-red-600 hover:text-red-800"
                      title="Șterge"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rezumat Comandă */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Rezumat Comandă</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>{subtotal.toFixed(2)} RON</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Livrare</span>
                  <span>{shipping.toFixed(2)} RON</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>{total.toFixed(2)} RON</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-indigo-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Finalizează Comanda
              </Link>

              <Link
                href="/"
                className="block w-full mt-4 text-center text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Continuă Cumpărăturile
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
