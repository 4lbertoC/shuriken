(function() {
	var takeShurikenButton = document.getElementById('takeShurikenButton'),
	    take5ShurikenButton = document.getElementById('take5ShurikenButton'),
		take100ShurikenButton = document.getElementById('take100ShurikenButton'),
		throwShurikenButton = document.getElementById('throwShurikenButton'),
		goBackButton = document.getElementById('goBackButton'),
		usedShurikens = document.getElementById('usedShurikens');

		shurikenBelt = document.getElementById('shurikenBelt'),

		main = document.getElementById('main');

		allShurikens = [],
		usedShurikensCount = 0;

	function takeShurikens(count) {
		if(window.localStorage) {
			window.localStorage['usedShurikens'] = window.localStorage['usedShurikens'] || 0;

			var currentShurikenNumber = +window.localStorage['usedShurikens'] + count;
			window.localStorage['usedShurikens'] = currentShurikenNumber;

			while(count > 0) {
				var newTr = document.createElement('tr'),
					newShuriken = document.createElement('td');
					newTr.appendChild(newShuriken);

				newShuriken.className = 'shuriken';
				newShuriken.innerText = 'Shuriken no. ' + (currentShurikenNumber - count);

				shurikenBelt.appendChild(newTr);
				allShurikens.push(newShuriken);
				count--;
			}
		}
	}

	function throwShuriken() {
		main.className = 'throwing';
	}

	function goBack() {
		main.className = '';
	}

	if(window.localStorage) {
		usedShurikensCount = window.localStorage['usedShurikens'] = window.localStorage['usedShurikens'] || 0;
	}
	usedShurikens.innerText = usedShurikensCount;

	takeShurikenButton.addEventListener('click', function() { takeShurikens(1); });
	take5ShurikenButton.addEventListener('click', function() { takeShurikens(5); });
	take100ShurikenButton.addEventListener('click', function() { takeShurikens(100); });

	throwShurikenButton.addEventListener('click', throwShuriken);
	goBackButton.addEventListener('click', goBack);

})();