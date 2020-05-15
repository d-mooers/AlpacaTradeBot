/*import {createClient} from 'client';
import {marketBuy} from 'makeTrade'; */
const Alpaca = require('@alpacahq/alpaca-trade-api')

function instantiateAlpaca() {
    const alpaca = new Alpaca({
        paper: true,
    });
    alpaca.getAccount().then((account) => {
        console.log('Current Account: ', account)
    });

    return alpaca;
}

async function marketBuy(symbol, qty, alpaca) {
    try {
        await alpaca.createOrder({
            symbol: symbol,
            qty: qty,
            side: 'buy',
            type: 'market',
            time_in_force: 'day'
        }).then((order) => {
            console.log('Market buy executed: ')
        });
    }
    catch (err) {
        console.log("Market buy failed: ", err);
    }
}

function createClient(alpaca) {
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
        console.log('Stock trades: ' + subject + 'price: ' + data.price);
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

async function main() {
    alpaca = await instantiateAlpaca();
    await alpaca.
    client = await createClient(alpaca);
    let tickers = ['SPY', 'TSLA', 'BA', 'MSFT', 'AAPL']
    for (ticker in tickers) 
        marketBuy(tickers[ticker], 1, alpaca);
    return 0;
}

console.log(main());