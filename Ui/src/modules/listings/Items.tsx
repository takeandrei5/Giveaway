import { Grid, GridItem } from '@chakra-ui/react';
import { NextRouter, useRouter } from 'next/router';
import { useMemo } from 'react';

import { ListingItem } from '../../components';
import { ListingItemI } from '../../components/standalone/ListingItem/interfaces';
import { ItemsI } from './interfaces';

const Items = ({ items }: ItemsI): JSX.Element => {
	const router: NextRouter = useRouter();

	const renderItems = useMemo(
		(): JSX.Element[] =>
			items.map((item: Omit<ListingItemI, 'onClick'>): JSX.Element => (
				<GridItem key={item.id} w='100%'>
					<ListingItem {...item} onClick={() => router.push(`/listings/${item.id}`)} />
				</GridItem>
			)),
		[items]
	);

	return (
		<Grid marginTop='3rem' justifyItems='center' rowGap='12'>
			{renderItems}
		</Grid>
	);
};

export default Items;
