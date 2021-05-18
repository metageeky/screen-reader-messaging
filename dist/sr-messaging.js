var ScreenReaderMessenger = (function() {
	var singleton;
 
	function createMessenger() {
		let srm = new Object();
		srm.globalTimer = null;
		srm.speakRegion = createSpeakRegion(); //document.getElementById('speak');
		srm.sendMessage = function(msg) {
			if(srm.speakRegion === null) {
				srm.speakRegion = createSpeakRegion(msg + ' at create');
			}
			//reset the global timer
			srm.globalTimer = clearTimeout(srm.globalTimer); 
			//clear the live region's value
			if(srm.speakRegion.innerText .length != 0)
				srm.speakRegion.innerText = '';
			//add text in.
			srm.speakRegion.innerText = msg
			//and remove after 5 seconds
			srm.globalTimer = setTimeout(()=> {
				console.log('clearing');
				srm.speakRegion.innerText = '';
			},5000);
		};
		
		return srm;
	}
	
	function createSpeakRegion(msg = '') {
		let e = document.createElement('DIV');
		e.style.cssText = 'position: absolute !important; clip: rect(1px, 1px, 1px, 1px) !important; padding: 0 !important; border: 0 !important; height: 1px !important; width: 1px !important; overflow: hidden !important;'
		e.setAttribute('aria-live','polite');
		e.setAttribute('aria-atomic','true');
		e.innerText = msg;
		document.body.appendChild(e);
		return e;
	}

	return {
		getMessenger: function() {
			if (!singleton) {
				singleton = createMessenger();
			}
			return singleton;
		}
	};
})();

window.onload = function() {
	// initiate the messenger
	let srm = ScreenReaderMessenger.getMessenger();
	
	
	document.getElementById('speak-trigger').addEventListener('click', function(evt) {
		let d = new Date();
		let srm = ScreenReaderMessenger.getMessenger();
		let x = d.getSeconds();
		console.log(x);
		srm.sendMessage('Seconds are ' + x);
	})
}