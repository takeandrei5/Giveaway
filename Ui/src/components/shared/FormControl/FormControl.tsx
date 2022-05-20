import { FormControl as FormControlChakra, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

import { useCheckFormIsInvalid } from './hooks';
import { FormControlProps } from './types';

const FormControl = ({ children, id, label, name }: FormControlProps): JSX.Element => {
	const [_, meta] = useField<unknown>(name);
	const { isInvalid } = useCheckFormIsInvalid(meta);

	return (
		<FormControlChakra isInvalid={isInvalid} isRequired width='100%'>
			<FormLabel htmlFor={id} margin='0'>
				{label}
			</FormLabel>
			{React.cloneElement(children, { isInvalid })}
			{isInvalid && <FormErrorMessage marginTop='0.125rem'>{meta.error}</FormErrorMessage>}
		</FormControlChakra>
	);
};

export default FormControl;
