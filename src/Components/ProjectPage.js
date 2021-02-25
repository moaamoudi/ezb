import React from "react";
import { useAuth } from "../Context/AuthContext";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Form, Button} from "react-bootstrap";
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
          <div >
            <TabPanel>
              <div style={{ width: "100%", height: "100%" }}>hello</div>
            </TabPanel>
            <TabPanel>
              <h2>Any content 2</h2>
            </TabPanel>
            <TabPanel>
              <div style={{ width: "100%", height: "100%" }} >
                
              <Form >
              <Form.Group id="ProjectName">
                <Form.Label>Initial Investment</Form.Label>
                
                <Form.Control
                style={{ width: "20%"  }}
                  type="Name"
                  // ref={ProjectName}
                  icon="fas fa-dollar-sign"
                  required
                  className="form-control button-bg "
                />
                
              </Form.Group>

              <Form.Group id="ProjectDescription">
                <Form.Label>Project Description:</Form.Label>
                <Form.Control
                  type="Name"
                  // ref={ProjectDescription}
                  required
                  className="form-control button-bg"
                />
              </Form.Group>

              <div className="text-center">
                <Button
                  variant="light"
                  className="w-50 button-bg mt-3"
                  type="submit"
                >
                  Calculate
                </Button>
                
              </div>
              
              
            </Form>


              </div>
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
