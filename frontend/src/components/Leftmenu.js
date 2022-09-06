import React, {useState, useEffect} from 'react'
import Menuitem from './Menuitem'
import {AiFillEdit, AiFillBulb, AiOutlinePlus, AiOutlineBars} from 'react-icons/ai'
import {BiArchiveIn} from 'react-icons/bi'
import {NavLink, useLocation} from 'react-router-dom'
import {motion} from 'framer-motion'

const Leftmenu = () => {
    let location=useLocation();
    const [isOpen, setIsOpen] = useState(true)
    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    
    const isMobile = width <= 768;
    const toggle = () => {
        isMobile ? setIsOpen(isOpen => !isOpen) : setIsOpen(true);
    }
   let menuItems = [
    {
    id: 1,
    name: "shayari"
   },
    {
    id: 2,
    name: "rap"
   },
    {
    id: 3,
    name: "poem"
   }
]
    
   const navLinkStyles = (isActive) => {
       return {
           textDecoration: "none",

       }
   }
   const changeNotesForTag = (e) => {
        
   }
   const addTag = () => {

   }
   const note = {
    title: ""
   }
   return (
       <div className={`left-menu bg-dark col-md-3 d-flex flex-column pt-5 px-0 ${isOpen ? "active" : ""}`}>
        <div className="my-5">
            <div className="d-flex justify-content-end align-items-center text-white p-2 mt-2 me-3" >
                <AiOutlineBars className='ms-3 text-white menu-bars' onClick={toggle}/>
            </div>
            {(isOpen || !isMobile) && <NavLink to="/" style={navLinkStyles}>
            <div className={`d-flex align-items-center ${location.pathname === "/" ? "bg-warning" : ""} text-white p-2 mt-2`} >
                <AiFillBulb className='ms-5'/>
                <h6 className="mb-0 ms-3">All Notes</h6>
            </div>
            </NavLink>}
            {(isOpen || !isMobile) && <div className={`d-flex align-items-center text-white px-4`}>
                <input type="text" className="add-note-input add-note-form-input my-2 p-2" value={note.title} name='title' onChange={addTag} placeholder="Add Tag"/>
                <AiOutlinePlus size={30} onClick={addTag}/>
            </div>}
            {menuItems.length && menuItems.map((item) => {
                let tagElement = ((isOpen || !isMobile) ? <NavLink key={item.id} to={item.name} className={`${location.pathname === `/${item.name}` ? "bg-warning" : ""}`} style={navLinkStyles} onClick={changeNotesForTag}><Menuitem tagTitle={item.name}/></NavLink> : <></>)
                return  tagElement
            })}
            {(isOpen || !isMobile) && <NavLink to="/archive" style={navLinkStyles}>
            <div className={`d-flex align-items-center ${location.pathname === `/archive` ? "bg-warning" : ""} text-white p-2 mt-2`}>
                <BiArchiveIn className='ms-5'/>
                <h6 className="mb-0 ms-3">Archive</h6>
            </div>
            </NavLink>}
        </div>
    </div>
  )
}

export default Leftmenu