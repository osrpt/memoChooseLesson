function getClickHandler() {
  return function(info, tab) {
    var t = encodeURI(tab.title);
    var u = encodeURI(tab.url);
    var c = encodeURI(info.selectionText);
    chrome.tabs.create({
      "url": getUrl(u,t,c)
    });
  };
};

function getUrl(u,t,c)
{
  var str="javascript:document.charset='utf-8';document.write(' <form id=\"ireadcollect\" action=\"http://www.ireadhome.com/Collect/CollectInfo\" method=\"post\"> <input name=\"url\" value=\""+u+"\" /> <input name=\"title\" value=\""+t+"\" /> <input name=\"content\" value=\""+c+"\" /> </form> ');document.getElementById('ireadcollect').submit();";
  return str;
}

function post_to_url(params) {
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "http://www.ireadhome.com/Collect/CollectInfo");
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
        }
    }
    document.body.appendChild(form);
    form.submit();
}

chrome.contextMenus.create({
  "title": "! iRead 发现",
  "type": "normal",
  "contexts": ["all"],
  "onclick": getClickHandler()
});

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendRequest(
      tab.id, 
      {method: "getSelection"},
       function(response) {
        var t = encodeURI(tab.title);
        var u = encodeURI(tab.url);
        var c = encodeURI(response.data);
        chrome.tabs.create({
          "url": getUrl(u,t,c)
        });
  });
});