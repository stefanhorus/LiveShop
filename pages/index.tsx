import React, { useState } from 'react';
import Products from '../components/ProductCollection';
import CategorySelector from '../components/CategorySelector';
import { useCategoriesQuery } from '../generated/graphql';

const Home: React.FC = () => {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const { data: categoriesData, loading: categoriesLoading } = useCategoriesQuery();

  // Categorii hardcodate pentru a se potrivi cu cerințele
  const targetCategories = ['mingi-fotbal', 'mini-trofee', 'postere-cu-echipe'];
  
  const categories = categoriesData?.categories?.edges
    ?.map(edge => edge.node)
    .filter(cat => targetCategories.some(target => 
      cat.slug.toLowerCase().includes(target.replace('-', '')) ||
      cat.name.toLowerCase().includes('mingi') ||
      cat.name.toLowerCase().includes('trofee') ||
      cat.name.toLowerCase().includes('postere')
    )) || [];

  // Dacă nu găsim categorii, folosim cele hardcodate
  const displayCategories = categories.length > 0 ? categories : [
    { id: '1', name: 'Mingi Fotbal', slug: 'mingi-fotbal' },
    { id: '2', name: 'Mini-Trofee', slug: 'mini-trofee' },
    { id: '3', name: 'Postere cu Echipe', slug: 'postere-cu-echipe' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bun venit în magazinul nostru!</h1>
        <p className="text-gray-600">Descoperă cele mai bune produse sportive și trofee</p>
      </div>

      {!categoriesLoading && (
        <CategorySelector
          categories={displayCategories}
          selectedCategory={selectedCategorySlug}
          onSelectCategory={setSelectedCategorySlug}
        />
      )}
      
      <Products selectedCategorySlug={selectedCategorySlug} />
    </div>
  );
};

export default Home;







