import { updateListing } from '@api/listings';
import { UpdateListingRequest } from '@api/listings/types';
import { useCreateListing } from '@modules/create-update-listing/create-listing/hooks';
import { FormContainer } from '@modules/create-update-listing/shared';
import { fireEvent, render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { axiosCdnInstance } from '@utils/axios';
import { QueryClientWrapper } from '__tests__/wrappers';
import MockAdapter from 'axios-mock-adapter';
import { useRouter } from 'next/router';
import { useUpdateListing } from '@modules/create-update-listing/update-listing/hooks';
import { UpdateListingInitialValues } from '@pages/update-listing/[id]/types';
import { NotFoundError } from '@utils/errors';

jest.mock('next/router', () => ({
	...jest.requireActual('next/router'),
	useRouter: jest.fn(),
}));

jest.mock('@api/listings', () => ({
	...jest.requireActual('@api/listings'),
	updateListing: jest.fn(),
}));

jest.mock('next/config', () => () => ({
	publicRuntimeConfig: {
		apiUrl: 'http://localhost/',
	},
	serverRuntimeConfig: {
		apiUrl: 'http://localhost/',
	},
}));

jest.mock('uuid', () => ({
	__esModule: true,
	v4: jest.fn().mockReturnValue('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'),
}));

describe('useUpdateListing', () => {
	const accessToken: string = Math.random().toString(32);
	const id: string = 'test-id';
	const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });
	const axiosCdnInstanceMock: MockAdapter = new MockAdapter(axiosCdnInstance);

	const initialValues: UpdateListingInitialValues = {
		title: 'initial-title',
		category: 1,
		description: 'initial-description',
		images: [],
	};

	let route = '';

	beforeAll(() => {
		(useRouter as unknown as jest.Mock).mockImplementation(() => ({
			route,
			replace: jest.fn((url: string) => (route = url)),
		}));
	});

	beforeEach(() => {
		route = '';
		axiosCdnInstanceMock.reset();
	});

	describe('useFormik', () => {
		it('should redirect to `/listings` when the formik on submit is successful', async () => {
			// Arrange
			(updateListing as unknown as jest.Mock).mockImplementation(
				(id: string, accessToken: string, data: UpdateListingRequest) => Promise.resolve()
			);

			axiosCdnInstanceMock.onPost().reply(200, {
				result: {
					variants: ['test-variant-url/public'],
				},
			});

			// Act
			const { result, waitForNextUpdate } = renderHook(() => useUpdateListing(id, accessToken, initialValues), {
				wrapper: QueryClientWrapper,
			});

			const { container, getByTestId, getByRole } = render(
				<FormContainer
					formik={result.current.formik}
					pageTitle='page-title'
					submitButtonText='submit'
					resetButtonText='reset'
				/>,
				{ wrapper: QueryClientWrapper }
			);

			fireEvent.change(container.querySelector('#title-input')!, { target: { value: 'Test Title' } });
			fireEvent.change(getByTestId('dropdown'), { target: { value: 1 } });
			fireEvent.change(container.querySelector('#file-input')!, { target: { files: [fakeFile] } });
			fireEvent.change(container.querySelector('#description-input')!, { target: { value: 'Test Description' } });

			await userEvent.click(getByRole('button', { name: /submit/i }));

			await waitForNextUpdate();

			// Assert
			expect(route).toBe('/listings');
		});

		it('should redirect to `/500` when the formik on submit is not successful', async () => {
			// Arrange
			(updateListing as unknown as jest.Mock).mockImplementation(
				(id: string, accessToken: string, data: UpdateListingRequest) => Promise.reject()
			);

			axiosCdnInstanceMock.onPost().reply(200, {
				result: {
					variants: ['test-variant-url/public'],
				},
			});

			// Act
			const { result, waitForNextUpdate } = renderHook(() => useUpdateListing(id, accessToken, initialValues), {
				wrapper: QueryClientWrapper,
			});

			const { container, getByTestId, getByRole } = render(
				<FormContainer
					formik={result.current.formik}
					pageTitle='page-title'
					submitButtonText='submit'
					resetButtonText='reset'
				/>,
				{ wrapper: QueryClientWrapper }
			);

			fireEvent.change(container.querySelector('#title-input')!, { target: { value: 'Test Title' } });
			fireEvent.change(getByTestId('dropdown'), { target: { value: 1 } });
			fireEvent.change(container.querySelector('#file-input')!, { target: { files: [fakeFile] } });
			fireEvent.change(container.querySelector('#description-input')!, { target: { value: 'Test Description' } });

			await userEvent.click(getByRole('button', { name: /submit/i }));

			await waitForNextUpdate();

			// Assert
			expect(route).toBe('/500');
		});

		it('should redirect to `/404` when the formik on submit is not successful and the error is NotFoundError', async () => {
			// Arrange
			(updateListing as unknown as jest.Mock).mockImplementation(
				(id: string, accessToken: string, data: UpdateListingRequest) => {
					throw new NotFoundError();
				}
			);

			axiosCdnInstanceMock.onPost().reply(200, {
				result: {
					variants: ['test-variant-url/public'],
				},
			});

			// Act
			const { result, waitForNextUpdate } = renderHook(() => useUpdateListing(id, accessToken, initialValues), {
				wrapper: QueryClientWrapper,
			});

			const { container, getByTestId, getByRole } = render(
				<FormContainer
					formik={result.current.formik}
					pageTitle='page-title'
					submitButtonText='submit'
					resetButtonText='reset'
				/>,
				{ wrapper: QueryClientWrapper }
			);

			fireEvent.change(container.querySelector('#title-input')!, { target: { value: 'Test Title' } });
			fireEvent.change(getByTestId('dropdown'), { target: { value: 1 } });
			fireEvent.change(container.querySelector('#file-input')!, { target: { files: [fakeFile] } });
			fireEvent.change(container.querySelector('#description-input')!, { target: { value: 'Test Description' } });

			await userEvent.click(getByRole('button', { name: /submit/i }));

			await waitForNextUpdate();

			// Assert
			expect(route).toBe('/404');
		});
	});
});
