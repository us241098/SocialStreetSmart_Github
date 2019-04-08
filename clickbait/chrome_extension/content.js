

var elements = document.querySelectorAll('p,li,a,h1,h2,h3,h4');


for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (((node.nodeType==3) || (node.nodeType==1)) && node.nodeValue!=null ) {
            var text = node.textContent;
	    count=text.split(' ').length;

	    if ((count > 4) && (count < 30)){
const http = new XMLHttpRequest()
console.log('hi');
var s= "http://localhost:81/pred?text="
s=s+text;
http.open("GET", s)
http.send()


http.onload = function () {
	var msgs = JSON.parse(http.responseText);
  console.log(msgs['Result']);

 if (msgs['Result'] > 0.75){
 	console.log(node.nodeValue);
 	if(nodeValue != null){
 	node.style.backgroundColor = "yellow";
 }
 }


}	





        }
    }
}

}



