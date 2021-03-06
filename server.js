const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useCreateIndex: true })
  .catch(err => {
    console.log(err);
  });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const eventsRouter = require("./routes/events");
const locationsRouter = require("./routes/locations");
const tickerRouter = require("./routes/tickers");
const transactionRouter = require("./routes/transactions");
const changesRouter = require("./routes/changes");
const stocksRouter = require("./routes/stocks");

app.use("/api", eventsRouter);
app.use("/api/location", locationsRouter);
app.use("/api/ticker", tickerRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/change", changesRouter);
app.use("/api/stock", stocksRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
