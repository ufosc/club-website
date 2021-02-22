import React from 'react';
import {Link as ReactLink} from 'react-router-dom';
import ColorModeSwitcher from './ColorModeSwitcher'
import {Flex, HStack, Link, Image, Spacer} from '@chakra-ui/react'
import {ExternalLinkIcon} from "@chakra-ui/icons";

const Header = (props) => {

	return (
		<Flex>
			<Link as={ReactLink} to="/" p="2">
				<Image boxSize="10vh" src="/images/small-logo.png" alt="Open Source Club Logo"/>
			</Link>

			<Spacer/>
			<HStack spacing="2vw" mr="2vw">
				<Link as={ReactLink} className="topnav-link" to='/projects'>Projects</Link>
				<Link href="https://www.facebook.com/groups/ufosc/events/?source=4&action_history=null&filter=calendar" isExternal>
					Events <ExternalLinkIcon boxSize={3} />
				</Link>
				<Link  href="https://github.com/ufosc/club-resources" isExternal>
					Resources <ExternalLinkIcon boxSize={3} />
				</Link>
				<Link as={ReactLink} className="topnav-link" to="/about">About</Link>
				<Link as={ReactLink} className="topnav-link" to="/login">Login</Link>
				<Link as={ReactLink} className="topnav-link" to="/signup">Signup</Link>
				<ColorModeSwitcher justifySelf="flex-end" />
			</HStack>
		</Flex>
	)
};

export default Header;
