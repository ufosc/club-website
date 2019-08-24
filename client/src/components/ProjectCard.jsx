import React from 'react';

function ProjectCard(props) {
	return (
		<div className="project-element page-element">
			<div className="cardHeader">
				<h1 className="projectTitle">{props.title}</h1>
				<h4 className="projectSubtitle">{props.subtitle}</h4>
			</div>
			<div className="projectDescription">{props.description}</div>
			<div className="cardFooter">
				<p className="project-github-link">
					<i className="fab fa-github"></i>
					<a href={props.link}>{props.link}</a>
				</p>
			</div>
		</div>
	);
}

export default ProjectCard;
