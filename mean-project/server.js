const http = require("http"); // default node.js package
// require is node.js import syntax, import the package, and store its content in the variable
const app = require("./backend/app");

const port = process.env.PORT || 3000;

app.set("port", port); // set config for my express environment

// const server = http.createServer((req, res) => {
//     res.end("This is my first")
// });
const server = http.createServer(app);

server.listen(port);
