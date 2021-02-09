import React, { useState} from "react";
import { useAuth } from '../Context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import NavBar from "./NavBar"
import { Card, Button, Alert } from "react-bootstrap";
export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function test(){
      await currentUser.updateProfile({
        phoneNumber: "966566968612" ,
      }).then(function() {
        console.log("success")
      }).catch(function(error) {
        console.log("failed")
      });

      console.log(currentUser)
    }

    async function handleLogout() {
        setError('')

        try{
            await logout()
            history.push('/login')
        }catch{
            setError('Failed To Log Out')
        }
    }

  return (
    <>
    <NavBar></NavBar>
    
      
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>Log Out</Button>
      </div>
    </>
  );
}
