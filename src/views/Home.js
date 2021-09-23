import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import '../styles/index.scss';
import { Flex, Box, Heading, Text } from '@chakra-ui/react';
import { Link, Spacer } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import Slideshow from '../components/Slideshow';
import HomeGrid from '../components/HomeGrid/HomeGrid';

const Home = () => {
	return (
		<Flex
			justifyContent="space-between"
			flexDirection="column"
			margin="20px auto 0"
			width="97%"
			maxWidth="1000px"
		>
			<Box
				padding="0px"
				border="0.75rem"
				boxShadow="0px 5px 4px 1px hsla(0, 0%, 0%, 0.2)"
				padding="0px"
				margin="10px"
				textAlign="center"
				justifyContent="flex-start"
			>
				<Slideshow />
			</Box>
			<br />

			{/* Tag line boxes  */}
			<HomeGrid className="cardGrid" />
			<br />

			{/* Get involved box  */}
			<Box
				padding="0px"
				border="0.75rem"
				boxShadow="0px 5px 4px 1px hsla(0, 0%, 0%, 0.2)"
				padding="10px"
				margin="10px"
				textAlign="center"
				justifyContent="flex-start"
			>
				<Heading as="h1" size="sm" marginBottom="20px">
					Get Involved
				</Heading>
				<Text top="20px" margin-bottom="0">
					OSC is the Open Source Club at the University of Florida. We are a
					community of makers, who want to solve problems and improve our world
					using open source projects.
					<br />
					<br />
					Our{' '}
					{/* <Link  href="https://github.com/ufosc/club-resources" isExternal>
					Resources <ExternalLinkIcon boxSize={3} />
				</Link>
				<Link as={ReactLink} className="topnav-link" to="/about">About</Link> */}
					<Link href="https://github.com/ufosc/getting-started" isExternal>
						getting started guide <ExternalLinkIcon boxSize={4} />
					</Link>{' '}
					should help you learn about the club and how we operate. Sign up for
					our{' '}
					<Link href="https://www.facebook.com/groups/ufosc/" isExternal>
						Facebook group <ExternalLinkIcon boxSize={4} />
					</Link>{' '}
					for meeting announcements and join our
					<Link href="https://discord.gg/Gsxej6u" isExternal>
						Discord <ExternalLinkIcon boxSize={4} />
					</Link>{' '}
					to communicate with other members and ask questions. And of course,
					come to our meetings! Introduce yourself, work on projects, and have
					fun.
					<br />
					<br />
					You can find our more about us and our history in the{' '}
					<Link to="/about">about page</Link>.
				</Text>
			</Box>
		</Flex>
	);
};

export default Home;
