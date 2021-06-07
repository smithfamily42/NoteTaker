const express = require("express");
const fs = require('fs');
const path = require('path');

const router = express.Router();

const jsonNotes = fs.readFileSync(path.join(__dirname, '../db/db.json'));

let notes = JSON.parse(jsonNotes);

//file route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Create an `/add` route that returns `add.html`
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

//API route
router.get('/api/notes', (req, res) => {
    notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));
    res.json(notes);
});

router.post('/api/notes', ({ body }, res) => {
    const newNote = body;
    newNote.id = 1 + notes.reduce((acc, a) => Math.max(acc, a.id), 0);
    notes.push(newNote);

    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 2), (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({
                error: err.message
            });
        }
        res.json({
            message: 'saved new note',
            note: newNote
        });
    });
  });

  module.exports = router;
