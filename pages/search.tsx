import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSearchProductsQuery } from '../generated/graphql';

const SearchPage: React.FC = () => {
  const router = useRouter();
  const { q } = router.query;
  const searchQuery = typeof q === 'string' ? q : '';

  const { data, loading, error } = useSearchProductsQuery({
    variables: {
      query: searchQuery,
      channel: 'default-channel',
    },
    skip: !searchQuery,
  });

  if (!searchQuery) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Căutare Produse</h1>
        <p className="text-gray-600">Introduceți un termen de căutare.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Căutare: {searchQuery}</h1>
        <p className="text-gray-600">Se încarcă rezultatele...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Căutare: {searchQuery}</h1>
        <p className="text-red-600">Eroare la căutare: {error.message}</p>
      </div>
    );
  }

  const products = data?.products?.edges || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Rezultate căutare pentru: "{searchQuery}"
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-600">Nu s-au găsit produse.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(({ node }) => {
            const price = node.pricing?.priceRange?.start?.gross;
            const priceDisplay = price
              ? `${price.amount} ${price.currency}`
              : 'Preț indisponibil';

            return (
              <Link key={node.id} href={`/product/${node.id}`}>
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  {node.thumbnail?.url ? (
                    <img
                      src={node.thumbnail.url}
                      alt={node.thumbnail?.alt || node.name || 'Produs'}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">Fără imagine</span>
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-lg font-semibold text-gray-900 truncate mb-1">
                      {node.name}
                    </p>
                    {node.category?.name && (
                      <p className="text-sm text-gray-500 mb-2">{node.category.name}</p>
                    )}
                    <p className="text-lg font-bold text-indigo-600">{priceDisplay}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
