require("dotenv").config();
const express = require("express");
const errorMiddleware = require("./app/middlewares/error");
const cors = require("cors");
const router = require("./app/routes");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(`/api`, router);
app.use(errorMiddleware);

app.listen(port, (err) => {
  if (err) {
    throw new Error("There is an error");
  }

  console.log(`Listening on ${port}`);
});
