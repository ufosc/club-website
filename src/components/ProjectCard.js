import React from 'react';
import '../styles/projects.css';
import { Box, Flex, Heading, Text, Link } from '@chakra-ui/layout';

const ProjectCard = props => {
	return (
		<Flex
			border="0.75rem"
			boxShadow="0px 5px 4px 1px hsla(0, 0%, 0%, 0.2)"
			padding="10px"
			margin="10px"
			textAlign="center"
			justifyContent="flex-start"
			borderRadius="0.5rem"
			flexDirection="column"
			max-width="550px"
		>
			<Box>
				<Heading as="h1" size="md" position="relative">
					{props.title}
				</Heading>
				<Heading
					as="h4"
					size="sm"
					fontWeight="lighter"
					color="rgb(118, 122, 141)"
					borderBottom="1px solid rgb(126, 126, 126)"
					paddingBottom="5px"
				>
					{props.subtitle}
				</Heading>
			</Box>
			<Box>{props.description}</Box>
			<Box fontSize="sm" marginTop="auto">
				<Text>
					<i className="fab fa-github" />
					<Link href={props.link} isExternal>
						{props.link}
					</Link>
				</Text>
			</Box>
		</Flex>
	);
};

export default ProjectCard;
