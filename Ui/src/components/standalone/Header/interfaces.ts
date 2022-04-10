import { ColorMode } from '@chakra-ui/react';

export interface HeaderI {
	colorMode: ColorMode;
	toggleColorMode: () => void;
}
