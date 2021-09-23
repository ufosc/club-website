import React from 'react';
import ProjectCard from '../components/ProjectCard';
import '../styles/projects.css';

const Projects = () => {
	return (
		<div className="wrapper">
			{projectData.map((title, i) => {
				return (
					<ProjectCard
						title={projectData[i].title}
						subtitle={projectData[i].subtitle}
						description={projectData[i].description}
						link={projectData[i].link}
					/>
				);
			})}
		</div>
	);
};

// Project data to remove once backend is stable
const projectData = [
	{
		title: 'Club Website',
		subtitle: "The thing you're on right now",
		description: `The website is built from scratch,
		using the React framework, to be a one-stop-shop
		for information about the Open Source Club. It's provides
		information about what the club is, the projects we work on,
		and upcoming events.`,
		link: 'https://github.com/ufosc/club-website',
	},
	{
		title: 'DocuMiner',
		subtitle: 'A production-ready pipeline for numerous NLP tasks',
		description: `A suite of text processing tools based on machine
		learning and statistical inference that accepts a variety of file
		extensions and even online sources. The production-ready deliverable
		is currently intended to be a web application with or without a CLI
		counterpart.`,
		link: 'https://github.com/ufosc/DocuMiner',
	},
	{
		title: 'GatorWiki',
		subtitle: 'Web app for accessing and modifying club data',
		description: ``,
		link: 'https://github.com/ufosc/GatorWiki',
	},
];

export default Projects;
