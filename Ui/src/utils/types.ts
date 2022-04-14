export type Category = 'clothes' | 'toys' | 'books' | 'electronics';
export type PaginatedResult<T> = {
	result: T[];
	currentPage: number;
	totalPages: number;
	totalCount: number;
	pageSize: number;
	hasPreviousPage: boolean;
	hasNextPage: boolean;
};
