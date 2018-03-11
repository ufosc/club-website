
const GH_CONTENT_API_URL = 'https://api.github.com/repos/ufosc/resources/git/trees/eb7666402a1b2576457abcf174273d1fc93338ee?recursive=1';
const GH_RAW_API_URL = 'https://cdn.rawgit.com/ufosc/resources/57f5e618/resources/';

getContent();

// display actual content once it's been fetched
function display(content) {
  /* using showdown library that converts markdown into HTML */
    var converter = new showdown.Converter({tables: true}),
    html          = converter.makeHtml(content);

    /* creates new div with class 'item' and appends to 'items' div*/
    var div       = document.createElement('div');
    div.className = 'item';
    div.innerHTML = html;
    document.getElementById('items').appendChild(div);
}

// HTTP REQUEST
function get(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          var data = xhr.responseText;
          callback(data);
        }
    };
    xhr.send(null);
}

function getContent() {
  get(GH_CONTENT_API_URL, function(result) {
    var jsonResponse = JSON.parse(result);
    jsonResponse.tree.forEach(function(file) {
      var filePath = file.path;
      if(filePath.includes('.md') && !filePath.includes('README.md')) {
        get(GH_RAW_API_URL + filePath, function(result) {
            console.log(result);
            display(result);
        });
      }
    });
  });
}
