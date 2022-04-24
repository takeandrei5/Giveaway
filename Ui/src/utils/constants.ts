import { Category } from './types';

const categories: Category[] = [
	{
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Closed_Book_Icon.svg/1024px-Closed_Book_Icon.svg.png?20170605011735',
		category: 'clothes',
		name: 'Clothes',
	},
	{
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Closed_Book_Icon.svg/1024px-Closed_Book_Icon.svg.png?20170605011735',
		category: 'toys',
		name: 'Toys',
	},
	{
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Closed_Book_Icon.svg/1024px-Closed_Book_Icon.svg.png?20170605011735',
		category: 'books',
		name: 'Books',
	},
	{
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Closed_Book_Icon.svg/1024px-Closed_Book_Icon.svg.png?20170605011735',
		category: 'electronics',
		name: 'Electronics',
	},
];

const defaultImageUpload: string =
	'https://imagedelivery.net/G1lMtwsUs9dEAB6xuB8WcA/318e4ec3-9120-4fd1-e9ce-05419eff8500/public';

export { categories, defaultImageUpload };
