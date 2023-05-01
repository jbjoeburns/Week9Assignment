import { writeCookie } from "../common";
import { getCookie } from '../common';

// util for logging in
export const loginUser = async(username,email,password,newUser)=>{
    try{
        const response = await fetch("http://localhost:5001/users/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": password
            })
        })
        const data = await response.json()
        // console.log(data);
        newUser(data.user.username)
        writeCookie("jwt_token", data.user.token, 7)
    } catch (error) {
        console.log(error);
        alert("Username, email or password is incorrect!")
    }
}

// util for registering
export const registerUser = async(username,email,password,newUser)=>{
    try{
        const response = await fetch("http://localhost:5001/users/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": password
            })
        })
        const data = await response.json()
        // console.log(data);
        newUser(data.user.username)
    } catch (error) {
        console.log(error);
    }
}

// util for checking if user is logged in, and if they've already provided additional details
export const authCheck = async (jwtToken) => {
    try {
        const response = await fetch("http://localhost:5001/users/authcheck", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`
            }
        })
        const responseDatum = await fetch("http://localhost:5001/datum/getdatum", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`
            }
        })
        const data = await response.json()
        const dataAdditionalInfo = await responseDatum.json()
        // console.log(data)
        // console.log("IMPORTANT BELOW")
        // console.log(dataAdditionalInfo)
        return {data, dataAdditionalInfo}
    } catch (error) {
        console.log(error)
    }
}

// util for providing additional details
export const provideDetails = async(realname,address)=>{
    try{
        // write route to get user based on username so I can obtain ID
        let jwt = getCookie("jwt_token")
        console.log(jwt)
        const getresponse = await fetch("http://localhost:5001/users/getcurrentuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            }
        })
        const getdata = await getresponse.json()
        // console.log(getdata.users.id)
        const response = await fetch("http://localhost:5001/datum/additionaldetails",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "realname": realname,
                "address": address,
                "UserId": getdata.users.id
            })
        })
        const data = await response.json()
        console.log(data);
        // newUser(data.user.username)
    } catch (error) {
        console.log(error);
    }
}