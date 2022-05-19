import { Category, PaginationOptions } from './types';

const DEFAULT_CATEGORIES: Category[] = [
	{
		image: 'https://imagedelivery.net/G1lMtwsUs9dEAB6xuB8WcA/4e6fd6f7-c956-4be1-9de0-8ce4ce6b8400/public',
		category: 'clothes',
		name: 'Clothes',
	},
	{
		image: 'https://imagedelivery.net/G1lMtwsUs9dEAB6xuB8WcA/40701e6b-a8dd-4e22-492c-70e715674400/public',
		category: 'toys',
		name: 'Toys',
	},
	{
		image: 'https://imagedelivery.net/G1lMtwsUs9dEAB6xuB8WcA/41655f03-8862-49c3-aa3c-56296596f200/public',
		category: 'books',
		name: 'Books',
	},
	{
		image: 'https://imagedelivery.net/G1lMtwsUs9dEAB6xuB8WcA/66ca73b1-509d-41df-1891-4460423b9000/public',
		category: 'electronics',
		name: 'Electronics',
	},
];

const DEFAULT_IMAGE_UPLOAD: string =
	'https://imagedelivery.net/G1lMtwsUs9dEAB6xuB8WcA/318e4ec3-9120-4fd1-e9ce-05419eff8500/public';

const MAX_IMAGES: number = 6;

const DEFAULT_PAGINATION_OPTIONS: PaginationOptions = {
	pageNumber: 1,
	pageSize: 10,
};

const THEME_COLOURS = {
	primary: {
		main: '#7B61FF',
		light: '#F7EBFF',
		dark: '#B8A8DE',
	},
	secondary: {
		main: '#302CC0',
		light: '#008CFF',
		dark: '#000083',
	},
	dark: '#1D1927',
	darkish: '#262d3b',
	grayish: '#2D3748',
	lightish: '#DDE3EB',
	light: '#FCF7FF',
};

export { DEFAULT_CATEGORIES, DEFAULT_IMAGE_UPLOAD, DEFAULT_PAGINATION_OPTIONS, MAX_IMAGES, THEME_COLOURS };
