import { extendTheme } from '@chakra-ui/react';

import Input from '@components/Input/styles';
import { THEME_COLOURS } from './constants';

const mainTheme = extendTheme({
	components: {
		Input,
		Textarea: Input,
	},
	colors: THEME_COLOURS,
});

export default mainTheme;
