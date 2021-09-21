import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.scss';
import { Flex, Box } from '@chakra-ui/layout';
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
				<h1 className="title" id="get-involved-title">
					Get Involved
				</h1>
				<p className="get-involved-text">
					OSC is the Open Source Club at the University of Florida. We are a
					community of makers, who want to solve problems and improve our world
					using open source projects.
					<br />
					<br />
					Our{' '}
					<a href="https://github.com/ufosc/getting-started">
						getting started guide
					</a>{' '}
					should help you learn about the club and how we operate. Sign up for
					our{' '}
					<a href="https://www.facebook.com/groups/ufosc/">Facebook group</a>{' '}
					for meeting announcements and join our
					<a href="https://discord.gg/Gsxej6u">Discord</a> to communicate with
					other members and ask questions. And of course, come to our meetings!
					Introduce yourself, work on projects, and have fun.
					<br />
					<br />
					You can find our more about us and our history in the{' '}
					<Link to="/about">about page</Link>.
				</p>
			</Box>
		</Flex>
	);
};

export default Home;
