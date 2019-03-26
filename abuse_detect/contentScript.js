//var threshold = 1;//if sync.get fails, we use 50 as a default.

    var jq = document.createElement('script');
    jq.src = "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(jq);
    jQuery.noConflict();


chrome.storage.sync.get({
  threshold: '1'
}, function(items) {
  threshold = items.threshold;
});

//deal with newly loaded tweets
function DOMModificationHandler(){
    $(this).unbind('DOMSubtreeModified.event1');
    setTimeout(function(){
        modify();
        $('#timeline').bind('DOMSubtreeModified.event1',DOMModificationHandler);
    },10);
}
$('#timeline').bind('DOMSubtreeModified.event1',DOMModificationHandler);

function modify(){
  //find and modify tall tweets
  $('.userContent').each(function(index){
    var t = $(this).html();
    console.log(t);
    var len = t.split(/\r\n|\r|\n/).length;
     console.log(len);
    if(!$(this).hasClass("squished")){
      $(this).addClass("squished");
      $(this).css('-webkit-filter', 'blur(5px)');
      //if we add a new button, we have to add listeners again...
      chrome.runtime.sendMessage({message: "listeners"}, function(response) {
      });
    }
  });
}
