const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const collections = require("./utils")

const app = express();

// MIDDLEWARES
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// SETTINGS
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

app.get("/api/v1/:collName", async (req, res, next) => {
  try {
      const coll = req.params.collName;
      const result = await collections(coll);
      res.send({data: result});
  } catch (error) {
      return next(error);
  }
});

// SERVER
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
