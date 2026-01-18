import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useProductDetailsQuery, useSimilarProductsQuery } from '../../generated/graphql';
import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../contexts/CartContext';

const ProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();

  const { data, loading, error } = useProductDetailsQuery({
    variables: {
      id: id as string,
      channel: 'default-channel',
    },
    skip: !id,
  });

  const product = data?.product;
  const categoryId = product?.category?.id;

  const { data: similarData } = useSimilarProductsQuery({
    variables: {
      categoryId: categoryId || '',
      channel: 'default-channel',
    },
    skip: !categoryId,
  });

  const similarProducts = similarData?.category?.products?.edges
    ?.filter(edge => edge.node.id !== id)
    .slice(0, 4) || [];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-600">Se încarcă produsul...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center py-12">
          <p className="text-red-600">Eroare la încărcarea produsului: {error?.message || 'Produsul nu a fost găsit'}</p>
          <Link href="/" className="ml-4 text-indigo-600 hover:text-indigo-800">Înapoi la produse</Link>
        </div>
      </div>
    );
  }

  const images = product.images || [];
  const mainImage = images[selectedImageIndex] || images[0];
  const price = product.pricing?.priceRange?.start?.gross;
  const priceDisplay = price ? `${price.amount} ${price.currency}` : 'Preț indisponibil';
  const isOnSale = product.pricing?.onSale;
  const stock = product.variants?.[0]?.quantityAvailable || 0;

  const handleAddToCart = () => {
    if (!product || !price) return;

    addToCart({
      productId: product.id,
      name: product.name || 'Produs',
      price: Number(price.amount),
      currency: price.currency,
      image: mainImage?.url,
    });

    alert('Produs adăugat în coș!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">
        ← Înapoi la produse
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Galerie Foto */}
        <div>
          <div className="mb-4">
            {mainImage ? (
              <img
                src={mainImage.url}
                alt={mainImage.alt || product.name}
                className="w-full h-96 object-contain bg-gray-100 rounded-lg"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Fără imagine</span>
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    selectedImageIndex === index ? 'border-indigo-600' : 'border-gray-300'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt || `${product.name} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Informații Produs */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

          {/* Preț */}
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-indigo-600">{priceDisplay}</span>
              {isOnSale && (
                <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded">
                  Reducere
                </span>
              )}
            </div>
          </div>

          {/* Stoc */}
          <div className="mb-6">
            <p className={`text-sm font-medium ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stock > 0 ? `Stoc disponibil: ${stock}` : 'Stoc epuizat'}
            </p>
          </div>

          {/* Descriere */}
          {product.description && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Descriere</h2>
              <div
                className="text-gray-700 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}

          {/* Specificații/Atribute */}
          {product.attributes && product.attributes.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Specificații</h2>
              <dl className="grid grid-cols-2 gap-4">
                {product.attributes.map((attr) => (
                  <div key={attr.attribute.id}>
                    <dt className="text-sm font-medium text-gray-500">{attr.attribute.name}</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {attr.values.map((v) => v.name).join(', ')}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Buton Adaugă în Coș */}
          <button
            onClick={handleAddToCart}
            disabled={stock === 0}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            <span>{stock > 0 ? 'Adaugă în Coș' : 'Stoc epuizat'}</span>
          </button>
        </div>
      </div>

      {/* Produse Similare */}
      {similarProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Produse Similare</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map(({ node }) => {
              const similarPrice = node.pricing?.priceRange?.start?.gross;
              const similarPriceDisplay = similarPrice
                ? `${similarPrice.amount} ${similarPrice.currency}`
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
                      <p className="text-lg font-semibold text-gray-900 truncate mb-1">
                        {node.name}
                      </p>
                      <p className="text-lg font-bold text-indigo-600">{similarPriceDisplay}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
