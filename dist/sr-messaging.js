var ScreenReaderMessenger = (function() {
	var singleton;
 
	function createMessenger() {
		let srm = new Object();
		srm.globalTimer = null;
		srm.speakRegion = null;
		srm.sendMessage = function(msg) {
			if(srm.speakRegion === null) {
				srm.speakRegion = createSpeakRegion();
			}
			//reset the global timer
			srm.globalTimer = clearTimeout(srm.globalTimer); 
			//clear the live region's value
			srm.speakRegion.innerText = '';
			//add text in.
			srm.speakRegion.innerText = msg
			//and remove after 5 seconds
			srm.globalTimer = setTimeout(()=> {
				srm.speakRegion.innerText = '';
			},5000);
		};
		
		return srm;
	}
	
	function createSpeakRegion() {
		let e = document.createElement('DIV');
		e.style.cssText = 'position: absolute !important; clip: rect(1px, 1px, 1px, 1px) !important; padding: 0 !important; border: 0 !important; height: 1px !important; width: 1px !important; overflow: hidden !important;'
		e.setAttribute('aria-live','polite');
		e.setAttribute('aria-atomic','true');
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
	document.getElementById('speak-trigger').addEventListener('click', function(evt) {
		let d = new Date();
		let srm = ScreenReaderMessenger.getMessenger();
		srm.sendMessage('Seconds are ' + d.getSeconds());
	})
}