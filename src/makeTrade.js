const Alpaca = require('@alpacahq/alpaca-trade-api')

export function marketBuy(symbol, qty, alpaca) {
    alpaca.createOrder(
        symbol,
        qty,
        'buy',
        'market',
        'day'
    ).then((order) => {
        console.log('Market buy executed: ', order)
    });
}