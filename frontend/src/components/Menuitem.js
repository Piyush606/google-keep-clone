import React from 'react'
import {BiTagAlt} from 'react-icons/bi'
import {FiEdit} from 'react-icons/fi'

const Menuitem = (props) => {
  return (
    <div className="d-flex justify-content-between align-items-center pe-4 py-2 ps-2 mt-2">
      <div className="d-flex align-items-center text-white" style={{textDecoration: "none"}}>
          <BiTagAlt className='ms-5'/>
          <h6 className="mb-0 ms-3">{props.tagTitle}</h6>
      </div>
      <div className='text-white pb-1'>
        <FiEdit title="Edit Tag"/>
      </div>
    </div>
  )
}

export default Menuitem