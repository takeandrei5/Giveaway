import { useCheckFormIsInvalid } from '@components/FormControl/hooks';
import { renderHook } from '@testing-library/react-hooks';
import { FieldMetaProps } from 'formik';

describe('useCheckFormIsInvalid', () => {
	it('should set isInvalid state correctly', async () => {
		// Arrange
		const meta: FieldMetaProps<unknown> = {
			value: 'test-name',
			error: 'error',
			touched: true,
			initialValue: 'test-name',
			initialTouched: false,
			initialError: '',
		};

		// Act
		const { result } = renderHook(() => useCheckFormIsInvalid(meta));

		// Assert
		expect(result.current.isInvalid).toBe(true);
	});
});
