import { FormControl as FormControlChakra, FormErrorMessage, FormLabel, useColorModeValue } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

import { useCheckFormIsInvalid } from './hooks';
import { FormControlProps } from './types';

const FormControl = ({ children, id, label, name }: FormControlProps): JSX.Element => {
	const [_, meta] = useField<unknown>(name);
	const { isInvalid } = useCheckFormIsInvalid(meta);

	const darkOrLightColor: 'dark' | 'light' = useColorModeValue('dark', 'light');

	return (
		<FormControlChakra isInvalid={isInvalid} isRequired width='100%'>
			<FormLabel htmlFor={id} margin='0' color={darkOrLightColor}>
				{label}
			</FormLabel>
			{React.cloneElement(children, { isInvalid })}
			{isInvalid && (
				<FormErrorMessage data-testid='form-control-error-message' marginTop='0.125rem' color='danger'>
					{meta.error}
				</FormErrorMessage>
			)}
		</FormControlChakra>
	);
};

export default FormControl;
