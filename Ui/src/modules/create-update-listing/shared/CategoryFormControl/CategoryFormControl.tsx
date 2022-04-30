import { Dropdown, FormControl } from 'components';
import { DropdownOption } from 'components/shared/Dropdown/types';
import { useField } from 'formik';
import { useMemo } from 'react';
import { CategoryTypeEnum } from 'utils/enums';

import { CategoryFormControlProps } from './types';

const CategoryFormControl = ({ name }: CategoryFormControlProps) => {
	const [field, _, helpers] = useField<number>(name);

	const categories: DropdownOption[] = useMemo(
		(): DropdownOption[] =>
			Object.keys(CategoryTypeEnum).map((value, index): DropdownOption => {
				return {
					value: index + 1,
					displayValue: value,
				};
			}),
		[]
	);

	return (
		<FormControl label='Category:' id='category-dropdown' name={name}>
			<Dropdown
				id='category-dropdown'
				name={name}
				options={categories}
				onChangeHandler={(value: string) => {
					helpers.setValue(+value);
					helpers.setTouched(true);
				}}
				value={field.value}
			/>
		</FormControl>
	);
};

export default CategoryFormControl;
