import { Input } from '@components';
import { InputProps } from '@components/shared/Input/types';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Input', () => {
	it('should match snapshot', () => {
		// Arrange
		const props: InputProps = {
			id: 'input-id',
			name: 'input-name',
			placeholder: 'input-placeholder',
			value: 'input-value',
			onChange: (e?: React.ChangeEvent<unknown>) => {},
		};

		// Act
		const component = render(<Input {...props} />);

		// Assert
		expect(component).toMatchSnapshot();
	});

	describe('multiline prop', () => {
		it('should render an input if multiline prop is false', () => {
			// Arrange
			const props: InputProps = {
				id: 'input-id',
				name: 'input-name',
				placeholder: 'input-placeholder',
				value: 'input-value',
				onChange: (e?: React.ChangeEvent<unknown>) => {},
				multiline: false,
			};

			// Act
			const { queryByTestId } = render(<Input {...props} />);

			// Assert
			expect(queryByTestId('input')).toBeTruthy();
			expect(queryByTestId('textarea')).toBeFalsy();
		});

		it('should render a textarea if multiline prop is true', () => {
			// Arrange
			const props: InputProps = {
				id: 'input-id',
				name: 'input-name',
				placeholder: 'input-placeholder',
				value: 'input-value',
				onChange: (e?: React.ChangeEvent<unknown>) => {},
				multiline: true,
			};

			// Act
			const { queryByTestId } = render(<Input {...props} />);

			// Assert
			expect(queryByTestId('input')).toBeFalsy();
			expect(queryByTestId('textarea')).toBeTruthy();
		});
	});

	describe('label prop', () => {
		it('should render a label if label prop is empty', () => {
			// Arrange
			const props: InputProps = {
				id: 'input-id',
				name: 'input-name',
				placeholder: 'input-placeholder',
				value: 'input-value',
				onChange: (e?: React.ChangeEvent<unknown>) => {},
				multiline: false,
				label: '',
			};

			// Act
			const { queryByTestId } = render(<Input {...props} />);

			// Assert
			expect(queryByTestId('label')).toBeFalsy();
		});

		it('should render a label if label prop is undefined', () => {
			// Arrange
			const props: InputProps = {
				id: 'input-id',
				name: 'input-name',
				placeholder: 'input-placeholder',
				value: 'input-value',
				onChange: (e?: React.ChangeEvent<unknown>) => {},
				multiline: false,
				label: undefined,
			};

			// Act
			const { queryByTestId } = render(<Input {...props} />);

			// Assert
			expect(queryByTestId('label')).toBeFalsy();
		});

		it('should render a label if label prop is not empty or undefined', () => {
			// Arrange
			const props: InputProps = {
				id: 'input-id',
				name: 'input-name',
				placeholder: 'input-placeholder',
				value: 'input-value',
				onChange: (e?: React.ChangeEvent<unknown>) => {},
				multiline: false,
				label: 'test-label',
			};

			// Act
			const { queryByTestId } = render(<Input {...props} />);

			// Assert
			expect(queryByTestId('label')).toBeTruthy();
		});

		it('should render the label correctly if label is not empty or undefined', () => {
			// Arrange
			const props: InputProps = {
				id: 'input-id',
				name: 'input-name',
				placeholder: 'input-placeholder',
				value: 'input-value',
				onChange: (e?: React.ChangeEvent<unknown>) => {},
				multiline: false,
				label: 'test-label',
			};

			// Act
			const { getByTestId } = render(<Input {...props} />);

			// Assert
			expect(getByTestId('label').textContent).toBe(props.label!);
		});
	});

	describe('leftIcon prop', () => {
		it('should not render a left icon if leftIcon prop is undefined', () => {
			// Arrange
			const props: InputProps = {
				id: 'input-id',
				name: 'input-name',
				placeholder: 'input-placeholder',
				value: 'input-value',
				onChange: (e?: React.ChangeEvent<unknown>) => {},
				multiline: false,
				leftIcon: undefined,
			};

			// Act
			const { queryByTestId } = render(<Input {...props} />);

			// Assert
			expect(queryByTestId('left-icon')).toBeFalsy();
		});

		it('should render a left icon if leftIcon prop is not undefined', () => {
			// Arrange
			const props: InputProps = {
				id: 'input-id',
				name: 'input-name',
				placeholder: 'input-placeholder',
				value: 'input-value',
				onChange: (e?: React.ChangeEvent<unknown>) => {},
				multiline: false,
				leftIcon: <></>,
			};

			// Act
			const { queryByTestId } = render(<Input {...props} />);

			// Assert
			expect(queryByTestId('left-icon')).toBeTruthy();
		});
	});

	describe('rightIcon prop', () => {
		it('should not render a right icon if leftIcon prop is undefined', () => {
			// Arrange
			const props: InputProps = {
				id: 'input-id',
				name: 'input-name',
				placeholder: 'input-placeholder',
				value: 'input-value',
				onChange: (e?: React.ChangeEvent<unknown>) => {},
				multiline: false,
				rightIcon: undefined,
			};

			// Act
			const { queryByTestId } = render(<Input {...props} />);

			// Assert
			expect(queryByTestId('right-icon')).toBeFalsy();
		});

		it('should render a right icon if rightIcon prop is not undefined', () => {
			// Arrange
			const props: InputProps = {
				id: 'input-id',
				name: 'input-name',
				placeholder: 'input-placeholder',
				value: 'input-value',
				onChange: (e?: React.ChangeEvent<unknown>) => {},
				multiline: false,
				rightIcon: <></>,
			};

			// Act
			const { queryByTestId } = render(<Input {...props} />);

			// Assert
			expect(queryByTestId('right-icon')).toBeTruthy();
		});
	});

	describe('onChangeHandler prop', () => {
		it('should trigger onChangeHandler prop correctly when user types in input', async () => {
			const text: string = 'This is a test';

			const props: InputProps = {
				id: 'input-id',
				name: 'input-name',
				placeholder: 'input-placeholder',
				value: 'input-value',
				onChange: jest.fn((e?: React.ChangeEvent<unknown>) => {}),
			};

			// Act
			const component = render(<Input {...props} />);
			await userEvent.type(component.getByTestId('input'), text);

			// Assert
			expect(props.onChange).toBeCalledTimes(text.length);
		});

		it('should trigger onChangeHandler correctly when user types in textarea', async () => {
			const text: string = 'This is a test';

			const props: InputProps = {
				id: 'input-id',
				name: 'input-name',
				placeholder: 'input-placeholder',
				value: 'input-value',
				onChange: jest.fn((e?: React.ChangeEvent<unknown>) => {}),
			};

			// Act
			const component = render(<Input {...props} />);
			await userEvent.type(component.getByTestId('input'), text);

			// Assert
			expect(props.onChange).toBeCalledTimes(text.length);
		});
	});
});
