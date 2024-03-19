const express = require("express")

const app = express()

const PORT = 3000;

/*
 * This is a route handler for the root URL /.
 * It sends a response with a heading saying "Hello Tarun and Jasmeet here!".
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/", (req, res) => {
    res.send('<h1>Hello Tarun and Jasmeet here!<h1>')
})

app.listen(3000, () => {
    console.log(`Example app listening on port http://localhost:${3000}`)
})