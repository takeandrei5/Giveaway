import { extendTheme } from '@chakra-ui/react';

import ButtonPrimary from '../components/shared/Buttons/ButtonPrimary/styles';
import Input from '../components/shared/Input/styles';

const mainTheme = extendTheme({
	components: {
		ButtonPrimary,
		Input,
		Textarea: Input,
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
		darkish: '#262d3b',
		grayish: '#2D3748',
		lightish: '#DDE3EB',
		light: '#FCF7FF',
	},
});

export default mainTheme;
