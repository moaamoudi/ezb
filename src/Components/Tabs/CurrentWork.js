import React from 'react'
import TaskPopUp from "../popUptask";
import NotePopUp from "../PopUpNote";
import LineChart from "../LineChart";
import {Card} from "react-bootstrap";
export default function CurrentWork() {
    const selectedProject=JSON.parse(localStorage.getItem("selectedProject"))
    return (
        <div>
            <LineChart/>
            <div style={{display:'flex'}}><Card className="main-shadow" style={{width:"30%", marginLeft:"15%"}}>
        <Card.Body>
            <h4>Tasks</h4>
            task 1<br/>
            task 2<br/>
            task 3<br/>
            <div style={{marginLeft:"80%"}}><TaskPopUp /></div>
           
        </Card.Body>
        
      </Card>
      <Card className="main-shadow" style={{width:"30%", marginLeft:"10%"}}>
        <Card.Body>
           <h4>Project Description</h4>
            {selectedProject.description}
        </Card.Body>
        
      </Card></div>
      <Card className="main-shadow" style={{width:"30%", marginLeft:"55%" ,marginTop:"1%"}}>
        <Card.Body>
           <h4>Notes</h4>
           <div style={{marginLeft:"79.3%"}}><NotePopUp /></div>
        </Card.Body>
        
      </Card>
        </div>
    )
}