import React, {useContext} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Notes from '../components/Notes'
import EditLabel from '../components/EditLabel'
import Leftmenu from '../components/Leftmenu'
import Archive from '../components/Archive'

const Home = () => {

  return (
    <div className='row d-flex'>
      <Leftmenu/>
      <Notes/>
    </div>
  )
}

export default Home