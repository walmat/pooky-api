import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const config = (environment = process.env.NODE_ENV) => {
  const file = environment === 'development' ? '.env.dev' : '.env';
  const envPath = path.resolve(__dirname, '..', file);
  const parsedEnv = dotenv.parse(fs.readFileSync(envPath));
  Object.keys(parsedEnv).forEach(k => {
    process.env[k] = parsedEnv[k];
  });
};

export default config;
