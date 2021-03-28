import React,{useRef} from "react";
import {Button}from 'react-bootstrap'
import { useAuth } from "../../Context/AuthContext.js";
import { Chart } from "react-google-charts";
import { exportComponentAsPNG } from 'react-component-export-image';
export default function GanttChart() {
  const { selectedProject, selectedProjectTasks } = useAuth();
  const componentRef = useRef();
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
  formattedData.push(defaultSettings);

  let projectData = [
    "" + selectedProject.projectName,
    "" + selectedProject.projectName,
    new Date(selectedProject.startDate),
    new Date(selectedProject.endDate),
    null,
    "" + calculateProgress(),
    null,
  ];
  formattedData.push(projectData);

  function calculateProgress() {
    let counter = 0;
    selectedProjectTasks.forEach((task) => {
      if (task.complete) {
        counter++;
      }
    });
    return (counter / selectedProjectTasks.length) * 100;
  }

  let formattedTask = [];
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

    formattedData.push(formattedTask);
  });
  function calculateTaskProgress(task) {
    let counter = 0;

    task.subTasks.forEach((sub) => {
      if (sub.complete) {
        counter++;
      }
    });

    return (counter / task.subTasks.length) * 100;
  }

  return (
    <div >
      <div className='mr-3 mb-2' style={{textAlign:'right'}}><Button  onClick={()=>exportComponentAsPNG(componentRef)}>Export as Image</Button></div>
      <h5>Gannt Chart of the project {selectedProject.projectName}</h5>
      <div ref={componentRef} style={{ width: "100%",height:'1000px',overflow:'auto',marginBottom:'100px',paddingRight:'50px'}}>
        
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
