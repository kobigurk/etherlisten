/** 
 *  @constructor
 *  @extends Floatable
 */
function Block(height, numTransactions, totalGas, blockSize) {
	if (document.visibilityState === "visible") {
		Floatable.call(this);

		var gasEth = totalGas;
		var blockSizeKB = blockSize + " bytes";

		this.width = 250;
        this.height = 1270/794 * this.width;

		this.addImage(blockImage, this.width, this.height, 'block', height);
        this.div.style.zIndex = 10;
		this.addText("Block #" + height + "<br />Number of Transactions: " + numTransactions + "<br />Total Gas: " + gasEth + "<br />Block Size: " + blockSizeKB);
		this.initPosition();
	}
	
	// Sound
	Sound.playRandomSwell();
}

extend(Floatable, Block);
