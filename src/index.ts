import {RunOverSources} from "./twitter";
import {Delay} from "./helpers";

const Worker = async (): Promise<void> => {
  await Delay(5000);
  console.log('STARTING TWITTER SYNC');
  try {
    await RunOverSources();
  } catch (e) {
  }

  await Delay(20000);
  return Worker();
};

Worker();
