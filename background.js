chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var action = request.action || 'getData';
        if (action === 'getData') {
            sendResponse(JSON.parse(localStorage.config));
        }
    }
);
