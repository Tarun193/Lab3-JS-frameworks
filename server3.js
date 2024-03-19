const express = require("express")
const fs = require("fs/promises");
const path = require("path")
const app = express()
const PORT = 3000;
var bodyParser = require('body-parser')

// parse application/json
app.use(bodyParser.json())
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


/**
 * POST /api/books
 * This endpoint is used to add a new book to the books.json file.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * 
 * @returns {object} - The response with JSON data of the added book.
 */
app.post("/api/books", async (req, res) => {
    // Read the books.json file
    const content = await fs.readFile(path.join(__dirname, "data/books.json"), {
        encoding: "utf-8"
    });

    // Parse the content of the file to a JSON object
    const data = JSON.parse(content);

    // Get the book data from the request body
    const newBook = req.body;
    console.log(newBook);

    // Add the new book to the data array
    data.push(newBook);

    // Write the updated data back to the books.json file
    await fs.writeFile(path.join(__dirname, "data/books.json"), JSON.stringify(data));

    // Send the added book as the response
    res.json(newBook);
})


/**
 * PUT endpoint for updating a book in the books.json file.
 *
 * @param {Object} req - The request object, expected to contain the updated book in the body.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with a message indicating the book has been updated.
 */
app.put("/api/books", async (req, res) => {
    // Read the books.json file
    const content = await fs.readFile(path.join(__dirname, "data/books.json"), {
        encoding: "utf-8"
    });

    // Get the updated book from the request body
    const updatedBook = req.body;

    // Parse the content of the file to a JSON object
    let data = JSON.parse(content);

    // Filter out the book to be updated from the data
    const filteredData = data.filter(item => item.id != updatedBook.id);

    // Add the updated book to the data
    filteredData.push(updatedBook)

    // Sort the data by book id in accending order
    filteredData.sort((a, b) => a.id > b.id ? 1 : -1);

    // Write the updated data back to the books.json file
    await fs.writeFile(path.join(__dirname, "data/books.json"), JSON.stringify(filteredData));

    // Send a response with a message indicating the book has been updated
    res.json(
        {
            message: "Book Updated"
        }
    )
})



app.delete("/api/books", async (req, res) => {
    // Read the books.json file
    const content = await fs.readFile(path.join(__dirname, "data/books.json"), {
        encoding: "utf-8"
    });

    const { id } = req.body;

    // Parse the content of the file to a JSON object
    data = JSON.parse(content);

    const filteredData = data.filter(item => item.id != id);

    await fs.writeFile(path.join(__dirname, "data/books.json"), JSON.stringify(filteredData));


    res.json(
        {
            message: "Book deleted"
        }
    )

})



app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
})