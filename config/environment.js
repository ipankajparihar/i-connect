const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});

const development = {
  name: "development",
  assets_path: "./assets",
  session_cookie_key: "2nv6KZBkZxM4jbJA5vjh2NP6erNzDX5q",
  db: "i_connect",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "pankajsinghparihar211@gmail.com",
      pass: "crfg worn lgak jgfy",
    },
  },
  google_client_id:
    "119894049086-pigpqdi2mkb62eaf83qiopltdn8a6sd8.apps.googleusercontent.com",
  google_client_secret: "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",
  google_callback_url: "http://localhost:8000/users/auth/google/callback",
  jwt_secret_key: "codeial",
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};

const production = {
  name: process.env.ICONNECT_ENVIRONMENT,
  assets_path: process.env.ICONNECT_ASSET_PATH,
  session_cookie_key: process.env.ICONNECT_SESSION_COOKIE_KEY,
  db: process.env.ICONNECT_DB,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.ICONNECT_GMAIL_USER,
      pass: process.env.ICONNECT_GMAIL_PASSWORD,
    },
  },
  google_client_id: process.env.ICONNECT_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.ICONNECT_GOOGLE_CLIENT_SECRET,
  google_callback_url: process.env.ICONNECT_GOOGLE_CALLBACK_URL,
  jwt_secret_key: process.env.ICONNECT_JWT_SECRET_KEY,
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

module.exports =
  eval(process.env.ICONNECT_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.ICONNECT_ENVIRONMENT);
