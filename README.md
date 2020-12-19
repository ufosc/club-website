# UF Open Source Club's Website

The official remodeling of the official club website.

The website needs to be a central place for
 - Potential club members who are interested in what the Open Source Club is and want to find out more
 - Existing club members as a way to easily check what events are happening and what projects the club is working on
 - Students or others who are interested in open source in general and want to see how UF is involved with Open Source

~~The project roadmap can be found [here](https://github.com/ufosc/club-website/issues/68).~~

## Getting Started

Install
- An internet browser like [Firefox](https://www.mozilla.org/en-US/firefox/new/) or [Google Chrome](https://www.google.com/chrome/index.html)
- An IDE or text editor like [WebStorm](https://www.jetbrains.com/webstorm/), [VSCode](https://code.visualstudio.com/), [Atom](https://atom.io/), or [Sublime Text](https://www.sublimetext.com/)
	- Install an [EditorConfig](https://editorconfig.org/) plugin if available, to help ensure consistent formatting
- Node.js (whatever version is the latest, there shouldn't be any issues unless on an ancient version)
- Yarn - [Instructions to install here](https://yarnpkg.com/en/docs/install)

[Then clone this repo](https://help.github.com/articles/cloning-a-repository/)
#### Verifying your installs

- run `yarn -v` and `node -v`, these should output a version number along the lines of `v10.16.0` or `6.11.3`
- if these commands fail, make sure you have node.js properly installed.

### Testing

#### _**If working with backend follow these instructions**_:

**1.**  The first step is to run `yarn install` in the root project repository.

**2.** Now run `yarn workspace server watch` to startup the server.

**3.** The backend development server should now be running! For testing with a database connect to a mongoDB database either locally or remotely.

#### _**If working with the frontend follow these instructions**_:

**1.** Run the command `yarn workspace client start` from the root directory.

**2.** The server should now be running on http://localhost:3000


## Deployment

Our own Nginx server using the [club stack](https://github.com/ufosc/club-stack) project

## Built With

- [React](https://reactjs.org/) - Used for the frontend, it helps define the layout into components and manage page elements/components dynamically.
- [Node.js](https://nodejs.org/en/) - Used on the backend, useful for HTTP protocol and uses an asynchronous event driven JavaScript runtime.
- [Express](https://expressjs.com/) -  A Node.js framework with a plethora of HTTP utility methods and middleware.
- [MongoDB](https://www.mongodb.com/) - A document-based, NoSQL database.

Check out the [DESIGN.md](docs/DESIGN.md) file in docs folder for more information about the project.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for how to work on the project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
