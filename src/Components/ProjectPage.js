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
            <Tab>Current Work</Tab>
            <Tab>Gantt Chart</Tab>
            <Tab>NPV</Tab>
            <Tab>Inventory</Tab>

            <Tab>Settings</Tab>
          </TabList>
          <div style={{ height: "86vh", overflow: "auto" }}>
            <TabPanel>
              <CurrentWork />
            </TabPanel>
            <TabPanel>
              <GanttChart />
            </TabPanel>
            <TabPanel>
              <NPV />
            </TabPanel>
            <TabPanel>
              <Inventory />
            </TabPanel>
            <TabPanel className="d-flex align-items-center justify-content-center">
              <ProjectSettings />
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
