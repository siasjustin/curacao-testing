
function zoomIn(left, top, scale) {
   	var mapImages = document.getElementsByClassName("map-image");
	
		// css to be applied
		var cssFormula = `translate(${left}, ${top}) scale(${scale})`;
    
		// loop through the items that meet our class criteria
		// This can be achieved via refs array in React

    for (var i=0, len=mapImages.length|0; i<len; i=i+1|0) {
			mapImages[i].style.transform = cssFormula;
		}
    
}
document.querySelectorAll(".marker").forEach(function (element) {
	console.log("element: ", element)
});

function markerClick(i){

}
function zoom0() { 
    zoomIn('0%', '0%', '1');
}
function zoom1() {
    zoomIn('18%', '1%', '2');
}

