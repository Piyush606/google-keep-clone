import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [credentials, setCredentials] = useState({email: "", password: ""})
    const history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        let response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
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
                <label htmlFor="email" className="form-label text-white">Email address</label>
                <input type="email" className="form-control text-white bg-dark" name='email' id="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label text-white">Password</label>
                <input type="password" className="form-control text-white bg-dark" id="password" name='password' value={credentials.password} onChange={onChange}/>
            </div>
            <button type="submit" className="btn btn-sm btn-warning">Login</button>
        </form>
    </div>
    </>
  )
}

export default Login