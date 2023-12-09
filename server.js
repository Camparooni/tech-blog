const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = 3000;

// Sample in-memory data store
const users = [];
const blogPosts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

const checkLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        res.status(401).send('Unauthorized');
    } else {
        next();
    }
};

// Homepage route
app.get('/', (req, res) => {
    // Display blog posts
    const postsHTML = blogPosts.map(post => `<div><h2>${post.title}</h2><p>${post.content}</p><p>By ${post.author} on ${post.date}</p></div>`).join('');
    const homepageContent = `<h1>Welcome to the Blog</h1>${postsHTML}`;
    res.send(homepageContent);
});

// Dashboard route
app.get('/dashboard', checkLoggedIn, (req, res) => {
    // Display users blog posts
    const userPosts = blogPosts.filter(post => post.author === req.session.user);
    const postsHTML = userPosts.map(post => `<div><h2>${post.title}</h2><p>${post.content}</p><p>Posted on ${post.date}</p></div>`).join('');
    const dashboardContent = `<h1>Your Dashboard</h1>${postsHTML}<a href="/logout">Logout</a>`;
    res.send(dashboardContent);
});

// Signup route
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    // Save user credentials (consider hashing passwords)
    users.push({ username, password });
    req.session.user = username;
    res.redirect('/');
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Check user credentials
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        req.session.user = username;
        res.redirect('/');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// Add blog post
app.post('/add-post', checkLoggedIn, (req, res) => {
    const { title, content } = req.body;
    // Save blog post
    blogPosts.push({ title, content, author: req.session.user, date: new Date().toLocaleString() });
    res.redirect('/dashboard');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});