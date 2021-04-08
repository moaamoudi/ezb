import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { useAuth } from "../Context/AuthContext.js";
export default function LineChart() {
  const {
    selectedProjectTasks,
    selectedProject,
    userDetails,
  } = useAuth();
  const [currentUser, setCurrentUser] = useState("");
  let dateList = [];
  let finalData = [];

  useEffect(() => {
    for (let index = 0; index < selectedProject.assigned.length; index++) {
      if (selectedProject.assigned[index].email === userDetails.email) {
        setCurrentUser(selectedProject.assigned[index]);
      }
    }
  }, [selectedProject.assigned, userDetails.email]);

  if (currentUser.type === "Worker") {
    //check if project has tasks
    if (selectedProjectTasks.length > 0) {
      selectedProjectTasks.forEach((task) => {
        task.subTasks.forEach((sub) => {
          //check if sub task is complete and add the completion date
          if (sub.complete) {
            if (sub.completionDate) {
              dateList.push(new Date(sub.completionDate));
            }
          }
        });
      });

      let formattedDateList = [];
      //sort the dates from oldest to most recent
      formattedDateList = dateList.slice().sort((a, b) => a - b);

      //**FOR WORKER ROLE ONLY** Stricting the view of worker to only show their own performance without showing other people who are assigned in the project
      let users = [currentUser.email];

      //add the users to options index that is required by google charts api
      let formattedData = [["x"]];
      users.forEach((user) => {
        formattedData[0].push(user);
      });

      //create empty two dimensional arrays with same length of users array and date array
      let createArray = (r, c) => [...Array(r)].map((x) => Array(c).fill(0));
      let tempData = createArray(formattedDateList.length, users.length);
      finalData = createArray(formattedDateList.length + 1, users.length);

      //looping through the dates of subtasks completion
      for (let i = 0; i < formattedDateList.length; i++) {
        let counter = 0;
        //looping through the users **IN THIS CASE ONLY 1 USER EXISTS WHICH IS THE WORKER**
        for (let j = 0; j < users.length; j++) {
          counter = 0;
          //loop through all tasks and their subtasks "nested loops"
          for (let k = 0; k < selectedProjectTasks.length; k++) {
            for (let l = 0; l < selectedProjectTasks[k].subTasks.length; l++) {
              //check if subtask is complete
              if (selectedProjectTasks[k].subTasks[l].complete) {
                //check if the last modified is the same as the user of j in the users array
                if (
                  selectedProjectTasks[k].subTasks[l].lastModified.email ===
                  users[j]
                ) {
                  //only for reinsurance that the sub task is completed
                  //"completed sub task will have a completion date, otherwise the date will be removed"
                  if (
                    selectedProjectTasks[k].subTasks[l].completionDate !== null
                  ) {
                    //checking if the completion date equals the date we formatted earlier
                    if (
                      new Date(
                        selectedProjectTasks[k].subTasks[l].completionDate
                      ).getTime() === formattedDateList[i].getTime()
                    ) {
                      //if all conditions are true we will increse the counter of user progress
                      counter++;
                    } else {
                    }
                  }
                } else {
                }
              } else {
                break;
              }
            }

            // inserting the formatted performance and date of each user to be used in google charts api
            tempData[i][j] = counter;
          }
        }
      }
      //copying the options parameters into the final data array
      finalData[0][0] = formattedData[0][0];
      //copying the user email from users array into the options parameter
      for (let i = 0; i < users.length; i++) {
        finalData[0][i + 1] = formattedData[0][i + 1];
      }

      // copying completion date and progress of each user into the final data
      //note: each date has a specific index with all users performance
      for (let j = 0; j < users.length; j++) {
        for (let i = 0; i < formattedDateList.length; i++) {
          finalData[i + 1][0] = formattedDateList[i];
          finalData[i + 1][j + 1] = tempData[i][j];
        }
      }
    } else {
      //if project has no tasks we display no tasks
      finalData = [
        ["x", "No Tasks"],
        [new Date(), 0],
      ];
    }
  } else {
    //this else is for the other roles (Owner, and administrator)
    //the only difference here that we are taking into consideration all users
    //since the owner or admin have the authority to see all workers progress
    
    if (selectedProjectTasks.length > 0) {
      selectedProjectTasks.forEach((task) => {
        task.subTasks.forEach((sub) => {
          if (sub.complete) {
            if (sub.completionDate) {
              dateList.push(new Date(sub.completionDate));
            }
          }
        });
      });

      let formattedDateList = [];

      formattedDateList = dateList.slice().sort((a, b) => a - b);

      //here we are taking all the users who are assigned in the project
      //instead of taking only 1 user which was the worker
      let users = [];
      selectedProject.assigned.forEach((user) => {
        users.push(user.email);
      });

      let formattedData = [["x"]];
      users.forEach((user) => {
        formattedData[0].push(user);
      });

      let test = (r, c) => [...Array(r)].map((x) => Array(c).fill(0));
      let tempData = test(formattedDateList.length, users.length);
      finalData = test(formattedDateList.length + 1, users.length);

      for (let i = 0; i < formattedDateList.length; i++) {
        let counter = 0;
        for (let j = 0; j < users.length; j++) {
          counter = 0;
          for (let k = 0; k < selectedProjectTasks.length; k++) {
            for (let l = 0; l < selectedProjectTasks[k].subTasks.length; l++) {
              if (selectedProjectTasks[k].subTasks[l].complete) {
                if (
                  selectedProjectTasks[k].subTasks[l].lastModified.email ===
                  users[j]
                ) {
                  if (
                    selectedProjectTasks[k].subTasks[l].completionDate !== null
                  ) {
                    if (
                      new Date(
                        selectedProjectTasks[k].subTasks[l].completionDate
                      ).getTime() === formattedDateList[i].getTime()
                    ) {
                      counter++;
                    } else {
                    }
                  }
                } else {
                }
              } else {
                break;
              }
            }

            tempData[i][j] = counter;
          }
        }
      }
      finalData[0][0] = formattedData[0][0];
      for (let i = 0; i < users.length; i++) {
        finalData[0][i + 1] = formattedData[0][i + 1];
      }
      for (let j = 0; j < users.length; j++) {
        for (let i = 0; i < formattedDateList.length; i++) {
          finalData[i + 1][0] = formattedDateList[i];
          finalData[i + 1][j + 1] = tempData[i][j];
        }
      }
    } else {
      finalData = [
        ["x", "No Tasks"],
        [new Date(), 0],
      ];
    }
  }

  return (
    <Chart
      width={"99%"}
      height={"400px"}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={finalData}
      options={{
        hAxis: {
          title: "Time",
        },
        vAxis: {
          title: "Tasks",
        },
        series: {},
      }}
      rootProps={{ "data-testid": "2" }}
    />
  );
}
