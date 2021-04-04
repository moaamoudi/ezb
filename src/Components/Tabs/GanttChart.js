import React,{useRef} from "react";
import {Button}from 'react-bootstrap'
import { useAuth } from "../../Context/AuthContext.js";
import { Chart } from "react-google-charts";
import { exportComponentAsPNG } from 'react-component-export-image';
export default function GanttChart() {
  const { selectedProject, selectedProjectTasks } = useAuth();
  const componentRef = useRef();
  //default google charts api settings
  const defaultSettings = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];

  let formattedData = [];
  //inserting the default setting into formatted data array object
  formattedData.push(defaultSettings);
 //formatting the project object as default settings of google charts api
  let projectData = [
    "" + selectedProject.projectName,
    "" + selectedProject.projectName,
    new Date(selectedProject.startDate),
    new Date(selectedProject.endDate),
    null,
    "" + calculateProgress(),
    null,
  ];
  //inserting it to index 1 of the array so it read the default settings at index 0 (Note!: this is how google charts api works)
  formattedData.push(projectData);
//this function for calculating the project progress
  function calculateProgress() {
    let counter = 0;
    selectedProjectTasks.forEach((task) => {
      if (task.complete) {
        counter++;
      }
    });
    //the output of this function is a percentage of progress out of 100%
    return (counter / selectedProjectTasks.length) * 100;
  }
//defined an object of formatted tasks array 
  let formattedTask = [];
  //looping through each task and adds it with the formatted settings of google charts api
  selectedProjectTasks.forEach((task) => {
    formattedTask = [];
    formattedTask = [
      "" + task.taskName,
      "" + task.taskName,
      new Date(task.startDate),
      new Date(task.endDate),
      null,
      "" + calculateTaskProgress(task),
      null,
    ];
    //pushing the formatted task into the array 
    formattedData.push(formattedTask);
  });
  //this function input is a whole task which has subtasks in it
  function calculateTaskProgress(task) {
    let counter = 0;
    //will loop through the subtasks array of the major task 
    task.subTasks.forEach((sub) => {
      //checking if subtask is completed so we increase the counter to calculate progress of the major task
      if (sub.complete) {
        counter++;
      }
    });
    //return the progress of this task in percentage out of 100%
    return (counter / task.subTasks.length) * 100;
  }

  return (
    //the html code for displaying the user  interface 
    //exportComponentAsPng is gonna export the chart as an image to be downloaded!
    <div >
      <div className='mr-3 mb-2' style={{textAlign:'right'}}><Button  onClick={()=>exportComponentAsPNG(componentRef)}>Export as Image</Button></div>
      <h5>Gannt Chart of the project {selectedProject.projectName}</h5>
      <div ref={componentRef} style={{ width: "100%",height:'1000px',overflow:'auto',marginBottom:'100px',paddingRight:'50px'}}>
        {/*google chart api its input will be the formatted Data we did above */}
        <Chart
        width={"100%"}
        height={"100%"}
        chartType="Gantt"
        loader={<div>Loading Chart</div>}
        data={formattedData}
        rootProps={{ "data-testid": "1" }}
      /></div>
      
      
    </div>
  );
}
