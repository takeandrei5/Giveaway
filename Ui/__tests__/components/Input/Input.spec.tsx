import { Input } from '@components';
import { HTMLCustomInputElement, InputProps } from '@components/Input/types';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Input', () => {
	it('should match snapshot', () => {
		// Arrange
		const props: InputProps = {
			id: 'input-id',
			name: 'input-name',
			placeholder: 'input-placeholder',
		};

		// Act
		const { container } = render(<Input {...props} />);

		// Assert
		expect(container).toMatchSnapshot();
	});

	describe('multiline prop', () => {
		it('should render an input if multiline prop is false', () => {
			// Arrange
			const props: InputProps = {
				id: 'input-id',
				name: 'input-name',
				placeholder: 'input-placeholder',
				value: 'input-value',
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
				multiline: false,
				rightIcon: <></>,
			};

			// Act
			const { queryByTestId } = render(<Input {...props} />);

			// Assert
			expect(queryByTestId('right-icon')).toBeTruthy();
		});
	});

	describe('when the user triggers events', () => {
		const text: string = 'This is a test';

		const onBlurMock: jest.Mock<void, [e: React.ChangeEvent<HTMLCustomInputElement>]> = jest.fn(
			(e: React.ChangeEvent<HTMLCustomInputElement>) => {}
		);

		const onChangeMock: jest.Mock<void, [e: React.ChangeEvent<HTMLCustomInputElement>]> = jest.fn(
			(e: React.ChangeEvent<HTMLCustomInputElement>) => {}
		);

		const onKeyDownMock: jest.Mock<void, [e: React.KeyboardEvent<HTMLCustomInputElement>]> = jest.fn(
			(e: React.KeyboardEvent<HTMLCustomInputElement>) => {}
		);

		const onKeyPressMock: jest.Mock<void, [e: React.KeyboardEvent<HTMLCustomInputElement>]> = jest.fn(
			(e: React.KeyboardEvent<HTMLCustomInputElement>) => {}
		);

		const onKeyUpMock: jest.Mock<void, [e: React.KeyboardEvent<HTMLCustomInputElement>]> = jest.fn(
			(e: React.KeyboardEvent<HTMLCustomInputElement>) => {}
		);

		const props: InputProps = {
			id: 'input-id',
			name: 'input-name',
			placeholder: 'input-placeholder',
			value: 'input-value',
			onBlur: onBlurMock,
			onChange: onChangeMock,
			onKeyDown: onKeyDownMock,
			onKeyPress: onKeyPressMock,
			onKeyUp: onKeyUpMock,
		};

		beforeEach(() => {
			onBlurMock.mockClear();
			onChangeMock.mockClear();
			onKeyDownMock.mockClear();
			onKeyPressMock.mockClear();
			onKeyUpMock.mockClear();
		});

		describe('onBlurChanger prop', () => {
			it('should trigger onBlurHandler prop correctly when user types in input', () => {
				// Arrange
				const component = render(<Input {...props} />);

				// Act
				fireEvent.focusIn(component.getByTestId('input'));
				fireEvent.focusOut(component.getByTestId('input'));

				// Assert
				expect(props.onBlur).toBeCalledTimes(1);
			});
		});

		describe('onChangeHandler prop', () => {
			it('should trigger onChangeHandler prop correctly when user types in input', async () => {
				// Arrange
				const component = render(<Input {...props} />);

				// Act
				await userEvent.type(component.getByTestId('input'), text);

				// Assert
				expect(props.onChange).toBeCalledTimes(text.length);
			});
		});

		describe('onKeyDown prop', () => {
			it('should trigger onKeyDownHandler prop correctly when user types in input', async () => {
				// Arrange
				const component = render(<Input {...props} />);

				// Act
				await userEvent.type(component.getByTestId('input'), text);

				// Assert
				expect(props.onChange).toBeCalledTimes(text.length);
			});

			it('should trigger onKeyDownHandler correctly when user types in textarea', async () => {
				// Arrange
				const component = render(<Input {...props} />);

				// Act
				await userEvent.type(component.getByTestId('input'), text);

				// Assert
				expect(props.onKeyDown).toBeCalledTimes(text.length);
			});
		});

		describe('onKeyPressHandler prop', () => {
			it('should trigger onKeyPressHandler prop correctly when user types in input', async () => {
				// Arrange
				const component = render(<Input {...props} />);

				// Act
				await userEvent.type(component.getByTestId('input'), text);

				// Assert
				expect(props.onKeyPress).toBeCalledTimes(text.length);
			});

			it('should trigger onKeyPressHandler correctly when user types in textarea', async () => {
				// Arrange
				const component = render(<Input {...props} />);

				// Act
				await userEvent.type(component.getByTestId('input'), text);

				// Assert
				expect(props.onKeyPress).toBeCalledTimes(text.length);
			});
		});

		describe('onKeyUpHandler prop', () => {
			it('should trigger onKeyUpHandler prop correctly when user types in input', async () => {
				// Arrange
				const component = render(<Input {...props} />);

				// Act
				await userEvent.type(component.getByTestId('input'), text);

				// Assert
				expect(props.onKeyUp).toBeCalledTimes(text.length);
			});

			it('should trigger onKeyUpHandler correctly when user types in textarea', async () => {
				// Arrange
				const component = render(<Input {...props} />);

				// Act
				await userEvent.type(component.getByTestId('input'), text);

				// Assert
				expect(props.onKeyUp).toBeCalledTimes(text.length);
			});
		});
	});
});
