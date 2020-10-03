import Twit from "twit";
import config from "./config";
import {Delay} from "./helpers";
import { USERNAMES } from "./sources";

interface BasicTweet {
  id: string;
  username: string;
}

const T = new Twit({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token: config.access_token,
  access_token_secret: config.access_token_secret,
  timeout_ms: 60*1000,
  strictSSL: true,
});

export async function TweetsToRetweet(username: string): Promise<BasicTweet[]> {
  console.log('FETCHING TWEETS FOR USER -> ', username);
  const result = await T.get(`statuses/user_timeline`, {screen_name: username, count: 5});
  if (!result.data || !(result.data instanceof Array)) {
    console.log('WRONG RESPONSE: ', result.data);
    return [];
  }

  console.log('GOT  -> ', result.data.length, ' TWEETS FROM USER ->', username);
  return result.data.filter(tweet => !tweet.retweeted).map(tweet => ({id: tweet.id_str, username}));
}

export async function Retweet(tweet: BasicTweet) {
  console.log('RETWEETING -> ', tweet.id, ' ', tweet.username);
  try {
    await T.post('statuses/update', {
      status: `#Artsakh #Artsakhstrong #Armenia #StopAzerbaijaniAgression`,
      attachment_url: `https://twitter.com/${tweet.username}/status/${tweet.id}`
    });
  } catch (e) {
    console.log('FAILED To RETWEET -> ', e.message);
  }
  console.log('DONE RETWEETING -> ', tweet.id, ' ', tweet.username, '!!');
}

export async function RetweetWithDelay(tweets: BasicTweet[]) {
  for (const tweet of tweets) {
    await Delay(2 * 60000);
    await Retweet(tweet);
  }
}

export async function PickRandomSource() {
  try {
    const username = USERNAMES[Math.floor(Math.random() * USERNAMES.length)];
    await RetweetWithDelay(await TweetsToRetweet(username));
  } catch (e) {
    console.log('FAILED TO GET TWEETS AND RETWEET!!', e);
  }
}


export async function RunOverSources() {
  const randomizedUsernames = USERNAMES.sort(() => .5 - Math.random());
  for (const username of randomizedUsernames) {
    await Delay(15000);
    try {
      await RetweetWithDelay(await TweetsToRetweet(username));
    } catch (e) {
      console.log('FAILED TO GET TWEETS AND RETWEET!!', e);
    }
  }
}
