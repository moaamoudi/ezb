import React from "react";
import { useAuth } from "../../Context/AuthContext.js";
import { Chart } from "react-google-charts";

export default function GanttChart() {
  const { selectedProject, selectedProjectTasks } = useAuth();

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

  // [
  //   [
  //     { type: "string", label: "Task ID" },
  //     { type: "string", label: "Task Name" },
  //     { type: "date", label: "Start Date" },
  //     { type: "date", label: "End Date" },
  //     { type: "number", label: "Duration" },
  //     { type: "number", label: "Percent Complete" },
  //     { type: "string", label: "Dependencies" },
  //   ],
  //   [
  //     "Research",
  //     "Find sources",
  //     new Date(2015, 0, 1),
  //     new Date(2015, 0, 5),
  //     null,
  //     100,
  //     null,
  //   ],
  //   [
  //     "Write",
  //     "Write paper",
  //     null,
  //     new Date(2015, 0, 9),
  //     3 * 24 * 60 * 60 * 1000,
  //     25,
  //     "Research,Outline",
  //   ],
  //   [
  //     "Cite",
  //     "Create bibliography",
  //     null,
  //     new Date(2015, 0, 7),
  //     1 * 24 * 60 * 60 * 1000,
  //     20,
  //     "Research",
  //   ],
  //   [
  //     "Complete",
  //     "Hand in paper",
  //     null,
  //     new Date(2015, 0, 10),
  //     1 * 24 * 60 * 60 * 1000,
  //     0,
  //     "Cite,Write",
  //   ],
  //   [
  //     "Outline",
  //     "Outline paper",
  //     null,
  //     new Date(2015, 0, 6),
  //     1 * 24 * 60 * 60 * 1000,
  //     100,
  //     "Research",
  //   ],
  // ]

  return (
    <div style={{ width: "100%", padding: "50px" }}>
      <Chart
        width={"100%"}
        height={"1000px"}
        chartType="Gantt"
        loader={<div>Loading Chart</div>}
        data={formattedData}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
}
