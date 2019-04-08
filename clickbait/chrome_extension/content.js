


var elements = document.querySelectorAll('p,li,a,h1,h2,h3,h4');


for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];



        var text = node.textContent;

	    count=text.split(' ').length;

if ((count > 4) && (count < 30)){


var s= "http://localhost:81/pred?text="
s=s+text;

var request = new XMLHttpRequest();
request.open('GET', s , false);  // `false` makes the request synchronous
request.send(null);

if (request.status === 200) {// That's HTTP for 'ok'
var msgs = JSON.parse(request.responseText);
    if((msgs['Result'] > 0.75) && (node.nodeType==1)){
    		console.log(node);
    		node.style.filter="blur(5px)";
    }


  //console.log(request.responseText);
}










        }
    }
}




