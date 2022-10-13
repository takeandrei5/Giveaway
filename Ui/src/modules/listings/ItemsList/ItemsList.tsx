import { ItemData } from '@api/webapi/listings/types';
import { Grid } from '@chakra-ui/react';
import { useMemo } from 'react';

import { Item } from './Item';
import { ItemsListProps } from './types';

const ItemsList = ({ items }: ItemsListProps): JSX.Element => {
	const listOfItems: JSX.Element[] = useMemo(
		(): JSX.Element[] => items.map((item: ItemData): JSX.Element => <Item key={item.id} {...item} />),
		[items]
	);

	return (
		<Grid marginTop='1rem' justifyItems='center' rowGap='4'>
			{listOfItems}
		</Grid>
	);
};

export default ItemsList;
