// hold the express app -- still a node js server side app -- taking adantage of express features
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require('./routes/posts')


const app = express();


mongoose
  .connect(
    "mongodb+srv://blaire:vP32L7b5EXgW4aFv@cluster0.an7f9qe.mongodb.net/node-angular?retryWrites=true&w=majority"
  ) // mongoose auto make create the node-angular databse the first time we write to it
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((e) => {
    console.log("Connection to database failed!");
  });

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
    "GET,POST,PATCH,PUT, DELETE,OPTIONS"
  ); // control which http words maybe used to send requests

  next(); // because request should be able to continue to the next middleware
}); // no path or filter added because I wanna do this for all incoming requests


app.use("/api/posts", postsRoutes);



// // is only triggered for incoming post requests
// app.post("/api/posts", (req, res, next) => {
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content,
//   });
//   //console.log(post);

//   post.save().then((result) => {
//     // console.log(result);
//     res.status(201).json({
//       message: "Post added successfully",
//       postId: result._id,
//     });
//   }); // create a new post entry or document (the name of the collection will be the plural form of the model name 'Post' -> posts)
//   // save(): mongoose behind the scene automatically creates the right query for our database to insert a new entry
//   // with that data and the automatically generated id into the database
// });

// app.get("/api/posts", (req, res, next) => {
//   // adding api is optional, just to make it clear
//   Post.find() // find() simply returns all entries
//     .then((documents) => {
//       // then() holds our results
//       res.status(200).json({
//         message: "Posts fetched successfully!",
//         posts: documents,
//       });
//     });

//   // next();
// });

// /** You could handle "put" requests to put a new resource,
//  * and completely replace the old one with it.
//  *
//  * Or you take "patch" to only update a resource,
//  * an existing resource, with new values. */
// app.put("/api/posts/:id", (req, res, next) => {
//   const post = new Post({
//     _id: req.body.id,
//     title: req.body.title,
//     content: req.body.content,
//   });
//   Post.updateOne({ _id: req.params.id }, post).then((result) => {
//     console.log(result);
//     res.status(200).json({
//       message: "Update successfully!",
//     });
//   });
// });

// app.get("/api/posts/:id", (req, res, next) => {
//   Post.findById(req.params.id).then(post => {
//     if (post) {
//       res.status(200).json(post);
//     } else {
//       res.status(404).json({message: 'Post not found!'})
//     }
//   })
// });


// app.delete("/api/posts/:id", (req, res, next) => {
//   Post.deleteOne({ _id: req.params.id }).then((result) => {
//     console.log(result);
//     res.status(200).json({ message: "Post deleted!" });
//   });
//   // console.log(req.params.id);
// });

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
