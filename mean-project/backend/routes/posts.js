const express = require("express");
const Post = require("../models/post");

const router = express.Router();

// is only triggered for incoming post requests
router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  //console.log(post);

  post.save().then((result) => {
    // console.log(result);
    res.status(201).json({
      message: "Post added successfully",
      postId: result._id,
    });
  }); // create a new post entry or document (the name of the collection will be the plural form of the model name 'Post' -> posts)
  // save(): mongoose behind the scene automatically creates the right query for our database to insert a new entry
  // with that data and the automatically generated id into the database
});

router.get("", (req, res, next) => {
  // adding api is optional, just to make it clear
  Post.find() // find() simply returns all entries
    .then((documents) => {
      // then() holds our results
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: documents,
      });
    });

  // next();
});

/** You could handle "put" requests to put a new resource,
 * and completely replace the old one with it.
 *
 * Or you take "patch" to only update a resource,
 * an existing resource, with new values. */
router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Update successfully!",
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
  // console.log(req.params.id);
});

module.exports = router;
