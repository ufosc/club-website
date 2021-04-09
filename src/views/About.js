import React from 'react';
import {Flex, HStack, Link, OrderedList, ListItem, Heading, Text} from '@chakra-ui/react'

const About = () => {
	return (
		<HStack spacing="6" marginLeft="3" marginRight="3">
			<Flex height="90vh" width="33%" direction="column" alignItems="center" textAlign="center" border="2px solid black" borderRadius="25px" shadow="-5px 5px 5px gray" paddingLeft="5" paddingRight="5">
				<Heading as="h1" size="lg" paddingBottom="6" paddingTop="3">About OSC</Heading>
				<Text>
					OSC is the Open Source Club at the University of Florida. We are a community of makers, who want to
					solve problems and improve our world using open source projects.
					<br/> <br/>
					The OSC is first and foremost, about working on open source projects. Student choose what they want
					to work on, whether it be a totally new idea, or an existing project. Our meetings create a
					constructive atmosphere to help
					students collaborate in teams to grow their knowledge and skills!
					<br/> <br/>
					We also preform technical talks on various open source topics. Anything from Linux to Typescript.
					Students are
					encouraged to submit ideas or even volunteer to give a talk.
					<br/> <br/>
					Collaborating with other clubs is another one of our goals. We love to work with others on
					presentations,
					events,
					or projects! If you are interested in working together email {" "}<Link
					href="mailto:gator.osc@gmail.com" color="teal.500">gator.osc@gmail.com</Link>.
					<br/> <br/>
					To learn how to get involved, check out the <Link href="https://github.com/ufosc/getting-started" color="teal.500" isExternal>getting
					started
					guide</Link>.
				</Text>
			</Flex>

			<Flex height="90vh" width="33%" direction="column" alignItems="center" textAlign="center" border="2px solid black" borderRadius="25px" shadow="-5px 5px 5px gray" paddingLeft="5" paddingRight="5">
				<Heading as="h1" size="lg" paddingBottom="6" paddingTop="3">Meetings</Heading>
				<Text>
					We have a couple types of meetings. Check our <Link
					href="https://www.facebook.com/groups/ufosc/" color="teal.500" isExternal>Facebook</Link> for
					times and locations.
					<OrderedList>
						<ListItem>Casual Coding Sessions are laid back meetings. You can work on projects, homework, or just
							hang out! They
							happen twice weekly. It's a great time to find people with similar interest and create
							something cool.
						</ListItem>
						<ListItem>General Body Meetings (GBMs) open up with a brief round of project updates. Following that,
							there is a
							tech
							talk on an open source technology. This is great for anyone to come in and learn. They
							happen every other
							week.
						</ListItem>
						<ListItem>Code Jams are a once a month workshop and hack sessions. Spend the morning of Saturday
							learning about an
							open
							source technology then in the afternoon work on existing open source projects or start you
							own!
						</ListItem>
					</OrderedList>
				</Text>
			</Flex>

			<Flex height="90vh" width="33%" direction="column" alignItems="center" textAlign="center" border="2px solid black" borderRadius="25px" shadow="-5px 5px 5px gray" paddingLeft="5" paddingRight="5">
				<Heading as="h1" size="lg" paddingBottom="6" paddingTop="3">History</Heading>
				<Heading as="h2" size="md" paddingBottom="3">Getting Started</Heading>
				<Text>
					After noticing a lack of general project focused clubs on campus, Matthew Booe (President) brought
					together Nick
					Cioli (Vice President) and Nick Barnes (Treasure) and their enthusiasm for open source to create the
					club at the
					start of Spring 2016. They found Professor Ira Hill to become their faculty adviser. It gathered
					enough sign-ups to become an official student government organization.
					<br/><br/>
					During the first year of operation, there were about five active members. The focus was primarily on
					teaching
					Git/Web Design and working on the club website and other basic projects. In the middle of Fall 2016,
					the OSC became a Special Interest Group of the UF ACM chapter. The goal of this was to improve
					relations with the computer science community and find a source of funding.
				</Text>
				<Heading as="h2" size="md" paddingBottom="3" paddingTop="2">Growing Up</Heading>
				<Text>
					There were two problems that became apparent over the previous year:
					<br/><br/>
					1. There wasn't a lot of time to work on
					projects 2. Administrative duties make it really hard to work on other things.
					<br/><br/>
					As a result, in the Spring of 2017 Casual Coding Sessions were introduced as two regular weekly
					meetings and more officer positions were added. This brought on Anthony Rossello (Secretary), Greg
					Fussell (External Relations
					Chair), Will Owens (Social Chair), and Vaibhav Yenamandra (Project Lead).
					<br/><br/>
					This helped grow the active members to be above ten people and work on the course planner. The end
					of Spring elections resulted in news officers Joe Komskis (External Relations Chair) and Josh Hew
					(Secretary). A representative from Mozilla also reached out to learn more about the club.
					<br/><br/>
					Over the Summer of 2017 Matthew and Josh worked with Mozilla and eighteen other students to help put
					together
					the Mozilla Open Source Student Network.
				</Text>
				<Heading as="h2" size="md" paddingBottom="3" paddingTop="2">Staying Strong</Heading>
				<Text>
					Through Fall of 2018 the Open Source Club has kept a simmilar format, while experimenting with a new
					type of
					meetings called Code Jams. The goal was to provide a longer workshop where students could come to
					learn about a
					topic before jumping into projects that deal with that.

					Total club membership was around fifteen active members, with another ten or so coming around
					occasionally.
					<br/><br/>
					New projects included Marston vs West, Gator Questions, a revamped club website and backend, and
					Discord bots.
					<br/><br/>
					To be continued...
				</Text>
			</Flex>
		</HStack>
	)


}

export default About;
