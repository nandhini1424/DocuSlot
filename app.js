const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Set up the database
let db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the users database.');
});

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER,
    mobile TEXT,
    username TEXT UNIQUE,
    password TEXT
)`);

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [email, password], (err, row) => {
        if (err) {
            return res.json({ success: false, message: err.message });
        }
        if (row) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

// Signup route
app.post('/signup', (req, res) => {
    const { name, age, mobile, username, password } = req.body;
    db.run(`INSERT INTO users (name, age, mobile, username, password) VALUES (?, ?, ?, ?, ?)`,
        [name, age, mobile, username, password],
        function (err) {
            if (err) {
                return res.json({ success: false, message: err.message });
            }
            res.json({ success: true });
        }
    );
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
