import React, { useContext, useEffect, useState, useRef } from 'react'
import contextValue from '../context/notes/noteContext'
import Note from './Note'
import Addnote from './Addnote'
import { useNavigate } from 'react-router-dom'
import {AiFillEdit, AiOutlineSave} from 'react-icons/ai'
import {BiArchiveIn, BiTagAlt} from 'react-icons/bi'

const Notes = () => {
  const history = useNavigate()
  const context = useContext(contextValue)
  const { notes, getAllNotes, editNote } = context

  
  useEffect(() => {
    if(localStorage.getItem('token')){
      getAllNotes()
      }else{
        history("/login")
      }
      }, [])
      const ref = useRef(null)
      const refClose = useRef(null)
      
      const [note, setNote] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: ""
      })

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description})
  }
  
  const handleSave = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription)
    refClose.current.click()
  }

  const onChange = (e) =>{
    setNote({...note, [e.target.name]: e.target.value})
    // let noteTitle = document.getElementById("note-title")
    // let noteDescription = document.getElementById("note-description")
    // if(document.activeElement === noteDescription || document.activeElement === noteTitle){
    //   console.log("we're active")
    // }else{
    //   // setShow(false);
    // }
  }
  

  return (
    <>
      <div className="notes-section col-md-9 d-flex flex-column pt-5">
        <Addnote />

        <button ref={ref} className='d-none btn btn-sm btn-outline-warning rounded-circle' title='Edit' data-bs-toggle="modal" data-bs-target="#exampleModal" ><AiFillEdit /></button>

        <div className='w-50 edit-notes'>
          <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content bg-dark text-center">
                <div className="modal-body">
                  <form action="" id='form-to-add-note'>
                    <input id="" type="text" placeholder='Title' className="add-note-input add-note-form-input my-2 p-2" value={note.etitle} name='etitle' onChange={onChange} required/><br />
                    <textarea id="" rows="10" className="add-note-input add-note-form-input desc my-2 p-2" value={note.edescription} name='edescription' onChange={onChange} placeholder="description" required></textarea>
                    <div className="d-flex justify-content-between px-3 pb-3" id="noteEditor">
                      {/* <input type="text" className="add-note-input add-note-form-input my-2" value={note.tag} name='tag' onChange={onChange}/><br /> */}
                      <div className="dropdown">
                        <button title='Tags' className="btn btn-sm rounded-circle btn-warning" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <BiTagAlt />
                        </button>
                        <ul className="dropdown-menu bg-dark label-list">
                          <li><a className="dropdown-item text-white" href="#">Action</a></li>
                          <li><a className="dropdown-item text-white" href="#">Another action</a></li>
                          <li><a className="dropdown-item text-white" href="#">Something else here</a></li>
                        </ul>
                      </div>
                      <button ref={refClose} title='save' type='submit' data-bs-dismiss="modal" className="btn btn-sm btn-warning rounded-circle" onClick={handleSave}><AiOutlineSave /></button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="notes pe-4">
          <div className="row">
            {notes.length === 0 && "No notes to display"}
            {notes.map((note) => {
              return (
                <Note className="" updateNote={updateNote} key={note._id} note={note} />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Notes