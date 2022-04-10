import { extendTheme } from '@chakra-ui/react';

import { default as ButtonPrimary } from '../components/shared/Buttons/ButtonPrimary/styles';
import { default as ButtonSecondary } from '../components/shared/Buttons/ButtonSecondary/styles';
import { default as Input } from '../components/shared/Input/styles';
import { default as SearchBox } from '../components/standalone/SearchBox/styles';

const mainTheme = extendTheme({
	components: {
		ButtonPrimary,
		ButtonSecondary,
		Input,
		SearchBox,
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
		dark: '#1D1927',
		gray: '#DDE3EB',
		grayish: '#2D3748',
		darkish: '#262d3b',
		light: '#FCF7FF',
	},
});

export default mainTheme;
