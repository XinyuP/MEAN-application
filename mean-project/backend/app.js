// hold the express app -- still a node js server side app -- taking adantage of express features
const express = require("express");
const bodyParser = require("body-parser");

const Post = require("./models/post");

const app = express();

app.use(bodyParser.json()); // return a valid express middleware for parsing json data
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); /// allow which domain are able to access our resources
  // this means no matter which domain the app which is sending the request is running on,
  // it is allowed to access our resources

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // restricted to domains sending requests with a certain set of headers besides the default headers
  // if the incoming request has another non default headers except the headers we specified here, it will be blocked

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  ); // control which http words maybe used to send requests

  next(); // because request should be able to continue to the next middleware
}); // no path or filter added because I wanna do this for all incoming requests

// is only triggered for incoming post requests
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  console.log(post);
  res.status(201).json({
    message: "Post added successfully",
  });
});

app.get("/api/posts", (req, res, next) => {
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
