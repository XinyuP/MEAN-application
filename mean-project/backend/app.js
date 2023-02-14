// hold the express app -- still a node js server side app -- taking adantage of express features

const express = require("express");

const app = express();

// express app is just a big chain of middlewares we apply to the incoming requests
// like a funnel through which we send that express and every part of that funnel or in
// that funnel, we have different parts, and every part can do something with request.

app.use((req, res, next) => {
  console.log("heljdsjdsjdkjd");
  next();
}); //use a new middleware on our app and incoming request

app.use((req, res, next) => {
  res.send("hello for express");
}); //use a new middleware on our app and incoming request

module.exports = app;
