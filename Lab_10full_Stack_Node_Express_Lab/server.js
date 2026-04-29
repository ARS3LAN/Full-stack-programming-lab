const express = require('express');
const app = express();
const port = 3000;

// Task 1: Student List Display (GET Only)
const students = ["Ali", "Ahmed", "Khadija", "Abid"];
app.get('/students', (req, res) => {
    const listItems = students.map(s => `<li>${s}</li>`).join('');
    res.send(`<ul>${listItems}</ul>`);
});

// Task 2: Simple Message Routes System
app.get('/home', (req, res) => res.send("Welcome Home"));
app.get('/about', (req, res) => res.send("About Us"));
app.get('/contact', (req, res) => res.send("Contact Us"));

// Task 3: Dynamic User Page
app.get('/user/:name', (req, res) => {
    res.send(`Hello ${req.params.name}`);
});

// Task 4: Simple HTML Page Renderer
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Express HTML Page</title></head>
        <body>
            <h1>Welcome to Task 4</h1>
            <p>This is a paragraph rendered by Express.</p>
            <ul>
                <li>First item</li>
                <li>Second item</li>
            </ul>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
