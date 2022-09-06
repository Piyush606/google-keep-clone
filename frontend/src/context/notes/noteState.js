import { useState } from "react";
import noteContext from "./noteContext";

const noteState = (props) => {
    const host = "http://localhost:5000"

    let notesInitial = [];
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [notes, setNotes] = useState(notesInitial);

    // READ
    const getAllNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        const json = await response.json()
        setNotes(json)
    }

    // CREATE
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });

        const note = await response.json()
        setNotes(notes.concat(note))
    }
    

    // const addNote = (title, description, tag) => {
    //     let note =  {
    //         "_id": 55,
    //         "title": title,
    //         "description": description,
    //         "tag": tag
    //     }
    //     setNotes(notes.concat(note))        // why not notes.push()
    // }

    // DELETE
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }        
        });
        const json = await response.json()
        const newNotes = notes.filter((note) => (note._id !== id))
        setNotes(newNotes)
    }

    // UPDATE
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });

        const json = await response.json()
        
        let newNotes = JSON.parse(JSON.stringify(notes))    // deep copying
        for(let note of newNotes){
            if(note._id === id){
                note.title = title;
                note.description = description;
                note.tag = tag
                break;
            }
        }
        setNotes(newNotes)
    }
    return (
        <noteContext.Provider value={{notes, getAllNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default noteState
