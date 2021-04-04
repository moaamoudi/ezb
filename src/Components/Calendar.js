import React from "react";
import CalenderScheduler from "./CalendarScheduler.js";
import { useAuth } from "../Context/AuthContext";

import { useHistory } from "react-router-dom";

export default function Calendar() {
  const {
    allCompanyTasks,
    userDetails,
    selectCompany,
    setSelectedProject1,
    projects,
  } = useAuth();
  let currentUser = {};
  let projectsTemp = [];
  let taskTemp = [];
  const history = useHistory();

  //getting the current user role from state
  for (let i = 0; i < allCompanyTasks.length; i++) {
    for (let j = 0; j < allCompanyTasks[i].belongsTo.assigned.length; j++) {
      if (
        allCompanyTasks[i].belongsTo.assigned[j].email === userDetails.email
      ) {
        currentUser = allCompanyTasks[i].belongsTo.assigned[j];
      }
    }
  }

  //looping through all projects in selected company
  for (let i = 0; i < projects.length; i++) {
    //checking if user exists and is assigned in the company
    if (currentUser) {
      //if the user type was owner we will store all the projects
      if (currentUser.type === "owner") {
        projectsTemp.push(projects[i]);
      } else {
        //if the user type was admin or worker we will store only the projects they are assigned to
        for (let j = 0; j < projects[i].assigned.length; j++) {
          if (currentUser.email === projects[i].assigned[j].email) {
            projectsTemp.push(projects[i]);
          }
        }
      }
    }
  }

  //checking if the task exists in the previous array of assigned projects (projectsTemp)
  let allTasks = [];
  //looping through all company tasks
  for (let i = 0; i < allCompanyTasks.length; i++) {
    //nested loop of all assigned projects array that we took earlier
    for (let j = 0; j < projectsTemp.length; j++) {
      //checking if the current user is assigned to the project
      if (
        allCompanyTasks[i].belongsTo.projectName === projectsTemp[j].projectName
      ) {
        //checking the user type
        if (currentUser.type === "Worker") {
          //if the type was worker we will only show the tasks that they are assigned to
          for (let k = 0; k < allCompanyTasks[i].subTasks.length; k++) {
            if (allCompanyTasks[i].subTasks[k].assigned !== undefined) {
              if (
                allCompanyTasks[i].subTasks[k].assigned.email ===
                currentUser.email
              ) {
                allTasks.push(allCompanyTasks[i]);
                break;
              }
            }
          }
        } else {
          //if the user was an admin or owner we will show all the tasks of the projects
          //NOTE: that the admin will only be shown the tasks of a project that they are assigned to administrate
          allTasks.push(allCompanyTasks[i]);
        }
      }
    }
  }

  //copying the array of tasks into the final array which will be used
  //to display the data in the dexextreme scheduler api
  taskTemp = allTasks;

  function viewDetails(project) {
    setSelectedProject1(project);
    history.push(
      selectCompany.companyName + "/projects/" + project.projectName
    );
  }

  return (
    <div>
      {taskTemp.length > 0 ? (
        <CalenderScheduler
          data={taskTemp}
          viewDetails={viewDetails}
        ></CalenderScheduler>
      ) : (
        <CalenderScheduler viewDetails={viewDetails}></CalenderScheduler>
      )}
    </div>
  );
}
