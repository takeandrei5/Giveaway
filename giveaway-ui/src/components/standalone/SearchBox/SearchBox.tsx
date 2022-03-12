import { Search2Icon } from '@chakra-ui/icons';
import { Box, Grid, GridItem, useStyleConfig } from '@chakra-ui/react';
import { Form, FormikProps, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';

import { ButtonPrimary, Input } from '../../shared';
import { FormikInitialValuesI } from './interfaces';

const SearchBox = (): JSX.Element => {
	const [searchByField, setSearchByField] = useState<string>('');

	const styles = useStyleConfig('SearchBox');

	const submitSearch = () => {
		console.log('To be implemented');
	};

	const formik: FormikProps<FormikInitialValuesI> = useFormik<FormikInitialValuesI>({
		initialValues: {
			searchByField: searchByField,
		},
		onSubmit: () => submitSearch(),
		enableReinitialize: true,
	});

	return (
		<FormikProvider value={formik}>
			<Form onSubmit={formik.handleSubmit}>
				<Box
					__css={styles}
					display='flex'
					alignItems='center'
					justifyContent='center'
					flexDirection='row'
					id='search-container'>
					<Grid height='3.5rem' templateColumns='repeat(5, 1fr)' gap={0}>
						<GridItem colSpan={4}>
							<Input
								id='searchByField-input'
								name='searchByField'
								placeholder='Type in to search'
								leftIcon={<Search2Icon />}
								value={formik.values.searchByField}
							/>
						</GridItem>
						<GridItem colSpan={1}>
							<ButtonPrimary type='submit' rightIcon={<Search2Icon />}>Search!</ButtonPrimary>
						</GridItem>
					</Grid>
				</Box>
			</Form>
		</FormikProvider>
	);
};

export default SearchBox;
