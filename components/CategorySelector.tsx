import React from 'react';
import clsx from 'clsx';

export interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categorySlug: string | null) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Selectează o categorie:</h2>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => onSelectCategory(null)}
          className={clsx(
            'px-6 py-3 rounded-lg font-medium transition-all',
            selectedCategory === null
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-indigo-500 hover:text-indigo-600'
          )}
        >
          Toate produsele
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.slug)}
            className={clsx(
              'px-6 py-3 rounded-lg font-medium transition-all',
              selectedCategory === category.slug
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-indigo-500 hover:text-indigo-600'
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
