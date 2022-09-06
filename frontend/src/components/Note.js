import React, {useContext, useState} from 'react'
import contextValue from '../context/notes/noteContext'
import {AiFillEdit, AiOutlineSave} from 'react-icons/ai'
import {BiArchiveIn, BiTagAlt} from 'react-icons/bi'

const Note = (props) => {
  const context = useContext(contextValue)
  // const {deleteNote, updateNote, getAllNotes} = context
  const {deleteNote} = context
  const {note, updateNote} = props
  
  // const [show, setShow] = useState("none")
  // const [note, setNote] = useState({
  //   _id: note._id,
  //   title: note.title,
  //   description: note.desc,
  //   tag: note.tag
  // })
  // const handleClick = (e) => {
  //   e.preventDefault();
  //   setNote({...note, [e.target.name]: e.target.value})
  //   updateNote(note._id ,note.title, note.description, note.tag)
  //   setShow("none")
    // getAllNotes()
  // }
  // const toggleDisplay = () => {
  //   setShow("")
  // }

// const onChange = (e) =>{
//     setNote({...note, [e.target.name]: e.target.value})
// }
  return (
    <>
      <div className="col-md-4 my-2">
          <div className="card">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{note.title}</h5>
                  <p className="card-text">{note.description.slice(0,66)}...</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="tag py-1 px-2">{note.tag}</span>
                  <div>
                    {/* onClick={()=> {toggleDisplay()}} */}
                    <button className='btn btn-sm btn-outline-warning rounded-circle' title='Edit' onClick={() => {updateNote(note)}}><AiFillEdit /></button>
                    <button className='btn btn-sm btn-outline-warning rounded-circle ms-2' title='Archive' onClick={() => {deleteNote(note._id)}}><BiArchiveIn /></button>
                    <button className='btn btn-sm btn-outline-warning rounded-circle ms-2' title='Tags'><BiTagAlt /></button> 
                    {/*  onClick={() => {tagNote(note._id)}} */}
                    {/* <div style={{display: show}}> */}
                    {/* make modal for each element */}
                    <div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default Note