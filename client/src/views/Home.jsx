import React from 'react';
import {Link} from 'react-router-dom';
import "../styles/index.scss";
import Slideshow from "../components/Slideshow";
import HomeGrid from "../components/HomeGrid/HomeGrid";


class Home extends React.Component {

	componentDidMount () {
		const script = document.createElement("script");
	
		script.src = "https://apis.google.com/js/platform.js";
		script.async = true;
		script.defer = true;
	
		document.body.appendChild(script);
	}
	
	render() {
		return (
			<div id="homeBody">
				<div className="page-element" style={{"padding": "0px"}}>
					<Slideshow/>
				</div>
				<br/>

				{/* Tag line boxes  */}
				<HomeGrid className="cardGrid"/>
				<br/>

				{/* Get involved box  */}
				<div className="page-element">
					<h1 className="title" id="get-involved-title">
						Get Involved
					</h1>
					<p className="get-involved-text">
						OSC is the Open Source Club at the University of Florida. We are a community of makers, who
						want to solve
						problems and improve our world using open source projects.
						<br/><br/>
						Our <a href="https://github.com/ufosc/getting-started">getting started guide</a> should
						help you learn about the
						club and how we operate. Sign up for
						our <a href="https://www.facebook.com/groups/ufosc/">Facebook group</a> for meeting
						announcements and join our
						<a href="https://discord.gg/Gsxej6u">Discord</a> to communicate with other members and
						ask questions. And of
						course, come to our meetings! Introduce yourself, work on projects, and have fun.
						<br/><br/>
						You can find our more about us and our history in the <Link to="/about">about
						page</Link>.
					</p>
				</div>
			</div>
		)
	}
}

export default Home;
