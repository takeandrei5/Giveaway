import { Grid, GridItem } from '@chakra-ui/react';
import { NextRouter, useRouter } from 'next/router';
import { useMemo } from 'react';

import { ListingItem } from '../../components';
import { ItemData, ItemsProps } from './types';

const Items = ({ items }: ItemsProps): JSX.Element => {
	const router: NextRouter = useRouter();

	const renderItems = useMemo(
		(): JSX.Element[] =>
			items.map(
				(item: ItemData): JSX.Element => (
					<GridItem key={item.id} w='100%' height='11.375rem'>
						<ListingItem {...item} onClick={() => router.push(`/listings/${item.id}`)} />
					</GridItem>
				)
			),
		[items]
	);

	return (
		<Grid marginTop='1rem' justifyItems='center' rowGap='4'>
			{renderItems}
		</Grid>
	);
};

export default Items;
