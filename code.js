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
		usedShurikensCount = 0,
		
		shurikenSpeed = 5,

		menuAbout = document.getElementById('about');


	/**
	 * Take a shuriken and put it into the belt.
	 * @param count {number} Number of shurikens to take.
	 */
	function takeShurikens(count) {
		if(window.localStorage) {
			window.localStorage['usedShurikens'] = window.localStorage['usedShurikens'] || 0;

		}
			var currentShurikenNumber = +window.localStorage['usedShurikens'] + count;
			window.localStorage['usedShurikens'] = currentShurikenNumber;

			while(count > 0) {
				var newTr = document.createElement('tr'),
					newShuriken = document.createElement('td');
					newTr.appendChild(newShuriken);

				newShuriken.className = 'shuriken';
				newShuriken.innerText = 'Shuriken no. ' + (currentShurikenNumber - count);

				shurikenBelt.appendChild(newTr);
				count--;
			}
			
			shurikenBeltCount.innerText = '(' + shurikenBelt.childElementCount + ')';
			throwShurikenButton.style.visibility = 'visible';
	}

	/**
	 * Throw the shurikens that are currently in the belt.
	 */
	function throwShuriken() {
		main.className = 'throwing';
		
		function createShuriken(container) {
			var shurikenContainer = document.createElement('div'),
		    	shuriken = document.createElement('img');
		    shurikenContainer.style.left = (-50 - Math.random() * 5 * thrownShurikens.length) + 'px';
		    shurikenContainer.style.top = (20 + (Math.random() * 50)) + '%';
		    shurikenContainer.className = "flyingShurikenContainer";
		    shuriken.setAttribute('src', 'shuriken.svg');
		    shuriken.className = "flyingShuriken";
		    shuriken.weight = (new Array(10000).join('a'));

		    shurikenContainer.appendChild(shuriken);

		    return shurikenContainer;
		}
		
		var shurikenCount = shurikenBelt.childElementCount;
		for(var i = 0; i < shurikenCount; i++) {
		    var shuriken = createShuriken();
		    thrownShurikens.push(shuriken);
		    throwSection.appendChild(shuriken);
		}
		
		setTimeout(animate, 0);
	}

	/**
	 * Goes back from the shuriken launch field.
	 */
	function goBack() {
		main.className = '';
		
		for(var s in thrownShurikens) {
		    if(thrownShurikens[s].parentElement === throwSection) {
		        throwSection.removeChild(thrownShurikens[s]);
		    }
		}
		// Much better with this!
		// thrownShurikens.length = 0;
		
		while(shurikenBelt.hasChildNodes()) {
		    shurikenBelt.removeChild(shurikenBelt.firstChild);
		}
		
		shurikenBeltCount.innerText = '';
		updateUsedShurikens();
		throwShurikenButton.style.visibility = 'hidden';
	}
	
	var lastTime = 0;
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

	/**
	 * Update the numver of shurikens that have been currently thrown.
	 */
    function updateUsedShurikens() {
    	if(window.localStorage) {
    		usedShurikensCount = window.localStorage['usedShurikens'] = window.localStorage['usedShurikens'] || 0;
    	}
    	usedShurikens.innerText = usedShurikensCount;
    }
    updateUsedShurikens();

    /**
     * Shows the about popup.
     */
    function showAboutPopup() {
    	var xhr = new XMLHttpRequest();
		xhr.onload = function() {
		  var xml = this.responseText;
		  parseXmlStuffAndShowAlert(xml);
		};
		xhr.open("post", "http://localhost:9615/visits/xml", true);
		xhr.send('timecode=' + Date.now());
    }
    menuAbout.addEventListener('click', showAboutPopup);

    function parseXmlStuffAndShowAlert(xml) {
    	if(xml[0] != '<') {
		  	alert('Error getting number of visits.');
		  } else {
		  	// parse the xml
		  }
    }

    function parseJsonStuffAndShowAlert(json) {
    	try {
    		var parsedJson = JSON.parse(json);
    		var visits = parsedJson.visits;
    		if(visits) {
    			alert('Thanks for playing the game!\nThis page has been clicked ' + visits + ' times.');
    		}
    	} catch (e) {
    		alert('Error parsing JSON');
    	}
    }
    
	takeShurikenButton.addEventListener('click', function() { takeShurikens(100); });

	throwShurikenButton.addEventListener('click', throwShuriken);
	goBackButton.addEventListener('click', goBack);

})()