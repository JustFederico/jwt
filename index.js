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
/*
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
*/

//login
api.get('/login', (req, res) => {
    // Create an absolute file path to your HTML form
    const formPath = path.join(__dirname, 'login.html'); //declares a variable/creating a /full file path to html form
    res.sendFile(formPath);
});

api.post('/login', (req, res) => {
    const { name } = req.body;
    res.send(`Hello, ${name}!`);
});

api.post('/connect', (req, res) => {
    const { username, password } = req.body;


    // login correct???(username: "john", password: "doe")
    if (username === "john" && password === "doe") {
        
    const jwtPayload = { username: "john" };
    const secretKey = "secret-key"; // Replace with your secret key

        // Sign the JWT
    const jwt = jwt.sign(jwtPayload, secretKey);

        
    res.setHeader('Authorization', `Bearer ${jwt}`);// Set the JWT as a header in the response

        // Send back an HTML form with the token field
    res.send(`
            <html>
                <body>
                    <form action="/check-token" method="post">
                        <label for="token">Token:</label>
                        <input type="text" name="token" id="token" value="${jwt}" readonly><br>
                        <input type="submit" value="Check Token">
                    </form>
                </body>
            </html>
        `);
    } else {
       
        res.redirect('/login');
    }
});


api.post('/check-token', (req, res) => {
    //token validation logic
    const token = req.body.token;

    
    if (user.password == password) { //validation logic
        res.send('Token is valid.');
    } else {
        res.send('Token is invalid.');
    }
});



api.listen(PORT, () => console.log(`API running at ${HOST}:${PORT}!`));
