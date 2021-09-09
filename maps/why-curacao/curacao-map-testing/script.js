

// data
const locations = [
	{
		name: "Toronto",
		slug: "toronto",
		zoom: {
			left:'25%',
			top: '1%',
			scale: '2.1'
		}
	},
	{
		name: "Montreal",
		slug: "montreal",
		zoom: {
			left:'25%',
			top: '10%',
			scale: '2.1'
		}
	},
	{
		name: "New York",
		slug: "new-york",
		zoom: {
			left:'18.2%',
			top: '1.1%',
			scale: '2'
		}
	},
	{
		name: "Newark",
		slug: "newark",
		zoom: {
			left:'18.2%',
			top: '1.1%',
			scale: '2'
		}
	},
	{
		name: "Miami",
		slug: "miami",
		zoom: {
			left:'88.2%',
			top: '-22.9%',
			scale: '4'
		}
	},
	{
		name: "Montego Bay",
		slug: "montego-bay",
		zoom: {
			left:'95.2%',
			top: '-22.9%',
			scale: '4'
		}
	},
	{
		name: "Panama City",
		slug: "panama-city",
		zoom: {
			left:'103.2%',
			top: '-51.9%',
			scale: '4'
		}
	},
	{
		name: "Bogota",
		slug: "bogota",
		zoom: {
			left:'94.2%',
			top: '-49.9%',
			scale: '4'
		}
	},
	{
		name: "Santo Domingo",
		slug: "santo-domingo",
		zoom: {
			left:'80.2%',
			top: '-22.9%',
			scale: '4'
		}
	},
	{
		name: "Trinidad",
		slug: "trinidad",
		zoom: {
			left:'80.2%',
			top: '-22.9%',
			scale: '4'
		}
	},
	{
		name: "Aruba",
		slug: "aruba",
		zoom: {
			left:'88.2%',
			top: '-22.9%',
			scale: '4'
		}
	},
	{
		name: "Amsterdam",
		slug: "amsterdam",
		zoom: {
			left:'-2%',
			top: '8%',
			scale: '2'
		}
	}
]

function returnLocation(slugToFind) {
	return locations.find(({ slug }) => slug === slugToFind);
}

// state variable to track whether the app is in zoom mode
var zoomMode = false;

function zoom0() { 
	zoomMode = false;
	zoomIn('0%', '0%', '1');
	turnOffGraphics(document.getElementsByClassName("zoom-graphics"));
	turnOffGraphics(document.getElementsByClassName("hover-graphics"));
	turnOnMarkers()
}

function zoomToCuracao() {
	zoomMode = true;
	zoomIn('138%', '-48%', '6.5');
	turnOffGraphics(document.getElementsByClassName("zoom-graphics"));
	turnOffGraphics(document.getElementsByClassName("hover-graphics"));

}

function oceanZoom(val) {
	
	let oceanFormula;
	var oceanBkg = document.getElementById("ocean-bkg");
	console.log("ocena bkg", oceanBkg)
	if(val === 'full') {
		console.log("full")
		oceanBkg.style.transform =  `translate(69%, -24%) scale(3.25)`;
	} else if(val === 'none') {
		console.log("none")
		oceanBkg.style.transform = `translate(0%, 0%) scale(1)`;
	} else if(val === 'zoomEurope') {
		
	} else if(val === 'zoomAmerica') {
		oceanBkg.style.transform = `translate(30%, -12%) scale(2)`;
	}
	

}

function zoomIn(left, top, scale) {
	var mapImages = document.getElementsByClassName("map-image");

	// css to be applied
	var cssFormula = `translate(${left}, ${top}) scale(${scale})`;
	
	// loop through the items that meet our class criteria
	// This can be achieved via refs array in React

	for (var i=0, len=mapImages.length|0; i<len; i=i+1|0) {
		mapImages[i].style.transform = cssFormula;
	}
	turnOffMarkers();
}

