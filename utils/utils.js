const fetch = require("node-fetch");

async function get_single_stock_target(stockName) {
  let QUERY_URL = "https://teknodeneyim.com/stocks/single/" + stockName;

  let res = await fetch(QUERY_URL);
  res = await res.json();

  if (res === null) {
    return {};
  }

  return res;
}

async function get_current_tickers_data(stockName) {
  let QUERY_URL =
    "https://query1.finance.yahoo.com/v7/finance/quote?symbols=" + stockName;

  let res = await fetch(QUERY_URL);
  res = await res.json();
  res = await res["quoteResponse"]["result"];

  if (res === null) {
    return {};
  }

  return res;
}

async function get_single_stock_special_data(stockName) {
  let QUERY_URL = "http://34.67.211.44/api/ticker/single-ticker";

  let res = await fetch(QUERY_URL, {
    method: "post",
    body: JSON.stringify({ name: stockName }),
    headers: { "Content-Type": "application/json" }
  });
  res = await res.json();

  if (res === null) {
    return {};
  }

  return res;
}

module.exports = {
  get_single_stock_target,
  get_current_tickers_data,
  get_single_stock_special_data
};
