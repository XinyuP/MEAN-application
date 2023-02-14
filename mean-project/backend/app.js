// hold the express app -- still a node js server side app -- taking adantage of express features

const express = require("express");

const app = express();


app.use("/api/posts", (req, res, next) => {
  // adding api is optional, just to make it clear
  const posts = [
    {
      id: "213221321",
      title: "wedewdwe",
      content: "dwdewdwds",
    },
    {
      id: "23231",
      title: "wedewdwe",
      content: "dwdewdwds",
    },
    {
      id: "323213",
      title: "wedewdwe",
      content: "dwdewdwds",
    },
    {
      id: "21321",
      title: "wedewdwe",
      content: "dwdewdwds",
    },
  ];
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts,
  });
  next();
});

// express app is just a big chain of middlewares we apply to the incoming requests
// like a funnel through which we send that express and every part of that funnel or in
// that funnel, we have different parts, and every part can do something with request.

/*
app.use((req, res, next) => {
  console.log("heljdsjdsjdkjd");
  next();
}); //use a new middleware on our app and incoming request

app.use((req, res, next) => {
  res.send("hello for express");
}); //use a new middleware on our app and incoming request
*/
module.exports = app;
