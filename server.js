const express = require('express');
// Import the 'path' module
const path = require('path');
const apiRoutes = require('./routes');


const PORT = process.env.PORT || 3100;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));

// Use apiRoutes
app.use('/', apiRoutes);

//default response for other requests
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Create an `/add` route that returns `add.html`
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// Listener
// ===========================================================
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});

