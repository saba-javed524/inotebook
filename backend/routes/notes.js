const express = require('express');
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");

//ROUTE#1: Get all the notes. GET "api/notes/fetchallnotes". Login required. STARTS HERE
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        let notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});
//ROUTE#1: Get all the notes. GET "api/notes/fetchallnotes". Login required. ENDS HERE

//--------------------------------------------------------------------------------------------//

//ROUTE#2: Add a new note. POST "api/notes/addnote". Login required. STARTS HERE
router.post('/addnote', [
    body('title', 'Enter a valid title.').isLength({ min: 3 }),
    body('description', 'Description length should be 5 characters minimum.').isLength({ min: 5 }),], fetchuser, async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: "Some error occured!" })
            }
            const note = new Notes({
                title, description, tag, user: req.user.id,
            })
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.log({ error: error.message });
            res.status(500).json({ errors: errors.array() })
        }
    });
//ROUTE#2: Add a new note. POST "api/notes/addnote". Login required. ENDS HERE

//--------------------------------------------------------------------------------------------//

//ROUTE#3: Update an existing note. PUT "api/notes/updatenote/:id". Login required. STARTS HERE
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //Create a new note (empty)
    let newNote = {};
    try {
        // check if the existing title contains title/desc/tag, if yes, add those in the newNote that was empty.
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }

        //Find the note to be updated and update it. (using _id first)
        let note = await Notes.findById(req.params.id); //_id
        //check if the note exists or not(for _id)
        if (!note) { return res.status(404).send("Not found!"); }
        //check if the note we retreived in last line from _id, its user(id) is equal to the actual user(id)
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") }
        //ids are equal, update note
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.send(note);
    } catch (error) {
        console.log({ error: error.message });
        res.status(500).json({ errors: errors.array() })
    }
});
//ROUTE#3: Update existing note. POST "api/notes/updatenote/:id". Login required. ENDS HERE

//--------------------------------------------------------------------------------------------//

//ROUTE#4: Delete an existing note. PUT "api/notes/deletenote/:id". Login required. STARTS HERE
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to be deleted and delete it. (using _id first)
        let note = await Notes.findById(req.params.id); //_id
        //check if the note exists or not(for _id)
        if (!note) { return res.status(404).send("Not found!"); }
        //check if the note we retreived in last line from _id, its user(id) is equal to the actual user(id)
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") }
        //ids are equal, allow deletion only if user owns this note
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted!", note: note });
    } catch (error) {
        console.log({ error: error.message });
        res.status(500).json({ errors: errors.array() })
    }
});
//ROUTE#5: Delete an existing note. POST "api/notes/deletenote". Login required. ENDS HERE

module.exports = router;