require('dotenv').config();

const ENV = (name: string, defaultValue: string | null = null): string => {
  let value = process.env[name];
  if (value && value.length > 0) {
    return value;
  }
  if (defaultValue) {
    return defaultValue;
  }

  throw new Error(`Environment variable ${name} is required!`);
}

export default {
  port: ENV('PORT', '3000'),
  consumer_key: ENV('CUSTOMER_KEY'),
  consumer_secret: ENV('CUSTOMER_SECRET'),
  access_token: ENV('ACCESS_TOKEN'),
  access_token_secret: ENV('ACCESS_TOKEN_SECRET'),
};
