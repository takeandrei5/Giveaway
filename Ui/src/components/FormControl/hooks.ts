import { FieldMetaProps } from 'formik';
import { useEffect, useState } from 'react';

import { useCheckFormIsInvalidProps } from './types';

const useCheckFormIsInvalid = (meta: FieldMetaProps<unknown>): useCheckFormIsInvalidProps => {
	const [isInvalid, setIsInvalid] = useState(false);

	useEffect(() => {
		setIsInvalid(meta.touched && !!meta.error);
	}, [meta.touched, meta.error]);

	return { isInvalid };
};

export { useCheckFormIsInvalid };
