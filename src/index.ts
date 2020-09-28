import express from "express";
import Twit from "twit";
import config from "./config";
import {RunOverSources} from "./twitter";
import {Delay} from "./helpers";

const app = express();


app.get('/', async (req, res) => {
  await RunOverSources();
  res.json({});
});

const Worker = async (): Promise<void> => {
  try {
    await RunOverSources();
  } catch (e) {
  }

  await Delay(20000);
  return Worker();
};


app.listen(config.port, () => {
  Worker();
  console.log(`SERVER RUNNING 🚀 PORT: ${config.port}`);
});
