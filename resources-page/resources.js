// display actual content once it's been fetched
function display(content) {
  /* using showdown library that converts markdown into HTML */
    var converter = new showdown.Converter({tables: true}),
    html          = converter.makeHtml(content);

    /* creates new div with class 'item' and appends to 'items' div*/
    var div       = document.createElement('div');
    div.className = 'item';
    div.innerHTML = html;
    document.getElementById('data').appendChild(div);
}

// HTTP REQUEST
function getInfo(link, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", link, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          var data = xhr.responseText;
          callback(data);
        }
    };
    xhr.send(null);
}

/* slight callback hell 😅  */

// call github API to get all files (names) from resources repo (may also contain directories)
getInfo("https://api.github.com/repos/ufosc/resources/contents/resources", function(result) {
  var jsonResponse = JSON.parse(result);
  jsonResponse.forEach(function(list) {
    console.log('file name: ', list.name);
    // get actual content from each file in resources repo, only markdown files, and not the first README.md
    if(list.name.includes('.md') && list.name != 'README.md') {
        getInfo('https://cdn.rawgit.com/ufosc/resources/57f5e618/resources/' + list.name, function(result) {
        console.log(result);
        display(result);
      });
      // list.name is a directory, so fetch data from that directory
    } else {
        var dir = list.name;
        getInfo('https://api.github.com/repos/ufosc/resources/contents/resources/' + dir, function(result) {
          var jsonResponse = JSON.parse(result);
          jsonResponse.forEach(function(list) {
            console.log('file name: ', list.name);
            getInfo('https://cdn.rawgit.com/ufosc/resources/57f5e618/resources/' + dir + '/' + list.name, function(result) {
            display(result);
          });
        });
      });
    }
  });
});
