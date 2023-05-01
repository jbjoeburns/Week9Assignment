import React from "react"
import { useState } from "react"
import {loginUser} from "../utils"

// login component
const Login = ({newUser}) => {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const submitHandler = async(e)=> {
        e.preventDefault()
        // below for testing
        // console.log(username)
        // console.log(email)
        // console.log(password)
        await loginUser(username,email,password,newUser)
    }
    return(
    <>
        <h1>Login Below</h1>
        <form onSubmit={submitHandler}>
            <label>
                username: <input onChange={(e)=>setUsername(e.target.value)}></input>
            </label>
            <br></br>
            <label>
                email: <input onChange={(e)=>setEmail(e.target.value)}></input>
            </label>
            <br></br>
            <label>
                password: <input type="password" onChange={(e)=>setPassword(e.target.value)}></input>
            </label>
            <button type="submit">Login</button>
        </form>
    </>
    )
}

export default Login