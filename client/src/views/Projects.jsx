import React from 'react';
import ProjectCard from '../components/ProjectCard';
import "../styles/projects.css"

//TODO: Fix Spacing Error on cards
//TODO: Insert proper bar on cards
//TODO: Possibly use XML to clean up this file

class Projects extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<div>
					<ProjectCard 
					title={clubWeb.title}
					subtitle={clubWeb.subtitle}
					description={clubWeb.description}
					link={clubWeb.link} />
				</div>
				<div>
				<ProjectCard 
					title={marstonVsWest.title}
					subtitle={marstonVsWest.subtitle}
					description={marstonVsWest.description}
					link={marstonVsWest.link} />
				</div>
				<div>
				<ProjectCard 
					title={gatorQs.title}
					subtitle={gatorQs.subtitle}
					description={gatorQs.description}
					link={gatorQs.link} />
				</div>
				<div>
				<ProjectCard 
					title={muddySwamp.title}
					subtitle={muddySwamp.subtitle}
					description={muddySwamp.description}
					link={muddySwamp.link} />
				</div>
				<div>
				<ProjectCard 
					title={aLBot.title}
					subtitle={aLBot.subtitle}
					description={aLBot.description}
					link={aLBot.link} />
				</div>
				<div>
				<ProjectCard 
					title={clubBack.title}
					subtitle={clubBack.subtitle}
					description={clubBack.description}
					link={clubBack.link} />
				</div>
				<div>
				<ProjectCard 
					title={clubAdmin.title}
					subtitle={clubAdmin.subtitle}
					description={clubAdmin.description}
					link={clubAdmin.link} />
				</div>
			</div>
		)
	}
}

const clubWeb = {
	title: "Club Website",
	subtitle: "The thing you're on right now",
	description: `The website is built from scratch,
	 using basic HTML, CSS, and JavaScript, to be a one-stop-shop 
	 for information about the Open Source Club. It's provides 
	 information about what the club is, the projects we work on, 
	 and upcoming events.`,
	link: "https://github.com/ufosc/club-website",
};
const marstonVsWest = {
	title: "Marston Vs. West",
	subtitle: "A platform fighter utilizing the Phaser JavaScript library",
	description: `A simple street fighter/smash bros esque video game project about the ongoing debate for best library. This
	project is made using JavaScript and the Phaser framework.`,
	link: "https://github.com/ufosc/marston-vs-west",
};
const gatorQs = {
	title: "Gator Questions",
	subtitle: "Open source teacher/professor interaction software",
	description: `Teacher/student interaction software designed to provide an open source alternative to existing solutions like
	TopHat. It is being built with Ruby on Rails.`,
	link: "https://github.com/ufosc/GatorQuestions",
};
const muddySwamp = {
	title: "MuddySwamp",
	subtitle: "A simple UF themed Multi-User Dungeon",
	description: `Multi-user dungeons, or "MUDs" are text-based role-playing games, that naturally evolved from the text-based
	rpg
	and adventure games of the 1970s. This project aims to introduce a new generation—one that never experienced a
	world without broadband internet—to this classic game genre. While this code can be adapted for any setting,
	we
	intend to render our university in beautiful ASCII.`,
	link: "https://github.com/ufosc/MuddySwamp",
};
const aLBot = {
	title: "ALBot and ALBotA",
	subtitle: "Discord bots written in Python",
	description: `A python3 Discord bot used to run the Open Source Club's Discord server. The bot is using the Discord.py
	rewrite.`,
	link: "https://github.com/ufosc/albot-and-albota",
};
const clubBack = {
	title: "Club Backend",
	subtitle: "A RESTful API for club information (events, projects, sign-ins, etc)",
	description: `A RESTful API for club information (events, projects, sign-ins, etc) that is used for the club website, bots,
	and any future projects related to administration. Built using Rust, Rocket, PostgreSQL, and Diesel.`,
	link: "https://github.com/ufosc/club-backend",
};
const clubAdmin = {
	title: "Club Admin Portal",
	subtitle: "Web app for accessing and modifying club data",
	description: `Web app for accessing and modifying club data stored in the club backend. Built using Vue and TypeScript.`,
	link: "https://github.com/ufosc/club-admin-portal",
};
export default Projects;
