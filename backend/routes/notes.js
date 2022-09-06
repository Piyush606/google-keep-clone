const express = require('express')
const router = express.Router();
const fetchUser = require('../middleware/fetchUser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try{
        const notes = await Notes.find({user: req.user.id})
        res.json(notes)
    }catch(error){
        console.error(error.message)
        res.status(500).send('internal server error')
    }
})

// login required
router.post('/addnote', fetchUser, [
    body('title', 'title must be 3 characters long.').isLength({min:3}),
    body('description', 'description must be 5 characters long.').isLength({min:5}),
], async (req, res)=>{
    try{
        const {title, description, tag} = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({title, description, tag, user: req.user.id})
        const saveNote = await note.save()

        res.json(saveNote)
    }catch(error){
        console.error(error.message)
        res.status(500).send('internal server error')
    }
})

router.put('/updatenote/:id', fetchUser, async (req, res)=>{
    try{
        const {title, description, tag} = req.body
        const newNote = {}
        if(title){
            newNote.title = title
        }
        if(description){
            newNote.description = description
        }
        if(tag){
            newNote.tag = tag
        }

        // find the note to be updated and update it
        let note = await Notes.findById(req.params.id)
        if(!note){
            res.status(404).send('Note not found')
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed")
        }
        
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})    // new:true ensures that any new note is also created if it is done with the update API
        res.json(newNote)
    }catch(error){
        console.error(error.message)
        res.status(500).send('internal server error')
    }
})

router.delete('/deletenote/:id', fetchUser, async (req, res)=>{
    try{
        
        let note = await Notes.findById(req.params.id)
        // check if note exists
        if(!note){
            res.status(404).send('Note not found')
        }
        // allow only if user owns the note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success": "Note has been deleted successfully.", note: note})  
    }catch(error){
        console.error(error.message)
        res.status(500).send('internal server error')
    }
})

module.exports = router