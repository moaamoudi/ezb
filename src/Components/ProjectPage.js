import React from "react";
import { useAuth } from "../Context/AuthContext";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./styles/tabs.css";
export default function ProjectPage() {
  const { project } = useAuth();

  return (
    <div style={{ width: "100%", textAlign: "left" }}>
      <h1>{project.projectName}</h1>
      <div>
        <Tabs >
          <TabList>
            <Tab>Current Work</Tab>
            <Tab>Gantt Chart</Tab>
            <Tab>NPV</Tab>
            <Tab>Inventory</Tab>
          </TabList>
          <div>
            <TabPanel>
              <div style={{ width: "100%", height: "100%" }}>hello</div>
            </TabPanel>
            <TabPanel>
              <h2>Any content 2</h2>
            </TabPanel>
            <TabPanel>
              <h2>Any content 3</h2>
            </TabPanel>
            <TabPanel>
              <h2>Any content 4</h2>
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
