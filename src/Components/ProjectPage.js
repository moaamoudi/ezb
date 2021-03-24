import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import "./styles/tabs.css";

import NPV from "./Tabs/NPV.js";
import Inventory from "./Tabs/Inventory.js";
import CurrentWork from "./Tabs/CurrentWork.js";
import GanttChart from "./Tabs/GanttChart.js";
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
          </TabList>
          <div>
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
          </div>
        </Tabs>
      </div>
    </div>
  );
}
