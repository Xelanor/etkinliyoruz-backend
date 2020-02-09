const fetch = require("node-fetch");
const utils = require("./utils");

const data_scope = 90;
const non_stocks = ["XU100.IS", "GC=F"];

single_ticker_details = async stockName => {
  let stock_target = await utils.get_single_stock_target(stockName);
  let daily_data = await utils.get_current_tickers_data(stockName);
  let special_data = await utils.get_single_stock_special_data(stockName);

  if (non_stocks) {
  }
};

single_ticker_details("THYAO.IS");
