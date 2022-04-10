import { Search2Icon, SmallCloseIcon } from '@chakra-ui/icons';
import { Box, Grid, GridItem, useStyleConfig } from '@chakra-ui/react';
import { Form, FormikProps, FormikProvider, useFormik } from 'formik';
import React from 'react';
import { useState } from 'react';

import { ButtonPrimary, Input } from '../../shared';
import { FormikInitialValuesI } from './interfaces';

const SearchBox = (): JSX.Element => {
	const styles = useStyleConfig('SearchBox');

	const submitSearch = () => {
		formik.resetForm();
	};

	const formik: FormikProps<FormikInitialValuesI> = useFormik<FormikInitialValuesI>({
		initialValues: {
			searchByField: '',
		},
		onSubmit: submitSearch,
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
								value={formik.values.searchByField}
							/>
						</GridItem>
						<GridItem colSpan={1}>
							<ButtonPrimary type='submit'>Search!</ButtonPrimary>
						</GridItem>
					</Grid>
				</Box>
			</Form>
		</FormikProvider>
	);
};

export default React.memo(SearchBox);
