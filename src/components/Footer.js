import React from 'react';
import { FaDiscord, FaGithubSquare, FaFacebookSquare } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import {Flex, Link, Text, Stack, Icon} from '@chakra-ui/react'

const Footer = () => {
	return (
		<Flex align="center" justify="center" wrap="wrap" w="100%" p="4" direction="column" >
			<Stack direction="row" >
				<Link href="https://discord.gg/Gsxej6u" isExternal>
					<Icon as={FaDiscord} w={8} h={8}/>
				</Link>
				<Link href="https://github.com/ufosc/" isExternal>
					<Icon as={FaGithubSquare} w={8} h={8}/>
				</Link>
				<Link href="https://www.facebook.com/groups/ufosc/" isExternal>
					<Icon as={FaFacebookSquare} w={8} h={8}/>
				</Link>
				<Link href="mailto:gator.osc@gmail.com" isExternal>
					<Icon as={MdEmail} w={8} h={8}/>
				</Link>
			</Stack>

			<Text p="4">
				<i className="fas fa-code"/>
				with
				<i className="fas fa-heart"/>
				by <strong>OSC</strong>
			</Text>

		</Flex>
	)
}

export default Footer;
