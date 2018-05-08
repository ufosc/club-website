
const GH_CONTENT_API_URL = 'https://api.github.com/repos/ufosc/resources/git/trees/eb7666402a1b2576457abcf174273d1fc93338ee?recursive=1';
const GH_RAW_API_URL = 'https://cdn.rawgit.com/ufosc/resources/57f5e618/resources/';

getContent(); //initializes the program
function Resources (header) { //object which stores resources text
  this.header = header;
  this.mainBody = "";
  this.subHeader = [];
  this.subBody = [];
};
var resources = []; //objects are accessed in an array by index


//parse actual content once it's been fetched
function parser(content) {
    var tempString = content.substring(content.indexOf("# ") + 2, content.indexOf("\n"));
    resources[i] = new Resources(tempString); //header goes in !!!
    content = content.replace("# " + tempString + "\n\n", ""); //deletes header
    if (content.indexOf("##") === -1) { //if there are no more sub-headers
        resources[i].mainBody = content; //main body goes in !!!
    }
    else {
        tempString = content.substring(0, content.indexOf("##"));
        resources[i].mainBody = tempString; //main body goes in !!!
        content = content.replace(tempString, "");
        var subHeaders = [];
        var subBodies = [];
        while (content.indexOf("## ") !== -1) { //while there are sub-headers
          content = content.replace("####", "&"); //for ease of parsing
            tempString = content.substring(content.indexOf("## ") + 3, content.indexOf("\n\n"));
            subHeaders.push(tempString); //sub-header goes in !!!
            content = content.replace("## " + tempString + "\n\n", "");
            if (content.indexOf("## ") === -1) { //if there are no more sub-headers
                subBodies.push(content); //sub-body goes in !!!
                content = content.replace(content, "");
            }
            else {
                tempString = content.substring(0, content.indexOf("##"));
                subBodies.push(tempString); //sub-body goes in !!!
                content = content.replace(tempString, "");
            }
        }
        resources[i].subHeader = subHeaders;
        resources[i].subBody = subBodies;
        console.log(resources[i]); //USE THIS TO LOOK AT HOW THE OBJECTS ARE FORMATTED, DELETE WHEN NOT NEEDED
    }
}

// HTTP REQUEST
function get(url, callback) {
    var xhr = new XMLHttpRequest(); //creates httprequest object
    xhr.open('GET', url, true); //specifies the request
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) { //if request is finished and response is ready
          var data = xhr.responseText; //returns response data as a string and stores it in data
          callback(data); //passes string into result in getContent method
        }
    };
    xhr.send(null);
}

i = 0;
function getContent() {
    get(GH_CONTENT_API_URL, function (result) { //passes url and method into get method
        var jsonResponse = JSON.parse(result); //converts string into a js object
        jsonResponse.tree.forEach(function (file) { //another recursive function calling unknown methods
            var filePath = file.path; //filepath = some unknown shit, assuming a string
            i++;
            if (filePath.includes('.md') && (i !== 1)) { //if it is a text file and not the first file
                get(GH_RAW_API_URL + filePath, function (result) {
                    //console.log(result);
                    parser(result); //calls parser method
                });
            }
        });
  });
}
