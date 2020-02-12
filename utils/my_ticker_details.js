let tickers = require("../constants/tickers");
const fetch = require("node-fetch");

function rateCalculator(price, prevClose) {
  rate = ((price - prevClose) / prevClose) * 100;
  rate = parseFloat(rate.toFixed(2));

  return rate;
}

async function get_my_stocks() {
  let url = "http://34.67.211.44/api/stock";
  let result;

  await fetch(url).then(res => (result = res.json()));

  return result;
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

async function my_ticker_details() {
  let result = [];
  let stockNames = [];
  let stocks_targets;
  let stock_names;

  await get_my_stocks(stock_names).then(res => (stocks_targets = res));

  stocks_targets.forEach(datum => {
    stockNames.push(datum["name"]);
  });

  stockNames.sort();
  stock_names = stockNames.toString();

  let stocks_data;

  await get_current_tickers_data(stock_names).then(res => (stocks_data = res));

  stocks_data.forEach(data_dict => {
    const stock_name = data_dict["symbol"];

    stocks_targets.forEach(target_dict => {
      if (stock_name === target_dict["name"]) {
        let price = data_dict["regularMarketPrice"];
        let prevClose = data_dict["regularMarketPreviousClose"];

        let rate = rateCalculator(price, prevClose);

        stock_dict = {
          stockName: stock_name,
          price: data_dict["regularMarketPrice"],
          shortName: data_dict["shortName"],
          dayRange: data_dict["regularMarketDayRange"],
          rate: rate
        };

        result.push(stock_dict);
      }
    });
  });
  return result;
}

module.exports = my_ticker_details;
