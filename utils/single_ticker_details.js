const fetch = require("node-fetch");
const utils = require("./utils");

const data_scope = 90;
const non_stocks = ["XU100.IS", "GC=F"];

single_ticker_details = async stockName => {
  let stock_target = await utils.get_single_stock_target(stockName);
  let daily_data = await utils.get_current_tickers_data(stockName);
  let special_data = await utils.get_single_stock_special_data(stockName);
  let intraday_values = await utils.get_stock_intraday_data(stockName);
  let historic_data;
  let rsi_values;

  if (non_stocks.includes(stockName)) {
    historic_data = await utils.get_non_stock_historic_data(
      stockName,
      data_scope
    );
    rsi_values = [];
  } else {
    historic_data = await utils.get_stock_historic_data(stockName, data_scope);
    rsi_values = utils.calculate_rsi_index(historic_data, data_scope);
  }

  let all_news = [];
  let env_values = utils.calculate_env_index(historic_data, data_scope);
  let ninja_values = utils.calculate_ninja_index(historic_data, data_scope);
  let ninja_values_s = utils.calculate_ninja_index_s(historic_data, data_scope);
  let triple_index_values = utils.calculate_triple_index(
    historic_data,
    data_scope
  );

  daily_data = daily_data[0];

  let stock_details = {
    name: stockName,
    price: daily_data["regularMarketPrice"],
    shortName: daily_data["shortName"],
    open: daily_data["regularMarketOpen"],
    dayLow: daily_data["regularMarketDayLow"],
    volume: daily_data["regularMarketVolume"],
    dayHigh: daily_data["regularMarketDayHigh"],
    "50avg": daily_data["fiftyDayAverage"],
    "50avgChange": daily_data["fiftyDayAverageChange"],
    "50avgChangePerc": daily_data["fiftyDayAverageChangePercent"],
    "200avg": daily_data["twoHundredDayAverage"],
    "200avgChange": daily_data["twoHundredDayAverageChange"],
    "200avgChangePerc": daily_data["twoHundredDayAverageChangePercent"],
    dayRange: daily_data["regularMarketDayRange"],
    prevClose: daily_data["regularMarketPreviousClose"],
    "52wLow": daily_data["fiftyTwoWeekLow"],
    "52wHigh": daily_data["fiftyTwoWeekHigh"],
    sellTarget: "sellTarget" in stock_target ? stock_target["sellTarget"] : 0,
    buyTarget: "buyTarget" in stock_target ? stock_target["buyTarget"] : 0,
    prevSellTarget:
      "prevSellTarget" in stock_target ? stock_target["prevSellTarget"] : 0,
    prevBuyTarget:
      "prevBuyTarget" in stock_target ? stock_target["prevBuyTarget"] : 0,
    stateBuy: "stateBuy" in stock_target ? stock_target["stateBuy"] : false,
    stateSell: "stateSell" in stock_target ? stock_target["stateSell"] : false,
    intraday: intraday_values,
    rsi: rsi_values,
    env: env_values,
    ninja_index: ninja_values,
    ninja_index_s: ninja_values_s,
    triple_index: triple_index_values,
    closes: historic_data,
    news: all_news,
    fk: "fk" in special_data ? special_data["fk"] : 0,
    pd_dd: "pd_dd" in special_data ? special_data["pd_dd"] : 0
  };

  return stock_details;
};

module.exports = single_ticker_details;
