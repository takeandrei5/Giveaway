import { NextPage } from 'next/types';

import { ListingCategoryBox, ListingItems } from '../../modules';
import { CategoryBoxI, ItemsI } from '../../modules/listings/interfaces';
import categories from '../../utils/constants/categoriesConstant';

type ListingPageI = CategoryBoxI & Omit<ItemsI, 'onClick'>;

const ListingsPage: NextPage<ListingPageI> = ({ categories, items }: ListingPageI) => {
	return (
		<>
			<ListingCategoryBox categories={categories} />
			<ListingItems items={items} />
		</>
	);
};

export async function getServerSideProps(): Promise<{ props: ListingPageI }> {
	return {
		props: {
			categories,
			items: [
				{
					id: '123',
					title: "Masina lu' Vericu full-opzion full fara trapa pentru pretentiosi",
					image: 'https://frankfurt.apollo.olxcdn.com/v1/files/tj6e37yggawb2-RO/image;s=1000x700',
					createdOn: new Date(),
				},
				{
					id: '124',
					title: "Masina lu' Vericu full-opzion full fara trapa pentru pretentiosi",
					image: 'https://frankfurt.apollo.olxcdn.com/v1/files/tj6e37yggawb2-RO/image;s=1000x700',
					createdOn: new Date(),
				},
			],
		},
	};
}

export default ListingsPage;
