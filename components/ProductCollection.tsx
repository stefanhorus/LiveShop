import { useAllProductsQuery, type AllProductsQuery } from '../generated/graphql';
import Link from 'next/link';

interface ProductsProps {
	selectedCategorySlug: string | null;
}

type ProductEdge = NonNullable<AllProductsQuery['products']>['edges'][number];

function Products({ selectedCategorySlug }: ProductsProps) {
	const { loading, error, data } = useAllProductsQuery();

	if (loading) return (
		<div className="flex justify-center items-center py-12">
			<p className="text-gray-600">Se încarcă produsele...</p>
		</div>
	);
	
	if (error) return (
		<div className="flex justify-center items-center py-12">
			<p className="text-red-600">Eroare la încărcarea produselor: {error.message}</p>
		</div>
	);

	if (data) {
		let products: ProductEdge[] = data.products?.edges || [];

		// Filtrare după categorie dacă este selectată
		if (selectedCategorySlug) {
			products = products.filter(
				(edge: ProductEdge) => edge.node.category?.slug === selectedCategorySlug
			);
		}

		if (products.length === 0) {
			return (
				<div className="flex justify-center items-center py-12">
					<p className="text-gray-600">
						{selectedCategorySlug 
							? 'Nu există produse în această categorie.' 
							: 'Nu există produse disponibile.'}
					</p>
				</div>
			);
		}

		return (
			<ul role="list" className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{products.map(
					({ node: { id, name, thumbnail, category, pricing } }) => {
						const price = pricing?.priceRange?.start?.gross;
						const priceDisplay = price 
							? `${price.amount} ${price.currency}` 
							: 'Preț indisponibil';

						return (
							<li key={id} className="relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
								<Link href={`/product/${id}`} className="block">
									{thumbnail?.url ? (
										<img 
											src={thumbnail.url} 
											alt={thumbnail?.alt || name || 'Produs'} 
											className="w-full h-48 object-cover"
										/>
									) : (
										<div className="w-full h-48 bg-gray-200 flex items-center justify-center">
											<span className="text-gray-400">Fără imagine</span>
										</div>
									)}
									<div className="p-4">
										<p className="block text-lg font-semibold text-gray-900 truncate mb-1">{name}</p>
										{category?.name && (
											<p className="block text-sm text-gray-500 mb-2">{category.name}</p>
										)}
										<p className="block text-lg font-bold text-indigo-600">{priceDisplay}</p>
									</div>
								</Link>
							</li>
						);
					},
				)}
			</ul>
		);
	}

	return null;
}

export default Products;