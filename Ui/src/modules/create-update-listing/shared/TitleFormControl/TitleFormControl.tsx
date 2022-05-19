import { useField } from 'formik';

import { FormControl, Input } from '@components';
import { TitleFormControlProps } from './types';

const TitleFormControl = ({ name }: TitleFormControlProps): JSX.Element => {
	const [field] = useField<string>(name);

	return (
		<FormControl label='Title:' id='title-input' name={name}>
			<Input
				id='title-input'
				height='2.5rem'
				width='22.5rem'
				name={name}
				placeholder='Ex. Books for children'
				onBlur={field.onBlur}
				onChange={field.onChange}
				value={field.value}
			/>
		</FormControl>
	);
};

export default TitleFormControl;
