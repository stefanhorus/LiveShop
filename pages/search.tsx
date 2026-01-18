import React from 'react';
import { useRouter } from 'next/router';
import { useSearchProductsQuery } from '../generated/graphql';
import Link from 'next/link';

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

  const products = data?.products?.edges || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Rezultate căutare: {searchQuery}
      </h1>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-600">Se caută produse...</p>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center py-12">
          <p className="text-red-600">Eroare la căutare: {error.message}</p>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-600">Nu s-au găsit produse pentru "{searchQuery}"</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
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
                      alt={node.thumbnail?.alt || node.name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">Fără imagine</span>
                    </div>
                  )}
                  <div className="p-4">
                    <p className="block text-lg font-semibold text-gray-900 truncate mb-1">
                      {node.name}
                    </p>
                    {node.category && (
                      <p className="block text-sm text-gray-500 mb-2">{node.category.name}</p>
                    )}
                    <p className="block text-lg font-bold text-indigo-600">{priceDisplay}</p>
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
