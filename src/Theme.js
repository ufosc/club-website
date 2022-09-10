import { extendTheme } from '@chakra-ui/react';

const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

const Theme = extendTheme({ config });

export default Theme;
