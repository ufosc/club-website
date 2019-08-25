import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css'

class Home extends React.Component {
	render () {
		return (
			<div id="wrapper">

				{/* Slideshow  */}
				<div id="slideshow" className="page-element" style="padding: 0px">
					<div className="slideshow-container">
						<div className="mySlides fade">
							<img className="slide" style="object-fit: contain; background-color: #262626;" src="../images/logo-text.png" />
							<br />
									{/*  This is here so the box is the same height as the other slides w/text */}
						</div>
						<div className="mySlides fade">
							<img className="slide" style="object-position: 50% 35%" src="../images/casual-coding.jpg" />
								<div className="text">Casual Coding</div>
						</div>
						<div className="mySlides fade">
							<img className="slide" style="object-position: 50% 25%" src="../images/swamp-hacks-2017.jpg" />
								<div className="text">Hackathons</div>
						</div>
						<div className="mySlides fade">
							<img className="slide" style="object-position: 50% 30%" src="../images/lan-party.jpg" />
								<div className="text">LAN parties</div>
						</div>
						<div className="mySlides fade">
							<img className="slide" src="../images/mozilla-talk.jpg" />
								<div className="text">Guest Speakers</div>
						</div>
						<a className="prev arrow" onClick="plusSlides(-1)">&#10094;</a>
						<a className="next arrow" onClick="plusSlides(1)">&#10095;</a>
					</div>
					<div style="text-align:center; padding-bottom:10px;">
						<span className="dot" onClick="currentSlide(1)"></span>
						<span className="dot" onClick="currentSlide(2)"></span>
						<span className="dot" onClick="currentSlide(3)"></span>
						<span className="dot" onClick="currentSlide(4)"></span>
						<span className="dot" onClick="currentSlide(5)"></span>
					</div>
				</div>
				<br />

					{/* Tag line boxes  */}
					<div id="promote" className="page-element">
						<h1 className="title">
							Promote
						</h1>
						<i className="fas fa-bullhorn tagline-icon"></i>
						<p className="text">
							Spread information about the free and open source movement as well as FLOSS projects
						</p>
					</div>

					<div id="support" className="page-element">
						<h1 className="title">
							Support
						</h1>
						<i className="fas fa-heart tagline-icon"></i>
						<p className="text">
							Work on existing open source projects and collaborate with other clubs on and off campus
						</p>
					</div>

					<div id="create" className="page-element">
						<h1 className="title">
							Create
						</h1>
						<i className="fas fa-lightbulb tagline-icon"></i>
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
