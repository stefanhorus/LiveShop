import React, { useState } from 'react';
import { UserIcon, ShoppingBagIcon, HeartIcon } from '@heroicons/react/24/outline';

const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist'>('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'Ion',
    lastName: 'Popescu',
    email: 'ion.popescu@example.com',
    phone: '+40 123 456 789',
  });

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Livrat',
      total: 299.99,
      items: 3,
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'În procesare',
      total: 149.50,
      items: 2,
    },
  ];

  const wishlistItems = [
    {
      id: '1',
      name: 'Mingă Fotbal Adidas',
      price: 89.99,
      image: null,
    },
  ];

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Datele au fost actualizate!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Contul Meu</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="bg-white rounded-lg shadow-sm p-4">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                activeTab === 'profile'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <UserIcon className="h-5 w-5" />
              <span className="font-medium">Date Personale</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                activeTab === 'orders'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ShoppingBagIcon className="h-5 w-5" />
              <span className="font-medium">Comenzi</span>
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'wishlist'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <HeartIcon className="h-5 w-5" />
              <span className="font-medium">Wishlist</span>
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Date Personale</h2>
              <form onSubmit={handleProfileUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prenume
                    </label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) =>
                        setProfileData({ ...profileData, firstName: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nume
                    </label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) =>
                        setProfileData({ ...profileData, lastName: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({ ...profileData, email: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({ ...profileData, phone: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Salvează Modificările
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Comenzi Anterioare</h2>
              {orders.length === 0 ? (
                <p className="text-gray-600">Nu ai comenzi anterioare.</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">Comandă #{order.id}</p>
                          <p className="text-sm text-gray-500">Data: {order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {order.total.toFixed(2)} RON
                          </p>
                          <p className="text-sm text-gray-500">{order.items} produse</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === 'Livrat'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Wishlist</h2>
              {wishlistItems.length === 0 ? (
                <p className="text-gray-600">Wishlist-ul tău este gol.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
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
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                        <p className="text-indigo-600 font-semibold mb-4">
                          {item.price.toFixed(2)} RON
                        </p>
                        <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                          Adaugă în Coș
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
