import React from 'react';
import "../../styles/index.scss";

const HomeCard = ({title, icon, description}) => {
	return(
		<div className="page-element">
			<h1 className="title">
				{title}
			</h1>
			<i className={"fas " + icon + " tagline-icon"}/>
			<p className="text">
				{description}
			</p>
		</div>
	)
}

export default HomeCard;
