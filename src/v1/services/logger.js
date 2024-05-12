import morgan, { token } from "morgan";
import chalk from "chalk";

import winston, { transports } from "winston";

// Define custom tokens
token("method", (req, res) => {
  const method = req.method;
  switch (method) {
    case "GET":
      return chalk.blue(method);
    case "POST":
      return chalk.green(method);
    case "PUT":
      return chalk.yellow(method);
    case "DELETE":
      return chalk.red(method);
    default:
      return chalk.magenta(method);
  }
});

token("status", (req, res) => {
  const status = res.statusCode;
  if (status >= 500) {
    return chalk.red(status);
  } else if (status >= 400) {
    return chalk.yellow(status);
  } else if (status >= 300) {
    return chalk.cyan(status);
  } else {
    return chalk.green(status);
  }
});

token("url", (req, res) => {
  return chalk.bold(req.headers.host + req.originalUrl);
});

// Define a custom format using the tokens
export const httpLogger = morgan(function (tokens, req, res) {
  if (tokens["user-agent"] === undefined) {
    return;
  }
  return [
    "*****************************",
    "____________ LOG ____________",
    "*****************************",
    chalk.bold(`Method: ${tokens.method(req, res)}`),
    chalk.underline(`URL: ${tokens.url(req, res)}`),
    `Status: ${chalk.bold(tokens.status(req, res))}`,
    `Content-Length: ${res["content-length"]}`,
    `Response Time: ${chalk.gray(tokens["response-time"](req, res) + "ms")}`,
    `Date: ${tokens.date(req, res)}`,
    `HTTP Version: ${tokens["http-version"](req, res)}`,
    `Remote Address: ${tokens["remote-addr"](req, res)}`,
    `User-Agent: ${tokens["user-agent"](req, res)}`,
  ].join("\n");
});

// Winston configuration
export const winstonLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf((info) => `${info.message}`)
  ),
  transports: [
    new transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    // new winston.transports.File({ filename: "combined.log" }),
  ],
});
