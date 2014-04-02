(function() {
	var takeShurikenButton = document.getElementById('takeShurikenButton'),
		throwShurikenButton = document.getElementById('throwShurikenButton'),
		goBackButton = document.getElementById('goBackButton'),
		usedShurikens = document.getElementById('usedShurikens'),

		throwSection = document.getElementById('throwSection'),

		shurikenBelt = document.getElementById('shurikenBelt'),
		shurikenBeltCount = document.getElementById('shurikenBeltCount'),

		main = document.getElementsByTagName('main')[0],

		thrownShurikens = [],
		usedShurikensCount = window.localStorage && (+window.localStorage['usedShurikens']) || 0,

		shurikenSpeed = 4,

		menuAbout = document.getElementById('about');


	function addShurikenToBelt(count) {
		var newTr = document.createElement('tr'),
			newShuriken = document.createElement('td');
			newTr.appendChild(newShuriken);

		newShuriken.className = 'shuriken';
		newShuriken.innerText = 'Shuriken no. ' + (shurikenBelt.childElementCount + 1);

		shurikenBelt.appendChild(newTr);
	}

	function updateShurikenCountInBelt(count) {
		shurikenBeltCount.innerText = '(' + (shurikenBelt.childElementCount + count) + ')';
	}

	function updateThrownShurikenCount() {
		usedShurikensCount = usedShurikensCount + shurikenBelt.childElementCount;
		if(window.localStorage) {
			window.localStorage['usedShurikens'] = usedShurikensCount;
		}
		usedShurikens.innerText = usedShurikensCount;
	}

	function showThrowButton(show) {
		throwShurikenButton.style.visibility = show ? 'visible' : 'hidden';
	}

	function createShuriken(container) {
		var shurikenContainer = document.createElement('div'),
	    	shuriken = document.createElement('img');
	    shurikenContainer.style.left = (-50 - Math.random() * 5 * thrownShurikens.length) + 'px';
	    shurikenContainer.style.top = (20 + (Math.random() * 50)) + '%';
	    shurikenContainer.className = "flyingShurikenContainer";
	    shuriken.setAttribute('src', 'shuriken.svg');
	    shuriken.className = "flyingShuriken";
		// Note by Boss: do not remove!!!					// -_-_-_-_-_-_-_,------,
	    shuriken.weight = (new Array(10000).join('nya'));	// _-_-_-_-_-_-_-|   /\_/\
															// -_-_-_-_-_-_-~|__( ^ .^)
	    shurikenContainer.appendChild(shuriken);			// _-_-_-_-_-_-_-""  ""

	    return shurikenContainer;
	}

	var THROWING_CLASS = 'throwing';
	function togglePage() {
		main.className = main.className === THROWING_CLASS ? '' : THROWING_CLASS;
	}

	function initThrownShurikens() {
		var shurikenCount = shurikenBelt.childElementCount;
		for(var i = 0; i < shurikenCount; i++) {
		    var shuriken = createShuriken();
		    thrownShurikens.push(shuriken);
		    throwSection.appendChild(shuriken);
		}
	}

	function disposeThrownShurikens() {
		for(var s in thrownShurikens) {
		    if(thrownShurikens[s].parentElement === throwSection) {
		        throwSection.removeChild(thrownShurikens[s]);
		    }
		}

		// Much better with this!
 		// thrownShurikens.length = 0;
	}

	function cleanBelt() {
		while(shurikenBelt.hasChildNodes()) {
		    shurikenBelt.removeChild(shurikenBelt.firstChild);
		}
		shurikenBeltCount.innerText = '';
		showThrowButton(false);
	}

	function doPostTo(url, postData, callback) {
    	var xhr = new XMLHttpRequest();
		xhr.onload = function() {
		  callback(this.responseText);
		};
		xhr.open("post", url, true);
		xhr.send(postData);
    }

    function parseXmlStuffAndShowAlert(xml) {
		var text = 'This is a game in which you throw shurikens.\n';
    	if(xml[0] != '<') {
			text += '# Error getting number of visits. #';
		} else {
		  	// parse the xml here
		}
		alert(text);
    }

    function parseJsonStuffAndShowAlert(json) {
		var text = 'This is a game in which you throw shurikens.\n';
    	try {
    		var parsedJson = JSON.parse(json);
    		var visits = parsedJson.visits;
    		if(visits) {
    			text += 'This page has been visited ' + visits + ' times.';
    		}
    	} catch (e) {
    		text += '# Error getting number of visits. #';
    	}
		alert(text);
    }





    // MAIN FUNCTIONS

	/**
	 * Take a shuriken and put it into the belt.
	 * @param count {number} Number of shurikens to take.
	 */
	function takeShurikens(count) {
		updateShurikenCountInBelt(count);
		while(count > 0) {
			addShurikenToBelt(count--);
		}
		showThrowButton(true);
	}

	/**
	 * Throw the shurikens that are currently in the belt.
	 */
	function throwShuriken() {
		togglePage();
		initThrownShurikens();
		setTimeout(animate, 0);
	}
	throwShurikenButton.addEventListener('click', throwShuriken);

	/**
	 * Put a shuriken into the belt.
	 */
    function takeShurikenHandler() {
    	takeShurikens(1);
    }
    takeShurikenButton.addEventListener('click', takeShurikenHandler);

	/**
	 * Goes back to the main page from the shuriken throwing field.
	 */
	function goBack() {
		togglePage();
		disposeThrownShurikens();
		updateThrownShurikenCount();
		cleanBelt();
	}
	goBackButton.addEventListener('click', goBack);

	/**
	 * Animate the shurikens.
	 */
	function animate() {
	    if(main.className === 'throwing') {
    	    for(var s in thrownShurikens) {
    	        var shuriken = thrownShurikens[s];
    	        var position = parseInt(shuriken.style.left);
    	        if(position < screen.availWidth) {
    	            position = position + shurikenSpeed;
	                shuriken.style.left = position + 'px';
    	        }

    	        // Release the awesome!
 	            // var position = screen.availWidth - parseInt(shuriken.style.left);
 	            // shuriken.style.webkitTransform = 'translateX(' + position + 'px)';
	 	        // shuriken.style.webkitTransition = (2 + Math.random() * 2) + 's linear';
    	    }
    	    setTimeout(animate, 0);
	    }
	}

    function showAboutPopup() {
    	doPostTo("http://localhost:9615/visits/xml",
			'timecode=' + Date.now(),
			parseXmlStuffAndShowAlert);
    }
    menuAbout.addEventListener('click', showAboutPopup);

    function devOrientHandler(evt) {
    	if(evt.gamma > 75) {
    		cleanBelt();
    		alert('Belt emptied');
    	}
    }

    // See http://www.html5rocks.com/en/tutorials/device/orientation/
    if (window.DeviceOrientationEvent) {
	  // Listen for the event and handle DeviceOrientationEvent object
	  window.addEventListener('deviceorientation', devOrientHandler, false);
	}


	// INIT
	updateThrownShurikenCount();

})()
