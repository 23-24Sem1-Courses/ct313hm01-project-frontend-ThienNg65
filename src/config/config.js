/* eslint-disable no-undef */
import dotenv from 'dotenv';

dotenv.config();

const SERVER_BASE_URL = process.env.SERVER_HOSTNAME || 'http://localhost:3000/';
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 36000;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'coolIssuer';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'superencryptedsecret';

const SERVER = {
  baseUrl: SERVER_BASE_URL,
  token: {
    expireTime: SERVER_TOKEN_EXPIRETIME,
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET
  }
};

const STRIPE = {
  public: process.env.STRIPE_PUBLIC_KEY || '',
  secret: process.env.STRIPE_SECRET_KEY || ''
};

const CLIENT = {
  baseUrl: process.env.CLIENT_BASE_URL || ''
};

const config = {
  server: SERVER,
  payment: STRIPE,
  client: CLIENT
};

export default config;
