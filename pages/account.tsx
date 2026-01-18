import React from 'react';
import Link from 'next/link';

const AccountPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Contul Meu</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-600 mb-4">Funcționalitatea de cont va fi disponibilă în curând.</p>
        <Link
          href="/"
          className="text-indigo-600 hover:text-indigo-800"
        >
          ← Înapoi la produse
        </Link>
      </div>
    </div>
  );
};

export default AccountPage;
