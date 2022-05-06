import { DehydratedState as ReactQueryDehydratedState } from 'react-query';

import { CategoryTypeEnum } from './enums';

export type CategoryType = `${CategoryTypeEnum}`;
export type SortingType = 'Title ASC' | 'Title DESC' | 'CreatedAt ASC' | 'CreatedAt DESC';
export type PaginatedResult<T> = {
	result: T[];
	currentPage: number;
	totalPages: number;
	totalCount: number;
	pageSize: number;
	hasPreviousPage: boolean;
	hasNextPage: boolean;
};

export type Category = {
	category: CategoryType;
	image: string;
	name: string;
};

export type PaginationOptions = {
	pageNumber: number;
	pageSize: number;
};

export type DehydratedState = { dehydratedState: ReactQueryDehydratedState };
