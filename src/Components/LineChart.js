import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { useAuth } from "../Context/AuthContext.js";
export default function LineChart() {
  const {
    selectedProjectTasks,
    selectCompany,
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
  }, []);

  if (currentUser.type === "Worker") {
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

      let users = [currentUser.email];

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
  } else {
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

      let users = [];
      selectCompany.users.forEach((user) => {
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
