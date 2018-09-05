# Club Website Design

The goal of the redesign is to make a fast and responsive (so it works on devices from phones to desktop monitors) website that provides all the information anyone interested or already in the club needs.

## File Structure

All of the website code is under the [website folder](../website/).

The HTML files are the actual web pages we load. The "index.html" is our homepage (web browsers by default load the index.html file). The names of the other ones should explain their purpose. Each HTML file has the the same header and footer, as they are in each page of the website.

The assets folder contains fonts, images, and other files that we use, but aren't code. Both fonts and images have their own folders inside the assets folder.

The styles folder contains the CSS for the website. There is a "unified.css" file that contains all the CSS each web page shares. This way we can make tweaks in one file, and update the styling on all of the pages (for instance the background color). Each of the pages also has a CSS file of it's own (it should have the same name as the HTML file). This has the CSS for the structure of the page, as well as any other page specific styling. The "Font Awesome" font uses some CSS too, so it's files are included in the styles folder as well (with either "fa" or "fontawesome" in the name).

Eventually we will have a "scripts" folder to contain any JavaScript for the pages. The naming will be treated the same as the CSS (where shared JavaScript will be in a unified file and each page get's a JavaScript file with the same name as the HTML one).

Finally we have an unfinished folder for pages that haven't been completed yet. Each page has a sub-folder that contains all the assets, styling, and scripting that page needs.

## Web Pages

Below is a breakdown of what should be included in each web page.

- Home
	- Greeting
	- Mission statement
	- An invitation to get involved
	- A place to sign up for email notifications
- About
	- Description of the club and what it does
	- A more in-depth section on how to get started
	- History of the club
- Projects
	- A list of club projects
	- Descriptions, screenshots, members who worked on it, link to it
	- Should indicate whether if it's active or not
- Events
	- A list of upcoming and past events
	- Link to presentations and notes for each
	- Link to the Facebook event
	- A way to add the event calendar to the users calendar
- Resources
	- List of the resource we provide (like those from the GitHub resources folder)
	- Could also have officer information (club documents repo)

## User Interface

We are going for a modern style of our website. Some rough drafts of the designs are available in the [references folder](references/) in addition to some [example sites](references/other-sites.md) we took inspiration from.
