chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message == "listeners"){
      //add event handler for button click
      chrome.tabs.executeScript(null, {file: "injectedScript.js"});
      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = 'https://ssl.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
      // end google analytics

      sendResponse({message: "OK"});
    }
  });
