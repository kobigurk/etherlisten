var wei = 1000000000000000000;

var DELAY_CAP = 1000;

var lastBlockHeight = 0;

/** @constructor */
function TransactionSocket() {

}

TransactionSocket.init = function() {
	// Terminate previous connection, if any
	if (TransactionSocket.connection)
		TransactionSocket.connection.close();

	if ('WebSocket' in window) {

		var connection = new ReconnectingWebSocket('ws://listen.etherlisten.com:8546');
//		var connection = new ReconnectingWebSocket('ws://127.0.0.1:8085');
		TransactionSocket.connection = connection;

		StatusBox.reconnecting("blockchain");

		connection.onopen = function() {
			console.log('etherlisten-websocket: Connection open!');
			StatusBox.connected("blockchain");
            connection.send(JSON.stringify({"id": 1, "method": "eth_subscribe", "params": ["newBlocks", {"includeTransactions": true, "transactionDetails": false}]}));
            connection.send(JSON.stringify({"id": 2, "method": "eth_subscribe", "params": ["newPendingTransactions"]}));
			/*
			var newTransactions = {
				"subscribe" : "transactions"
			};
			var newBlocks = {
				"subscribe" : "blocks"
			};
			connection.send(JSON.stringify(newTransactions));
			connection.send(JSON.stringify(newBlocks));
			connection.send(JSON.stringify({
				"fetch" : "latest_transaction"
			}));
			// Display the latest transaction so the user sees something.
			*/
		};

		connection.onclose = function() { console.log('etherlisten-websocket: Connection closed'); if ($("#blockchainCheckBox").prop("checked"))
				StatusBox.reconnecting("blockchain");
			else
				StatusBox.closed("blockchain");
		};

		connection.onerror = function(error) {
			console.log('etherlisten-websocket: Connection Error: ' + JSON.stringify(error));
		};

        var blockFilterId;
        var txFilterId;
        var i = 0;
		connection.onmessage = function(e) {
			var response = JSON.parse(e.data);
            if (response.id == 1) {
                blockFilterId = response.result;
                return;
            }
            if (response.id == 2) {
                txFilterId = response.result;
                return;
            }
            i = 3 + (i++) % 30000;
            if (response.id > 2) {
                var transaction = response.result;
				var transacted = parseInt(transaction.value);

				var donation = false;
                var soundDonation = false;
				var to = transaction.to;
                var ethers = transacted / wei;
                var hash = transaction.hash;
                var isContract = transaction.input != '0x';
                var gas = parseInt(transaction.gas);
                if (to == '0xeeeabc403337a8b7605a98a29cbac279199a7562') {
                    new Transaction(ethers, true, hash, to, isContract, gas);
                } else if (to == '0xbb9bc244d798123fde783fcc1c72d3bb8c189413') {
                    //TheDAO
                    if (transaction.input.indexOf('0xa9059cbb') === 0) {
                        ethers = parseInt(transaction.input.slice(74), 16) / 10000000000000000;
                    }
                    new Transaction(ethers, false, hash, to, isContract, gas, null, null, true);
                } else {
                    setTimeout(function() {
                        new Transaction(ethers, false, hash, to, isContract, gas);
                    }, Math.random() * DELAY_CAP);
                }
                return;
            }
            if (response.params.subscription == blockFilterId) {
				var blockHeight = parseInt(response.params.result.number);
				var transactions = response.params.result.transactions.length;
				var volumeSent = parseInt(response.params.result.gasUsed);
				var blockSize = parseInt(response.params.result.size);
				// Filter out the orphaned blocks.
				if (blockHeight > lastBlockHeight) {
					lastBlockHeight = blockHeight;
					console.log("New Block");
					new Block(blockHeight, transactions, volumeSent, blockSize);
				}
            }
            if (response.params.subscription == txFilterId) {
                var txHash = response.params.result;
                connection.send(JSON.stringify({"id": i, "method": "eth_getTransactionByHash", "params": [txHash]}));
            }

		};
	} else {
		//WebSockets are not supported.
		console.log("No websocket support.");
		StatusBox.nosupport("blockchain");
	}
};

TransactionSocket.close = function() {
	if (TransactionSocket.connection)
		TransactionSocket.connection.close();
	StatusBox.closed("blockchain");
};

/** @constructor */
function TradeSocket() {

}

TradeSocket.init = function() {
	var channel_id = "dbf1dee9-4f2e-4a08-8cb7-748919a71b21"; // Channel id for BTC trades

	// Terminate previous connection, if any
	if (TradeSocket.connection)
		TradeSocket.connection.close();
		
	var connection = PUBNUB.init({
        publish_key   : 'demo',
        subscribe_key : 'sub-c-50d56e1e-2fd9-11e3-a041-02ee2ddab7fe',
		ssl : true
    });
	TradeSocket.connection = connection;
	
	connection.close = function() {
		connection.unsubscribe({channel : channel_id});
		connection.onclose();
	};

	connection.onmessage = function(message) {
		//console.log(message);
			if (message.trade) {
				//console.log("Trade: " + message.trade.amount_int / satoshi + " BTC | " + (message.trade.price * message.trade.amount_int / satoshi) + " " + message.trade.price_currency);
				// 0.57 BTC | 42.75 USD

				var bitcoins = message.trade.amount_int / wei;
				var currency = (message.trade.price * message.trade.amount_int / wei);
				var currencyName = message.trade.price_currency;
				
				setTimeout(function() {
					//new Transaction(bitcoins, false, currency, currencyName);
				}, Math.random() * DELAY_CAP);
			}
	};
	
	connection.onopen = function() {
			console.log('Mt.Gox: Connection open!');
			StatusBox.connected("mtgox");
	};
		
	connection.onclose = function() {
		console.log('Mt.Gox: Connection closed');
		if ($("#mtgoxCheckBox").prop("checked"))
			StatusBox.reconnecting("mtgox");
		else
			StatusBox.closed("mtgox");
	};

	connection.subscribe({
        channel : channel_id,
        message : connection.onmessage,
        connect : connection.onopen,
		disconnect : connection.onclose,
		reconnect : connection.onopen
    });
};

TradeSocket.close = function() {
	if (TradeSocket.connection)
		TradeSocket.connection.close();
	StatusBox.closed("mtgox");
};
