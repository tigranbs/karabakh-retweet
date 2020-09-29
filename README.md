# About

This project is made to get only trusted sources of twitter information and retweet them with a trending hash tags
related to that topic. Specifically with a current Karabakh war with Azerbaijan.

You can find the list of Twitter accounts here [src/sources.ts](https://github.com/tigranbs/karabakh-retweet/blob/master/src/sources.ts).

# Contributing

If we need another Twitter source to be added here, OR you need some changes on this, just open a PR and describe a bit
why you need that changes. It is most likely that Twitter will start blocking this kind of activities, BUT if you want to
run this service yourself just follow instructions below.

# Running

This is very simple codebase and no specific knowledge of deployment needed. Just make a basic npm installation and
start a server

```bash
npm install # OR yarn

npm run build # To complie TypeScript

npm run daemon:start # Start server in background mode

# If you are making development, just run a start script
npm start
```

## Before running add `.env`

Before running this process make sure you have this variables in your environments defined, otherwise it wouldn't run.

```bash
CUSTOMER_KEY="..."
CUSTOMER_SECRET="..."
ACCESS_TOKEN="..."
ACCESS_TOKEN_SECRET="..."
```

### Logging

Currently, I used a basic console.log so no need of any other logging things other than watching on terminal outputs.
For that there is an NPM script

```bash
npm run daemon:logs
```

# Special notes

This retweet process can block your twitter account, so make sure to increase timeouts and keep process for a very long-running server or computer.
