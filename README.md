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

[Then clone this repo](https://help.github.com/articles/cloning-a-repository/)
#### Verifying your installs

- run `npm -v` and `node -v`, these should output a version number along the lines of `v10.16.0` or `6.11.3`
- if these commands fail, make sure you have node.js properly installed.

### Testing

_**If working with backend follow these instructions**_:

**1.** if you haven't already, run npm install once navigated into the _club-wesbite/server_ directory.

**2.** Once completed, go ahead and run `npm install nodemon -g`, this will allow for automatic reloading of the server when you update your codebase.

**3.** Now run nodemon `nodemon server/server.js`.

**4.** The backend development server should now be running!

_**If working with the frontend follow these instructions**_:

**1.** if you haven't already, run npm install once navigated into the _club-wesbite/client_ directory.

**2.** Run the command `react-scripts start` while still in the same directory.


## Deployment

Our own Nginx server using the [club stack](https://github.com/ufosc/club-stack) project

## Docker Deployment

Another option for running the site is with docker. Here are the different deployment options.

### Development

Run the development server with the following command. This will mount your local client directory for live changes.

```bash
$ NODE_ENV=development docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

### Production

Run the production nginx server with the following command.

```bash
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

### Bringing down the servers

Bring the servers down with the following command.

```bash
$ docker-compose down
```

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
