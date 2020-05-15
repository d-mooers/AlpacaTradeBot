const Alpaca = require('@alpacahq/alpaca-trade-api')


export function createClient(alpaca) {
    const client = alpaca.websocket;
    client.onConnect(function() {
        console.log("Connected");
        client.subscribe(['alpacadatav1/T.FB', 'alpacadatav1/Q.AAPL', 'alpacadatav1/AM.GOOG']);
    })
    client.onDisconnect(() => {
        console.log("Disconnected");
    });
    client.onStateChange(newState => {
        console.log('State changed to ${newState}');
    });
    client.onStockTrades(function(subject, data) {
        console.log('Stock trades: ${subject}, price: ${data.price}');
    });
    client.onStockQuotes(function(subject, data) {
        console.log('Stock quotes: ${subject}, bid: ${data.bidprice}, ask: ${data.askprice}');
    });
    client.onStockAggSec(function(subject, data) {
        console.log("Stock agg sec: ${subject}, ${data}");
    });
    client.onStockAggMin(function(subject, data) {
        console.log("Stock agg min: ${subject}, ${data}");
    });
    client.connect();
    return client;
}