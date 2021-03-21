import { set } from "date-fns";
import React from "react";
import { Chart } from "react-google-charts";
import { useAuth } from "../Context/AuthContext.js";
export default function LineChart() {
  const { selectedProject, selectedProjectTasks, selectCompany } = useAuth();
  let dateList = [];
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

  console.log(formattedDateList);

  let users = [];
  selectCompany.users.forEach((user) => {
    users.push(user.email);
  });

  let formattedData = [["x"]];
  users.forEach((user) => {
    formattedData[0].push(user);
  });

  console.log(formattedData);

  let test = (r, c) => [...Array(r)].map((x) => Array(c).fill());
  let tempData = test(formattedDateList.length, users.length);
  let finalData = test(formattedDateList.length + 1, users.length);

  // let counter = 0;
  // for (let i = 0; i < users.length; i++) {
  //   counter = 0;
  //   for (let k = 0; k < selectedProjectTasks.length; k++) {
  //     for (let l = 0; l < selectedProjectTasks[k].subTasks.length; l++) {
  //       if (selectedProjectTasks[k].subTasks[l].complete) {
  //         if (
  //           users[i] === selectedProjectTasks[k].subTasks[l].lastModified.email
  //         ) {
  //           for (let j = 0; j < formattedDateList.length; j++) {
  //             if (
  //               formattedDateList[j].getTime() ===
  //               new Date(
  //                 selectedProjectTasks[k].subTasks[l].completionDate
  //               ).getTime()
  //             ) {
  //               counter++;
  //             }
  //           }
  //         } else {
  //           break;
  //         }
  //       } else {
  //         break;
  //       }
  //     }
  //   }
  // }

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
              if (selectedProjectTasks[k].subTasks[l].completionDate !== null) {
                if (
                  new Date(
                    selectedProjectTasks[k].subTasks[l].completionDate
                  ).getTime() === formattedDateList[i].getTime()
                ) {
                  console.log("date true");
                  counter++;
                } else {
                  console.log("date false");
                }
              }
            } else {
            }
          } else {
            break;
          }
        }

        tempData[i][j] = counter;
        counter = 0;
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

  console.log(tempData);
  console.log(formattedDateList);
  console.log(formattedData);
  console.log(finalData);

  // [
  //   ["x", "mohammed", "tamer"],
  //   [1, 0, 0],
  //   [2, 10, 5],
  //   [3, 23, 15],
  //   [4, 17, 9],
  //   [5, 18, 10],
  //   [5, 9, 5],
  //   [6, 11, 3],
  //   [7, 27, 19],
  //   [9, 27, 19],
  //   [10, 27, 19],
  //   [11, 27, 19],
  //   [12, 27, 19],
  //   [13, 27, 19],
  //   [14, 27, 19],
  //   [15, 27, 19],
  //   [16, 27, 19],
  //   [17, 27, 19],
  //   [18, 27, 19],
  //   [19, 27, 19],

  // ]

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
