import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useProductDetailsQuery, useSimilarProductsQuery } from '../../generated/graphql';
import Link from 'next/link';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../contexts/CartContext';

const ProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
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
        </div>
      </div>
    );
  }

  const images = product.images || [];
  const mainImage = images[selectedImageIndex] || images[0];
  const price = product.pricing?.priceRange?.start?.gross;
  const priceDisplay = price ? `${price.amount} ${price.currency}` : 'Preț indisponibil';
  const isOnSale = product.pricing?.onSale;

  const handleAddToCart = () => {
    if (!product) return;

    const variant = selectedVariant
      ? product.variants?.find((v) => v.id === selectedVariant)
      : product.variants?.[0];

    if (!variant) {
      alert('Nu există variante disponibile pentru acest produs');
      return;
    }

    const variantPrice = variant.pricing?.price?.gross;
    if (!variantPrice) {
      alert('Preț indisponibil pentru această variantă');
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: parseFloat(variantPrice.amount),
      currency: variantPrice.currency,
      image: mainImage?.url,
      variantId: variant.id,
      variantName: variant.name,
    });

    alert('Produs adăugat în coș!');
  };

  const handleAddToWishlist = () => {
    // TODO: Implementare wishlist
    alert('Produs adăugat în wishlist!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-4 text-sm">
        <Link href="/" className="text-gray-500 hover:text-gray-700">Acasă</Link>
        {product.category && (
          <>
            <span className="mx-2 text-gray-500">/</span>
            <Link href={`/categories/${product.category.slug}`} className="text-gray-500 hover:text-gray-700">
              {product.category.name}
            </Link>
          </>
        )}
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

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

          {/* Atribute */}
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

          {/* Variante */}
          {product.variants && product.variants.length > 1 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Variante</h2>
              <div className="space-y-2">
                {product.variants.map((variant) => {
                  const variantPrice = variant.pricing?.price?.gross;
                  const stock = variant.quantityAvailable || 0;
                  const isSelected = selectedVariant === variant.id;
                  
                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant.id)}
                      className={`w-full text-left p-3 border-2 rounded-lg transition-colors ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-300 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{variant.name}</p>
                          {variant.sku && (
                            <p className="text-sm text-gray-500">SKU: {variant.sku}</p>
                          )}
                        </div>
                        <div className="text-right">
                          {variantPrice && (
                            <p className="font-semibold text-indigo-600">
                              {variantPrice.amount} {variantPrice.currency}
                            </p>
                          )}
                          <p className={`text-sm ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {stock > 0 ? `Stoc: ${stock}` : 'Stoc epuizat'}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Stoc */}
          {product.variants && product.variants.length === 1 && (
            <div className="mb-6">
              <p className={`text-sm font-medium ${(product.variants[0].quantityAvailable || 0) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {(product.variants[0].quantityAvailable || 0) > 0
                  ? `Stoc disponibil: ${product.variants[0].quantityAvailable}`
                  : 'Stoc epuizat'}
              </p>
            </div>
          )}

          {/* Butoane Acțiune */}
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              <span>Adaugă în Coș</span>
            </button>
            <button
              onClick={handleAddToWishlist}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:border-indigo-600 hover:text-indigo-600 transition-colors"
              title="Adaugă în Wishlist"
            >
              <HeartIcon className="h-5 w-5" />
            </button>
          </div>
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
                      <p className="block text-lg font-semibold text-gray-900 truncate mb-1">
                        {node.name}
                      </p>
                      <p className="block text-lg font-bold text-indigo-600">{similarPriceDisplay}</p>
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
