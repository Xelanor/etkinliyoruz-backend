const fetch = require("node-fetch");

async function get_single_stock_target(stockName) {
  let QUERY_URL = "http://34.67.211.44/api/stock/single/" + stockName;

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

async function get_stock_historic_data(stockName, data_scope) {
  let QUERY_URL = `https://query1.finance.yahoo.com/v7/finance/chart/${stockName}?range=${data_scope +
    30}d&interval=1d&indicators=quote&includeTimestamps=false`;

  let res = await fetch(QUERY_URL);
  res = await res.json();
  res = await res["chart"]["result"][0]["indicators"]["quote"][0]["close"];

  for (let i = 0; i < res.length; i++) {
    if (res[i] === null) {
      res[i] = res[i - 1];
    }
  }

  return res;
}

async function get_stock_intraday_data(stockName) {
  let QUERY_URL = `https://query1.finance.yahoo.com/v7/finance/chart/${stockName}?range=1d&interval=5m&includeTimestamps=false`;

  let res = await fetch(QUERY_URL);
  res = await res.json();
  res = await res["chart"]["result"][0]["indicators"]["quote"][0]["close"];

  for (let i = 0; i < res.length; i++) {
    if (res[i] === null) {
      res[i] = res[i - 1];
    }
  }

  return res;
}

async function get_non_stock_historic_data(stockName, data_scope) {
  let QUERY_URL = `https://query1.finance.yahoo.com/v7/finance/chart/${stockName}?range=${data_scope +
    30}d&interval=1h&indicators=quote&includeTimestamps=false`;

  let res = await fetch(QUERY_URL);
  res = await res.json();
  res = await res["chart"]["result"][0]["indicators"]["quote"][0]["close"];
  res = res.filter((_, i) => i % 8 == 0);

  for (let i = 0; i < res.length; i++) {
    if (res[i] === null) {
      res[i] = res[i - 1];
    }
  }

  return res;
}

function calculate_rsi_index(historic_data, data_scope) {
  historic_data = historic_data.slice(-1 * (data_scope + 14));
  let rsi_values = [];

  for (let i = 0; i < data_scope; i++) {
    let upmoves = [];
    let downmoves = [];
    let rsi_closes = historic_data.slice(i, i + 15);

    for (let i = 0; i < rsi_closes.length - 1; i++) {
      let diff = rsi_closes[i + 1] - rsi_closes[i];
      if (diff > 0) {
        upmoves.push(diff);
      } else if (diff < 0) {
        downmoves.push(diff * -1);
      }
    }

    let AvgU = upmoves.reduce((a, b) => a + b, 0) / 14;
    let AvgD = downmoves.reduce((a, b) => a + b, 0) / 14;
    let RS;

    try {
      RS = AvgU / AvgD;
    } catch {
      RS = 100;
    }

    RSI = 100 - 100 / (1 + RS);
    rsi_values.push(RSI);
  }

  return rsi_values;
}

function calculate_env_index(historic_data, data_scope) {
  historic_data = historic_data.slice(-1 * (data_scope + 20));
  let env_values = { upper: [], lower: [] };

  for (let i = 0; i < data_scope; i++) {
    try {
      let env_data = historic_data.slice(i, i + 21);

      let data_avg = env_data.reduce((a, b) => a + b, 0) / env_data.length;
      let upper = data_avg + data_avg * 0.025;
      let lower = data_avg - data_avg * 0.025;

      env_values.upper.push(upper);
      env_values.lower.push(lower);
    } catch {}
  }

  return env_values;
}

function calculate_ninja_index(historic_data, data_scope) {
  historic_data = historic_data.slice(-1 * (data_scope + 1));
  let prev = 0;
  let ninja_values = [];

  for (let i = 0; i < historic_data.length - 1; i++) {
    try {
      let current =
        (historic_data[i + 1] - historic_data[i]) / historic_data[i];

      if (current == 0) {
        ninja_values.push(prev);
      } else if ((current > 0 && prev > 0) || (current < 0 && prev < 0)) {
        current += prev;
        ninja_values.push(current);
      } else {
        ninja_values.push(current);
      }
      prev = current;
    } catch {}
  }

  return ninja_values;
}

function calculate_ninja_index_s(historic_data, data_scope) {
  historic_data = historic_data.slice(-1 * (data_scope + 1));
  let prev = 0;
  let ninja_values = [];

  for (let i = 0; i < historic_data.length - 1; i++) {
    try {
      let current =
        (historic_data[i + 1] - historic_data[i]) / historic_data[i];

      current += prev;
      ninja_values.push(current);
      prev = current;
    } catch {}
  }

  return ninja_values;
}

function calculate_triple_index(historic_data, data_scope) {
  first_data = historic_data.slice(-1 * (data_scope + 30));
  second_data = historic_data.slice(-1 * (data_scope + 14));
  third_data = historic_data.slice(-1 * (data_scope + 7));

  let triple_index_values = { first_list: [], second_list: [], third_list: [] };

  for (let i = 0; i < data_scope; i++) {
    try {
      let first_mean =
        first_data.slice(i, i + 30).reduce((a, b) => a + b, 0) /
        first_data.slice(i, i + 30).length;
      let second_mean =
        second_data.slice(i, i + 14).reduce((a, b) => a + b, 0) /
        second_data.slice(i, i + 14).length;
      let third_mean =
        third_data.slice(i, i + 7).reduce((a, b) => a + b, 0) /
        third_data.slice(i, i + 7).length;

      triple_index_values.first_list.push(first_mean);
      triple_index_values.second_list.push(second_mean);
      triple_index_values.third_list.push(third_mean);
    } catch {}
  }

  return triple_index_values;
}

module.exports = {
  get_single_stock_target,
  get_current_tickers_data,
  get_single_stock_special_data,
  get_non_stock_historic_data,
  get_stock_historic_data,
  calculate_rsi_index,
  calculate_env_index,
  calculate_ninja_index,
  calculate_ninja_index_s,
  calculate_triple_index,
  get_stock_intraday_data
};
