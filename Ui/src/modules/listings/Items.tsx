import { Grid, GridItem } from '@chakra-ui/react';
import { useMemo } from 'react';

import { ListingItem } from '../../components';
import { ItemsI } from './interfaces';
import { NextRouter, useRouter } from 'next/router';

const Items = ({ items }: ItemsI) => {
	const router: NextRouter = useRouter();

	const renderItems = useMemo(
		(): JSX.Element[] =>
			items.map((item) => (
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
