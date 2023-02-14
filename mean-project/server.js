const http = require('http') // default node.js package
// require is node.js import syntax, import the package, and store its content in the variable


const server = http.createServer((req, res) => {
    res.end("This is my first")

});


server.listen(process.env.PORT || 3000);












