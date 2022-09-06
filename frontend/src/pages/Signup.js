import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""})
    const history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
        })
        const json = await response.json()
        if(json.success){
            //redirect
            localStorage.setItem('token', json.authToken)
            history("/")
        }else{
            alert("Invalid credentials")
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <> 
    <div className="forms-page d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label text-white">Username</label>
                <input type="text" className="form-control text-white bg-dark" name='name' id="name" aria-describedby="emailHelp" value={credentials.name} onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label text-white">Email address</label>
                <input type="email" className="form-control text-white bg-dark" name='email' id="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label text-white">Password</label>
                <input type="password" className="form-control text-white bg-dark" id="password" name='password' value={credentials.password} onChange={onChange} required minLength={5}/>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label text-white">Confirm Password</label>
                <input type="password" className="form-control text-white bg-dark" name='cpassword' id="cpassword" value={credentials.cpassword} onChange={onChange} required minLength={5} aria-describedby="emailHelp" />
            </div>
            <button type="submit" className="btn btn-sm btn-warning">Sign Up</button>
        </form>
    </div>
    </>
  )
}

export default Signup