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

  for (let i = 0; i < allCompanyTasks.length; i++) {
    for (let j = 0; j < allCompanyTasks[i].belongsTo.assigned.length; j++) {
      if (
        allCompanyTasks[i].belongsTo.assigned[j].email === userDetails.email
      ) {
        currentUser = allCompanyTasks[i].belongsTo.assigned[j];
      }
    }
  }
  for (let i = 0; i < projects.length; i++) {
    if (currentUser) {
      if (currentUser.type === "owner") {
        projectsTemp.push(projects[i]);
      } else {
        for (let j = 0; j < projects[i].assigned.length; j++) {
          if (currentUser.email === projects[i].assigned[j].email) {
            projectsTemp.push(projects[i]);
          }
        }
      }
    }
  }

  let temp1 = [];
  for (let i = 0; i < allCompanyTasks.length; i++) {
    for (let j = 0; j < projectsTemp.length; j++) {
      if (
        allCompanyTasks[i].belongsTo.projectName === projectsTemp[j].projectName
      ) {
        if (currentUser.type === "Worker") {
          temp1.push(allCompanyTasks[i]);
        } else {
          temp1.push(allCompanyTasks[i]);
        }
      }
    }
  }
  taskTemp = temp1;

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
