import React from "react"
import { useState } from "react"
import {provideDetails} from "../utils"

// component to provide additional details for user, this is kept in another model called Data (probably a bad name for this but it's too late to change it now...)
const AdditionalDetails = ({newUser}) => {
    const [realname, setRealname] = useState()
    const [address, setAddress] = useState()
    const submitHandler = async(e)=> {
        e.preventDefault()
        // for testing
        // console.log(realname)
        // console.log(address)
        await provideDetails(realname,address,newUser)
        // reloads the page again to clear text boxes
        window.location.reload();
    }
    return(
            <>
                <h1>Register Below</h1>
                <form onSubmit={submitHandler}>
                    <label>
                        realname: <input onChange={(e)=>setRealname(e.target.value)} required></input>
                    </label>
                    <br></br>
                    <label>
                        address: <input onChange={(e)=>setAddress(e.target.value)} required></input>
                    </label>
                    <br></br>
                    <button type="submit">Submit</button>
                </form>
            </>
    )
}

export default AdditionalDetails