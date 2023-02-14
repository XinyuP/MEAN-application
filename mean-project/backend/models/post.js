const mongoose = require("mongoose");

// just a blueprint
const postSchema = mongoose.Schema({
  id: String, // created automatically by mongoose for us
  title: { type: String, required: true },
  content: { type: String, required: true },
});


// turn definition into a model
module.exports = mongoose.model("Post", postSchema); // name of the model, the schema we wanna use













































