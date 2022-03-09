import { extendTheme } from '@chakra-ui/react';

import { default as ButtonPrimary } from '../components/shared/Buttons/ButtonPrimary/styles';
import { default as ButtonSecondary } from '../components/shared/Buttons/ButtonSecondary/styles';

const mainTheme = extendTheme({
	components: {
		ButtonPrimary,
		ButtonSecondary,
	},
	colors: {
		primary: {
			main: '#7B61FF',
			light: '#F7EBFF',
			dark: '#B8A8DE',
		},
		secondary: {
			main: '#302CC0',
			light: '#008CFF',
			dark: '#000083',
		},
		black: '#000000',
		white: '#FFFFFF',

		dark: '#1D1927',
		grey: '#AEA8BA',
		light: '#FCF7FF',
	},
});

export default mainTheme;
