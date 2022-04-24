import { Search2Icon, SmallCloseIcon } from '@chakra-ui/icons';
import { Center, Grid, GridItem, useStyleConfig } from '@chakra-ui/react';
import { Form, FormikProps, FormikProvider, useFormik } from 'formik';
import React from 'react';

import { ButtonPrimary, Input } from '../../shared';
import { FormikInitialValues } from './types';

const SearchBox = (): JSX.Element => {
	const styles = useStyleConfig('SearchBox');

	const submitSearch = (): void => formik.resetForm();

	const formik: FormikProps<FormikInitialValues> = useFormik<FormikInitialValues>({
		initialValues: {
			searchByField: '',
		},
		onSubmit: submitSearch,
		enableReinitialize: true,
	});

	return (
		<FormikProvider value={formik}>
			<Form onSubmit={formik.handleSubmit}>
				<Center __css={styles} flexDirection='row' id='search-container'>
					<Grid height='3.5rem' templateColumns='repeat(5, 1fr)' gap={0}>
						<GridItem colSpan={4}>
							<Input
								id='searchByField-input'
								height='100%'
								name='searchByField'
								placeholder='Type in to search'
								leftIcon={<Search2Icon />}
								rightIcon={
									formik.values.searchByField ? (
										<SmallCloseIcon
											cursor={'pointer'}
											onClick={() => formik.resetForm({ values: { searchByField: '' } })}
										/>
									) : undefined
								}
								onChange={(e) => formik.setFieldValue('searchByField', e?.target)}
								value={formik.values.searchByField}
							/>
						</GridItem>
						<GridItem colSpan={1}>
							<ButtonPrimary type='submit'>Search!</ButtonPrimary>
						</GridItem>
					</Grid>
				</Center>
			</Form>
		</FormikProvider>
	);
};

export default React.memo(SearchBox);
