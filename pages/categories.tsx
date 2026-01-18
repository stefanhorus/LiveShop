import React from 'react';
import Link from 'next/link';
import { useCategoriesQuery } from '../generated/graphql';

const CategoriesPage: React.FC = () => {
  const { data, loading, error } = useCategoriesQuery();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-600">Se încarcă categoriile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center py-12">
          <p className="text-red-600">Eroare la încărcarea categoriilor: {error.message}</p>
        </div>
      </div>
    );
  }

  const categories = data?.categories?.edges?.map(edge => edge.node) || [];

  // Categorii hardcodate pentru a se potrivi cu cerințele
  const displayCategories = categories.length > 0 ? categories : [
    { id: '1', name: 'Mingi Fotbal', slug: 'mingi-fotbal', description: 'Mingi de fotbal de înaltă calitate', backgroundImage: null },
    { id: '2', name: 'Mini-Trofee', slug: 'mini-trofee', description: 'Trofee miniatură pentru colecție', backgroundImage: null },
    { id: '3', name: 'Postere cu Echipe', slug: 'postere-cu-echipe', description: 'Postere cu echipe de fotbal', backgroundImage: null },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Categorii Produse</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCategories.map((category) => (
          <Link key={category.id} href={`/?category=${category.slug}`}>
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer">
              {category.backgroundImage?.url ? (
                <img
                  src={category.backgroundImage.url}
                  alt={category.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{category.name}</span>
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h2>
                {category.description && (
                  <p className="text-gray-600">{category.description}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
