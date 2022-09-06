import React, {useContext, useState} from 'react'
import contextValue from '../context/notes/noteContext'
import {BiTagAlt} from 'react-icons/bi'
import {AiOutlineSave} from 'react-icons/ai'

const Addnote = () => {
    const context = useContext(contextValue)
    const {addNote} = context
    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: ""
    })
    const [show, setShow] = useState(false)
    
      
    const handleSave = (e) => {
      e.preventDefault();
      setNote({...note, [e.target.name]: e.target.value})
      addNote(note.title, note.description, note.tag)
      setNote({title: "", description: "", tag: ""})
    }

    const handleForm = () => {
      setShow(true);
    }

    const onChange = (e) =>{
      setNote({...note, [e.target.name]: e.target.value})
      let noteTitle = document.getElementById("note-title")
      let noteDescription = document.getElementById("note-description")
      if(document.activeElement === noteDescription || document.activeElement === noteTitle){
        console.log("we're active")
      }else{
        setShow(false);
      }
    }
  return (
    <>
    {!show && <div className="add-note mt-5 d-flex justify-content-center" onClick={handleForm}>
      <input type="text" placeholder="Take a note..." className="add-note-input form-control my-2"/>
    </div>}
    <div className="d-flex justify-content-center">

      {show && <div className="add-note mt-5 add">
        <form action="" id='form-to-add-note'>
            <input id="note-title" type="text" placeholder='Title' className="add-note-input add-note-form-input my-2 p-2" value={note.title} name='title' onChange={onChange} required/><br />
            <textarea id="note-description" rows="10" className="add-note-input add-note-form-input desc my-2 p-2" value={note.description} name='description' onChange={onChange} placeholder="description" required></textarea>
            <div className="d-flex justify-content-between px-3 pb-3" id="noteEditor">
              {/* <input type="text" className="add-note-input add-note-form-input my-2" value={note.tag} name='tag' onChange={onChange}/><br /> */}
              <div className="dropdown">
                <button title='Tags' className="btn btn-sm rounded-circle btn-warning" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <BiTagAlt/>
                </button>
                <ul className="dropdown-menu bg-dark label-list">
                  <li><a className="dropdown-item text-white" href="#">Action</a></li>
                  <li><a className="dropdown-item text-white" href="#">Another action</a></li>
                  <li><a className="dropdown-item text-white" href="#">Something else here</a></li>
                </ul>
              </div>
              <button type="submit" title='save' onClick={handleSave} className="btn btn-sm btn-warning rounded-circle"><AiOutlineSave /></button>
            </div>
        </form>
      </div>}

    </div>
    </>
  )
}

export default Addnote