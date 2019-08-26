import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/index.css";
import Slideshow from "../components/Slideshow";


class Home extends React.Component {
	render () {
		return (
			<div id="wrapper">
				<Slideshow/>
				<br />

					{/* Tag line boxes  */}
					<div id="promote" className="page-element">
						<h1 className="title">
							Promote
						</h1>
						<i className="fas fa-bullhorn tagline-icon"/>
						<p className="text">
							Spread information about the free and open source movement as well as FLOSS projects
						</p>
					</div>

					<div id="support" className="page-element">
						<h1 className="title">
							Support
						</h1>
						<i className="fas fa-heart tagline-icon"/>
						<p className="text">
							Work on existing open source projects and collaborate with other clubs on and off campus
						</p>
					</div>

					<div id="create" className="page-element">
						<h1 className="title">
							Create
						</h1>
						<i className="fas fa-lightbulb tagline-icon"/>
						<p className="text">
							Build useful and fun projects with other club members to solve problems and learn
						</p>
					</div>

					{/* Get involved box  */}
					<div id="get-involved" className="page-element">
						<h1 className="title" id="get-involved-title">
							Get Involved
						</h1>
						<p className="get-involved-text">
							OSC is the Open Source Club at the University of Florida. We are a community of makers, who
							want to solve
							problems and improve our world using open source projects.
							<br />
								Our <a href="https://github.com/ufosc/getting-started">getting started guide</a> should
								help you learn about the
								club and how we operate. Sign up for
								our <a href="https://www.facebook.com/groups/ufosc/">Facebook group</a> for meeting
								announcements and join our
								<a href="https://discord.gg/Gsxej6u">Discord</a> to communicate with other members and
								ask questions. And of
								course, come to our meetings! Introduce yourself, work on projects, and have fun.
								<br />
									You can find our more about us and our history in the <Link to="/about">about
									page</Link>.
						</p>
					</div>
			</div>
		)
	}
}

export default Home;
