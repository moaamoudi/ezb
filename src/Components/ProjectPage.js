import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import "./styles/tabs.css";

import NPV from "./Tabs/NPV.js";
import Inventory from "./Tabs/Inventory.js";
import CurrentWork from "./Tabs/CurrentWork.js";
import GanttChart from "./Tabs/GanttChart.js";

import ProjectSettings from "./Tabs/ProjectSettings";

export default function ProjectPage() {
  const project = JSON.parse(localStorage.getItem("selectedProject"));

  return (
    <div
      style={{
        width: "100%",
        textAlign: "left",
        margin: "5px",
      }}
    >
      <h1>{project.projectName}</h1>
      <div>
        <Tabs>
          <TabList>
            <Tab key="0">Current Work</Tab>
            <Tab key="1">Gantt Chart</Tab>
            <Tab key="2">NPV</Tab>
            <Tab key="3">Inventory</Tab>
            <Tab key="4">Settings</Tab>
          </TabList>
          <div style={{ height: "86vh", overflow: "auto" }}>
            <TabPanel key="0">
              <CurrentWork />
            </TabPanel>
            <TabPanel key="1">
              <GanttChart />
            </TabPanel>
            <TabPanel key="2">
              <NPV />
            </TabPanel>
            <TabPanel key="3">
              <Inventory />
            </TabPanel>
            <TabPanel className="d-flex align-items-center justify-content-center" key="4">
              <ProjectSettings />
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
