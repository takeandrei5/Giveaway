import { FormControl, Input } from '@components';
import { useField } from 'formik';

import { DescriptionFormControlProps } from './types';

const DescriptionFormControl = ({ name }: DescriptionFormControlProps) => {
	const [field] = useField<string>(name);

	return (
		<FormControl label='Description:' id='description-input' name={name}>
			<Input
				id='description-input'
				multiline
				height='10rem'
				name={name}
				placeholder='Be as detailed as you wish others were!'
				onBlur={field.onBlur}
				onChange={field.onChange}
				value={field.value}
			/>
		</FormControl>
	);
};

export default DescriptionFormControl;
