import React from 'react';
import '../../styles/index.scss';
import { Icon, VStack, Text, Heading, Box } from '@chakra-ui/react';

const HomeCard = ({ title, icon, description }) => {
	return (
		<VStack
			border="0.75rem"
			boxShadow="0px 5px 4px 1px hsla(0, 0%, 0%, 0.2)"
			padding="10px"
			margin="10px"
			textAlign="center"
			justifyContent="flex-start"
		>
			<Heading as="h1" size="sm" position="relative">
				{title}
			</Heading>
			<Box position="relative" top="25px">
				<i className={'fas ' + icon + ' tagline-icon'} top="-40px" />
			</Box>
			<Text position="relative">{description}</Text>
		</VStack>
	);
};

export default HomeCard;
