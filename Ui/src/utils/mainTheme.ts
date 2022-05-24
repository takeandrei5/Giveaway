import { extendTheme } from '@chakra-ui/react';

import ButtonPrimary from '@components/Buttons/ButtonPrimary/styles';
import Input from '@components/Input/styles';
import { THEME_COLOURS } from './constants';

const mainTheme = extendTheme({
	components: {
		ButtonPrimary,
		Input,
		Textarea: Input,
	},
	colors: THEME_COLOURS,
});

export default mainTheme;
