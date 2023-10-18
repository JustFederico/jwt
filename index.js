const express = require('express');
const path = require('path'); // module to handle file paths
const bodyParser = require('body-parser');
const data = require('./dummy');

const api = express();

const HOST = 'localhost';
const PORT = 8888;

//api.use(express.urlencoded({ extended: true })); // Middleware to handle form data
api.use(bodyParser.urlencoded({ extended: true })); 
api.get('/', (req, res) => {
    res.send('Welcome to WBS API!');
});

api.get('/people', (req, res) => {
    res.status(200).json(data);
});

api.get('/login', (req, res) => {
    res.send(`
        <html>
            <body>
                <form action="/login" method="post">
                    <label for="username">Name:</label>
                    <input type="text" name="name" id="name"><br>
                    <input type="submit" value="Submit">
                </form>
            </body>
        </html>
    `);
});

//login route
api.get('/login', (req, res) => {
    // Create an absolute file path to your HTML form
    const formPath = path.join(__dirname, 'login.html'); //declares a variable/creating a /full file path to html form
    res.sendFile(formPath);
});

api.post('/login', (req, res) => {
    const { name } = req.body;
    res.send(`Hello, ${name}!`);
});


api.listen(PORT, () => console.log(`API running at ${HOST}:${PORT}!`));
