let tickers = require("../constants/tickers");
const fetch = require("node-fetch");

function rateCalculator(price, prevClose) {
  rate = ((price - prevClose) / prevClose) * 100;
  rate = parseFloat(rate.toFixed(2));

  return rate;
}

async function get_current_tickers_data(stockName) {
  let url =
    "https://query1.finance.yahoo.com/v7/finance/quote?symbols=" + stockName;
  let result;
  await fetch(url)
    .then(res => res.json())
    .then(json => (result = json["quoteResponse"]["result"]));

  return result;
}

async function fetch_all_stocks() {
  let result = [];
  let stock_names = tickers.toString();
  let stocks_data;
  let negative = 0;
  let total = 0;

  await get_current_tickers_data(stock_names).then(res => (stocks_data = res));

  stocks_data.forEach(data_dict => {
    const price = data_dict["regularMarketPrice"];
    const prevClose = data_dict["regularMarketPreviousClose"];
    let rate = rateCalculator(price, prevClose);

    rate < 0 ? (negative += 1) : 0;
    total += 1;
    try {
      let stock_name = data_dict["symbol"];

      let stock_dict = {
        stockName: stock_name,
        price: price,
        shortName: data_dict["shortName"],
        dayRange: data_dict["regularMarketDayRange"],
        rate: rate
      };

      result.push(stock_dict);
    } catch {}
  });

  result.push(negative);
  result.push(total);
  return result;
}

module.exports = fetch_all_stocks;
