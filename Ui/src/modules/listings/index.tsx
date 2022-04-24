import { Skeleton } from '../../components';
import { categories } from '../../utils/constants';
import { SortingType } from '../../utils/types';
import { CategoryBox } from './CategoryBox';
import useFetchListings from './hooks';
import Items from './ItemsList/ItemsList';
import SortingDropdown from './SortingDropdown/SortingDropdown';
import { ListingsModuleProps } from './SortingDropdown/types';

export { default as CategoryBox } from './CategoryBox/CategoryBox';
export { default as Items } from './ItemsList/ItemsList';
export { default as SortingDropdown } from './SortingDropdown/SortingDropdown';

const ListingsModule = ({ options }: ListingsModuleProps): JSX.Element => {
	const { isLoading, listings, sort, setSort } = useFetchListings();

	return (
		<Skeleton borderRadius='2xl' isLoaded={!isLoading}>
			<CategoryBox categories={categories} />
			<SortingDropdown
				id='sort-dropdown'
				name='sort-dropdown'
				options={options}
				onChangeHandler={(value: string) => setSort(value as SortingType)}
				value={sort}
			/>
			<Items items={listings?.result || []} />
		</Skeleton>
	);
};

export default ListingsModule;
