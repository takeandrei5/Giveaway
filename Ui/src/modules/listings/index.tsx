import { Skeleton } from '@components';
import { DEFAULT_CATEGORIES } from '@utils/constants';
import { SortingType } from '@utils/types';
import InfiniteScroll from 'react-infinite-scroll-component';

import { CategoryBox } from './CategoryBox';
import useInfiniteFetchListings from './hooks';
import Items from './ItemsList/ItemsList';
import SortingDropdown from './SortingDropdown/SortingDropdown';
import { ListingsModuleProps } from './types';

const ListingsModule = ({ options }: ListingsModuleProps): JSX.Element => {
	const { isLoading, totalData, nextData, sort, setSort, refetchListings } = useInfiniteFetchListings();

	return (
		<Skeleton borderRadius='2xl' isLoaded={!isLoading}>
			<CategoryBox categories={DEFAULT_CATEGORIES} />
			<SortingDropdown
				id='sort-dropdown'
				name='sort-dropdown'
				options={options}
				onChangeHandler={(value: string) => setSort(value as SortingType)}
				value={sort}
			/>
			<InfiniteScroll
				dataLength={totalData.length}
				next={refetchListings}
				loader={<></>}
				pullDownToRefreshThreshold={50}
				hasMore={nextData ? nextData.hasNextPage : false}>
				<Items items={totalData} />
			</InfiniteScroll>
		</Skeleton>
	);
};

export default ListingsModule;
