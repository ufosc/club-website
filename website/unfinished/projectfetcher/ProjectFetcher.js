function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

//Returns the line that starts with the header string. 
function getLine(section, header) {
	var pos1 = section.indexOf(header) + header.length;
	var x = section.split(header);
	var pos2 = x[1].indexOf("\\n") + x[0].length + header.length;
	var line = section.substring(pos1, pos2);
	return line
}
//project constructor
function project(title, github, resources, description, type, difficulty, status) {
   this.title = title;
   this.github = github;
   this.resources = resources;
   this.description = description;
   this.type = type;
   this.difficulty = difficulty;
   this.status = status;
}

var json = httpGet("https://rawgit.com/ufosc/club-documents/master/Project-Ideas.md");
var rawProject = JSON.stringify(json, null, 2);

var pos1 = rawProject.indexOf("## Active");
var pos2 = rawProject.indexOf("## Inactive");
var activeSection = rawProject.substring(pos1, pos2);		//Creates a string of only the active projects section
var projectEntries = activeSection.split("### ");			//Splits to the different projects

var projects = new Array();						
for (var i = 1; i < projectEntries.length; i++) {
    projects.push(new project(getLine(projectEntries[i], "Project: "), getLine(projectEntries[i], "**Github**: "), getLine(projectEntries[i], "**Resources**: "), getLine(projectEntries[i], "**Description**: "), getLine(projectEntries[i], "**Type**: "), getLine(projectEntries[i], "**Difficulty**: "), getLine(projectEntries[i], "**Status**: ")));
}

console.log(projects);

var inactiveSection = rawProject.substring(pos2);			//Creates inactive section
var inactiveProjectEntries = inactiveSection.split("### ");

var inactiveProjects = new Array();							
for (var i = 1; i < inactiveProjectEntries.length; i++) {
    inactiveProjects.push(new project(getLine(inactiveProjectEntries[i], "Project: "), getLine(inactiveProjectEntries[i], "**Github**:"), getLine(inactiveProjectEntries[i], "**Resources**:"), getLine(inactiveProjectEntries[i], "**Description**: "), getLine(inactiveProjectEntries[i], "**Type**: "), getLine(inactiveProjectEntries[i], "**Difficulty**: "), getLine(inactiveProjectEntries[i], "**Status**: ")));
}

console.log(inactiveProjects);