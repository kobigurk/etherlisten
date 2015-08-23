/** 
 *  @constructor
 *  @extends Floatable
 */
function Transaction(bitcoins, highlight, hash, to, isContract, gas, currency, currencyName) {
	if (document.visibilityState === "visible") {
		Floatable.call(this);

		this.area = bitcoins * 20 + 3400;
		this.width = this.height = Math.sqrt(this.area / Math.PI) * 2;

		this.addImage(bubbleImage, this.width, this.height, hash);
//		this.addImage(bubbleImage, this.width, this.height);

	
		var bitcoinString = "&Xi;" + bitcoins.toFixed(2);
	
		if (bitcoinString == "&Xi;0.00")
            bitcoinString = "<&Xi;0.01";

        this.div.style.zIndex = 10;
	
		if (highlight) {
			this.addText('<span style="color: yellow;">' + bitcoinString + '</span><br /><span style="color: cyan;">Donation</span><br /><span style="color: lime;">Thanks!</span>');
		} else if (to === null) {
			this.addText('<span style="color: yellow;">' + bitcoinString + '</span><br /><span style="color: cyan;">Contract</span>');
        } else if (isContract) {
			this.addText('<span style="color: yellow;">' + bitcoinString + '</span><br /><span style="color: cyan;">Function</span>');
        } else {
			this.addText(bitcoinString);
		}
		if (currency && currencyName) {
			this.addText('<br />' + currency.toFixed(2) + ' ' + currencyName);
		}
  //      this.addText('<br />Gas: ' + gas);
		this.initPosition();
	}

	// Sound
	var maxBitcoins = 1000;
	var minVolume = 0.3;
	var maxVolume = 0.7;
	var volume = bitcoins / (maxBitcoins / (maxVolume - minVolume)) + minVolume;
	if (volume > maxVolume)
		volume = maxVolume;
	
	var maxPitch = 100.0;
	// We need to use a log that makes it so that maxBitcoins reaches the maximum pitch.
	// Well, the opposite of the maximum pitch. Anyway. So we solve:
	// maxPitch = log(maxBitcoins + logUsed) / log(logUsed)
	// For maxPitch = 100 (for 100%) and maxBitcoins = 1000, that gives us...
	var logUsed = 1.0715307808111486871978099;
	// So we find the smallest value between log(bitcoins + logUsed) / log(logUsed) and our max pitch...
	var pitch = Math.min(maxPitch, Math.log(bitcoins + logUsed) / Math.log(logUsed));
	// ...we invert it so that a bigger transaction = a deeper noise...
	pitch = maxPitch - pitch;
	// ...and we play the sound!
	if(globalScalePitch) {
		Sound.playPitchAtVolume(volume, pitch);
	} else {
		Sound.playRandomAtVolume(volume);
	}
}

extend(Floatable, Transaction);
