import React from 'react';
import HomeCard from './HomeCard';
import "../../styles/index.scss";

const HomeGrid = () => {

	let smallCards = CARDS.slice(0,3);

	return (
		<div className="cardList">
			{smallCards.map((card, i) => (
				<div key={CARDS[i].id}>
					{console.log(CARDS[i])}
					<HomeCard
						title={CARDS[i].title}
						icon={CARDS[i].icon}
						description={CARDS[i].description}
				/>
				</div>
			))}
		</div>
	)
};

export default HomeGrid;

const CARDS = [
	{
		id: 1,
		title: 'Promote',
		icon: 'fa-bullhorn',
		description: "Spread information about the free and open source movement as well as FLOSS projects"
	},
	{
		id: 2,
		title: 'Support',
		icon: 'fa-heart',
		description: "Work on existing open source projects and collaborate with other clubs on and off campus"
	},
	{
		id: 3,
		title: 'Create',
		icon: 'fa-lightbulb',
		description: "Build useful and fun projects with other club members to solve problems and learn"
	},

];

