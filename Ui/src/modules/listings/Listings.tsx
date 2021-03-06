import { Skeleton } from '@components';
import { DEFAULT_CATEGORIES } from '@utils/constants';
import { SortingType } from '@utils/types';
import { useLayoutEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { CategoryBox } from './CategoryBox';
import { useInfiniteFetchListings } from './hooks';
import Items from './ItemsList/ItemsList';
import SortingDropdown from './SortingDropdown/SortingDropdown';
import { ListingsProps } from './types';

const Listings = ({ options }: ListingsProps): JSX.Element => {
	const { isLoading, totalData, nextData, sort, setSort, refetchListings } = useInfiniteFetchListings();

	return (
		<Skeleton
			borderRadius='2xl'
			isLoaded={!isLoading}
			__css={{
				'& div.infinite-scroll-component': {
					overflow: 'initial !important',
				},
			}}>
			<CategoryBox categories={DEFAULT_CATEGORIES} />
			<SortingDropdown
				id='sort-dropdown'
				name='sort-dropdown'
				options={options}
				onChangeHandler={(value: string) => setSort(value as SortingType)}
				value={sort}
			/>
			<InfiniteScroll
				data-testid='infinite-scroll'
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

export default Listings;
