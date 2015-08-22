/** 
 *  @constructor
 *  @extends Floatable
 */
function Block(height, numTransactions, totalGas, blockSize) {
	if (document.visibilityState === "visible") {
		Floatable.call(this);

		var gasEth = Math.floor(totalGas / wei) + " ETH";
		var blockSizeKB = blockSize + " bytes";

		this.width = this.height = 250;

		this.addImage(blockImage, this.width, this.height);
		this.addText("Block #" + height + "<br />Number of Transactions: " + numTransactions + "<br />Total Gas: " + gasEth + "<br />Block Size: " + blockSizeKB);
		this.initPosition();
	}
	
	// Sound
	Sound.playRandomSwell();
}

extend(Floatable, Block);
