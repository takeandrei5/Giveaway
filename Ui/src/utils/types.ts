export type Category = 'clothes' | 'toys' | 'books' | 'electronics'
export type PaginatedResult<T> = {
	result: T[];
	currentPage: number;
	totalPages: number;
	totalCount: number;
	pageSize: number;
	hasPreviousPage: boolean;
	hasNextPage: boolean;
};

type RenameObject<T, K extends keyof any> = T extends object
  ? { [P in K]: T[keyof T] }
  : T;

export type Rename<T extends object, K extends keyof any> = T extends Array<any>
  ? { [I in keyof T]: RenameObject<T[I], K> }
  : RenameObject<T, K>;