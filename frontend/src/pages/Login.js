import React,{ useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import './Login.css';

function Login() {
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const[error,setError] = useState("")
    const navigate = useNavigate();
    const handleSubmit = async(e) =>{
        e.preventDefault();
        // await axios.post("http://127.0.0.1:8000/api/token/",{
        await axios.post("/api/token/",{
          username : username,
          password : password,
        }).then(response=>{
          console.log('Login response',response.data);
          localStorage.setItem("access",response.data.access);
          localStorage.setItem("refresh",response.data.refresh);
          navigate("/dashboard");
        }).catch(error =>{
          console.log('Login Error',error);
          setError("Invalid username or password");
        })
        
    }
  return (
    <div className="login-page">
      <div className="login-card">
      <h2>LOGIN</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
            <Form.Label>
                UserName
            </Form.Label>
            <Form.Control type="text"
            placeholder="Enter username" 
            value={username}
            onChange={(e)=>setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" 
            placeholder="Enter Password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
        </Form.Group>
        <Button type="submit" className="login-button">Submit</Button>
      </Form>
      </div>
      {error && <p>{error}</p>}
    </div>
  )
}

export default Login
