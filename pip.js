function retrieveQueryParams(link) {
  var params = {};

  if (link.includes('?')) {
    var paramsString = link.split('?', 2)[1];

    var splitParams = paramsString.split('&');
    for (var i = 0; i < splitParams.length; i++) {
      if (splitParams[i].includes('=')) {
        var splitParam = splitParams[i].split('=', 2);
        params[splitParam[0]] = splitParam[1];
      }
    }
  }

  return params;
}

window.addEventListener("DOMContentLoaded", function() {
  var params = retrieveQueryParams(window.location.href);
  var videoId = params.videoId;
  var timestamp = params.timestamp;

  var url = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
  if (timestamp !== 'null') {
    url += '&start=' + timestamp;
  }
  console.log(url);
  var elementString = '<iframe src="'+ url + '" frameborder="0" allowfullscreen/>';

  document.getElementById("video-container").innerHTML = elementString;
}, false);
