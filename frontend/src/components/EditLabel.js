import React, {useContext} from 'react'
import Leftmenu from './Leftmenu'
import { AiOutlineCheck } from 'react-icons/ai';

const EditLabel = () => {
    let Labels = ["acaex", "Raps", "shayri", "acaex", "Raps", "shayri", "acaex", "Raps", "shayri"]
    const saveTag = () => {

    }
  return (
    <div className='row'>
      <Leftmenu/>
      <div className="edit-labels d-flex flex-column justify-content-center align-items-center col-md-9 pt-5">
          <div className="my-4 tags-container d-flex flex-column justify-content-center align-items-center">
        {Labels.length===0 && "No Labels to display"}
        {Labels.map((item)=> {
          return (
            <div className="text-white d-flex align-items-center justify-content-between">
                <input id="" type="text" placeholder='Tag Name' className="add-note-input add-note-form-input my-2 p-2" value={item} name='title' onChange={saveTag}/>
                <AiOutlineCheck onClick={saveTag}/>
            </div>
          )
        })}
          </div>
      </div>
    </div>
  )
}

export default EditLabel