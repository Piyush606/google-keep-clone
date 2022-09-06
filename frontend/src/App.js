import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import NoteState from './context/notes/noteState';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EditLabel from './components/EditLabel';
import Alert from './components/Alert';
import Archive from './components/Archive';

function App() {
  return (
    <>
    <NoteState>
      <BrowserRouter>
      <Navbar/>
      {/* <Alert message="This is an alert"/> */}
        <Routes>
          <Route path="/" element={<Home/>}>Home</Route>
          <Route path="/login" element={<Login/>}>Login</Route>
          <Route path="/signup" element={<Signup/>}>Sign Up</Route>
          {/* <Route path="/archive" element={<Home/>}>Home</Route> */}
          <Route path="/edit-labels" element={<EditLabel/>}>Edit Labels</Route>
          <Route path="/archive" element={<Archive/>}>Archive</Route>
        </Routes>
      </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
