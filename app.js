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

function retriveLastPath(link) {
  var linkSplitByPath = link.split('/');
  var lastPath = linkSplitByPath[linkSplitByPath.length - 1];
  return lastPath.split('?', 2)[0];
}

function onLinkClicked(link) {
  if (typeof link.linkUrl === 'string') {
    var linkUrl = link.linkUrl;
    var videoId = null;
    var timestamp = null;

    var queryParams = retrieveQueryParams(linkUrl);
    if (linkUrl.includes('youtube.com/watch')) {
      if (typeof queryParams.v !== 'undefined') {
        videoId = queryParams.v;
      }
    } else if (linkUrl.includes('youtu.be')) {
      videoId = retriveLastPath(linkUrl);
    }

    if (typeof queryParams.t !== 'undefined') {
      timestamp = queryParams.t;
    }

    if (videoId !== null) {
      chrome.windows.create({
        url: 'pip.html?videoId=' + videoId + '&timestamp=' + timestamp,
        type: 'popup',
        width: 560,
        height: 365,
      });
    }
  }
}

chrome.contextMenus.create({
  title: 'YouTube PIP',
  contexts: ['link'],
  onclick: onLinkClicked,
});
