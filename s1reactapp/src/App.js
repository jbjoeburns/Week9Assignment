import './App.css';
import { useState, useEffect } from 'react';
import { getCookie } from './common';
import Login from "./components/Login"
import Register from './components/Register';
import AdditionalDetails from './components/AdditionalDetails';
import { authCheck } from './utils';

function App() {
  const [user, setUser] = useState()
  const [realName, setRealName] = useState()
  useEffect(()=>{
    let jwt = getCookie("jwt_token")
    console.log(jwt)
    if (jwt !== false){
      loginWithToken(jwt)
    }

  },)
  // function for checking if logged in and details provided
  const loginWithToken = async(jwt) => {
    const userInfo = await authCheck(jwt)
    setUser(userInfo.data.user.username)
    // console.log(user)
    try {
      setRealName(userInfo.dataAdditionalInfo.datum.realname)
    } catch (error) {
      console.log(error)
    }
    
    // console.log(realName)
  }
  // logout button, clears jwt_token cookie then forces a refresh
  const logoutButton = () => {
    document.cookie = "jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.reload();
  }
  return (
    <div className="App">
      
      {user
        ?
        <>
        {realName 
        ?
         <> 
            <h2>Thank you for registering, {realName}!</h2>
         </>
         :
          <> 
          <h2>Welcome {user}! Please provide additional details...</h2>
          <AdditionalDetails newUser={setUser}/>
          </>
        }
        <button onClick={logoutButton}>Log out</button> 
        </>
        :
        <>
          <h2>Please log in or register...</h2>
          <Login newUser={setUser}/>
          <Register newUser={setUser}/>
        </>
      }
    </div>
  );
}

export default App;
