const express = require("express")
const fs = require("fs/promises");
const path = require("path")
const app = express()
const PORT = 3000;


/**
 * GET /api/books
 * This endpoint is used to fetch all the books data from the books.json file.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * 
 * @returns {object} - The response with JSON data of all the books.
 */
app.get("/api/books", async (req, res) => {
    // Read the books.json file
    const content = await fs.readFile(path.join(__dirname, "data/books.json"), {
        encoding: "utf-8"
    });

    // Parse the content of the file to a JSON object
    data = JSON.parse(content);

    // Send the JSON data as the response
    res.json(data);
})


app.listen(3000, () => {
    console.log(`Example app listening on port http://localhost:${3000}`)
})