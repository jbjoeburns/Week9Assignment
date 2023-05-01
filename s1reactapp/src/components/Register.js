import React from "react"
import { useState } from "react"
import {registerUser} from "../utils"

// register component
const Register = ({newUser}) => {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const submitHandler = async(e)=> {
        e.preventDefault()
        // for testing
        // console.log(username)
        // console.log(email)
        // console.log(password)
        await registerUser(username,email,password,newUser)
        alert("Account has been created! Please log in...")
        // reloads page to clear text boxes
        window.location.reload();
    }
    return(
    <>
        <h1>Register Below</h1>
        <form onSubmit={submitHandler}>
            <label>
                username: <input onChange={(e)=>setUsername(e.target.value)} required></input>
            </label>
            <br></br>
            <label>
                email: <input onChange={(e)=>setEmail(e.target.value)} required></input>
            </label>
            <br></br>
            <label>
                password: <input type="password" onChange={(e)=>setPassword(e.target.value)} required></input>
            </label>
            <button type="submit">Register</button>
        </form>
    </>
    )
}

export default Register