function turnOffGraphics(items) {
	for (var i=0, len=items.length|0; i<len; i=i+1|0) {
		// console.log("markers[i]: ", markers[i]);
		items[i].style.opacity = 0;
		items[i].style.pointerEvents = 'none';
	}
}

function turnOffMarkers() {
	var markers = document.getElementsByClassName("marker");

	for (var i=0, len=markers.length|0; i<len; i=i+1|0) {
		// console.log("markers[i]: ", markers[i]);
		markers[i].style.opacity = 0;
		markers[i].style.pointerEvents = 'none';
	}
}

function turnOnMarkers() {
	var markers = document.getElementsByClassName("marker");

	for (var i=0, len=markers.length|0; i<len; i=i+1|0) {
		// console.log("markers[i]: ", markers[i]);
		markers[i].style.opacity = 1;
		markers[i].style.pointerEvents = 'bounding-box';
	}
}

function turnOffZoomGraphics() {
	var zoomItems = document.getElementsByClassName("zoom-graphics");

	for (var i=0, len=zoomItems.length|0; i<len; i=i+1|0) {
		console.log("zoomItems[i]: ", zoomItems[i]);
		zoomItems[i].style.opacity = 0;
		zoomItems[i].style.pointerEvents = 'none';
	}
}

function turnOffHoverGraphics() {
	var hoverItems = document.getElementsByClassName("hover-graphics");

	for (var i=0, len=hoverItems.length|0; i<len; i=i+1|0) {
		console.log("hoverItems[i]: ", hoverItems[i]);
		hoverItems[i].style.opacity = 0;
		hoverItems[i].style.pointerEvents = 'none';
	}
}

function markerMouseEnter(e){

	// turn off this marker
	var thisMarker = e.currentTarget;
	thisMarker.style.opacity = 0

	// show hand pointer on marker
	thisMarker.style.cursor = "pointer"
	
	// turn on this hover-graphics
	var parent = thisMarker.parentNode;
	var hoverGraphics = parent.querySelector(".hover-graphics");
	hoverGraphics.style.opacity = 1;

}

function markerMouseLeave(e){

	if(!zoomMode) { // without this check, marker turns itself back on even though it has already been clicked
		// turn this marker back on
		var thisMarker = e.currentTarget;
		thisMarker.style.opacity = 1

		// remove hand pointer on  marker
		thisMarker.style.cursor = "default"
		
		// turn off this hover graphics
		var parent = thisMarker.parentNode;
		var hoverGraphics = parent.querySelector(".hover-graphics");
		hoverGraphics.style.opacity = 0;
	}
}

function turnOnThisZoomGraphic(e) {
	var parent = e.currentTarget.parentNode;
	var zoomGraphics = parent.querySelector(".zoom-graphics");
	zoomGraphics.style.opacity = 1;
}

function markerMouseClick(e) {
	zoomMode = true;
	turnOffMarkers();
	turnOnThisZoomGraphic(e);
	console.log("e.currentTarget.parentNode.id: ", e.currentTarget.parentNode.id)
	const location = returnLocation(e.currentTarget.parentNode.id);
	const { left, top, scale } = location.zoom
	zoomIn(left, top, scale);
	oceanZoom('zoomAmerica');
}

function docReady(fn) {
	// see if DOM is already available
	if (document.readyState === "complete" || document.readyState === "interactive") {
			// call on next available tick
			setTimeout(fn, 1);
	} else {
			document.addEventListener("DOMContentLoaded", fn);
	}
}

function addEventListeners() {
	var markers = document.getElementsByClassName("marker");
	// console.log("markers: ", markers)

	for (var i=0, len=markers.length|0; i<len; i=i+1|0) {
		// console.log("I: ", i)
		markers[i].addEventListener("mouseenter", markerMouseEnter);
		markers[i].addEventListener("mouseout", markerMouseLeave);
		markers[i].addEventListener("click", markerMouseClick);
	}
}
/// Initialized

docReady(function() {
	// DOM is loaded and ready to engage here
	addEventListeners();

});


