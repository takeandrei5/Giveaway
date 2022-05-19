import { extendTheme } from '@chakra-ui/react';

import ButtonPrimary from '../components/shared/Buttons/ButtonPrimary/styles';
import Input from '../components/shared/Input/styles';
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
