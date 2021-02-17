import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
 import {useAuth} from "../Context/AuthContext"
export default function PopupProject () {
    const {insertProjectToFirestore}=useAuth();
    function addp(){
        insertProjectToFirestore("EZBProject","12/12/2020","12/12/2021","tasks","testing add")
    }
    return (
        <>
  <Popup trigger={<button > Trigger</button>} position="right center">
    <div>Popup content here !!</div>
  </Popup>
  <button onClick={addp}> add</button>
  </>);
}