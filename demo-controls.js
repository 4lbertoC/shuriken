(function() {
	// Controls for the messages
	var messageArray = [
			'Hi Alberto,\n\nA few requests:\n' +
			'- Add FAQ to menu\n' +
			'- Make the menu text red when mouse is over it\n' +
			'- Belt is ugly, make it more ninja\n\n' +

			'Thanks,\n' +
			'Boss',

			'Hi Alberto,\n\n' +

			'Menu is not responsive.\n' +
			'Remember: mobile first.\n' +
			'Also make sure that the orientation trick works.\n\n' +

			'Thanks,\n' +
			'Boss',

			'Hi Alberto,\n\n' +

			'I am disappoint.\n' +
			'Why take only 1 shurikens?\n' +
			'Take 100.\n\n' +

			'Thanks,\n' +
			'Boss',

			'Hi Alberto,\n\n' +

			'Shurikens are slow.\n' +
			'They don\'t kill.\n' +
			'Make them fast.\n\n' +

			'Thanks,\n' +
			'Boss',

			'Hi Alberto,\n\n' +

			'Shurikens are fast, but now browser dies if I throw too many.\n' +
			'What\'s going on?\n\n' +

			'Thanks,\n' +
			'Boss',

			'Hi Alberto,\n\n' +

			'"About" popup does not work.\n' +
			'What\'s wrong?\n\n' +

			'Thanks,\n' +
			'Boss'
		],
		newMessages = document.getElementById('messages'),
		step = +window.localStorage['step'] || 0,
		popup = document.getElementById('popup'),
		popupData = document.getElementById('popupData');

	document.body.addEventListener('keyup', function(e) {
		if(e.keyCode === 70 && e.altKey && popup.style.display !== 'block' && step < messageArray.length) {
			newMessages.style.display = 'block';
		}
		if(e.keyCode === 68) {
		window.localStorage['step'] = step = step - 1;
		}
		if(e.keyCode === 71) {
		window.localStorage['step'] = step = step + 1;
		}
		if(e.keyCode === 82) {
		window.localStorage['step'] = step = 0;
		}
	});
	newMessages.addEventListener('click', function() {
		newMessages.style.display = 'none';
		popup.style.display = 'block';
		popupData.innerText = messageArray[step];
	});
	document.getElementById('close').addEventListener('click', function() {
		popup.style.display = 'none';
		window.localStorage['step'] = step = step + 1;
	});
})();