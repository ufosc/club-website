import React from 'react';
import '../styles/projects.css'

function ProjectCard(props) {
	return (
		<div className="project-element page-element">
			<div className="cardHeader">
				<h1 className="project-title title">{props.title}</h1>
				<h4 className="project-subtitle">{props.subtitle}</h4>
			</div>
			<div className="projectDescription">{props.description}</div>
			<div className=".project-footer-text">
				<p className="project-github-link">
					<i className="fab fa-github"></i>
					<a href={props.link}>{props.link}</a>
				</p>
			</div>
		</div>
	);
}

export default ProjectCard;
