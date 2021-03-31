import React, { useContext, useState, useEffect } from "react";
import { auth, db, provider } from "../firebase";
import { format } from "date-fns";
import useLocalStorage from "../Components/useLocalStorage.js";
import emailJS from "emailjs-com";
import { colors } from "../Components/styles/RandomColors.js";
import { useAlert } from "react-alert";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userDetails, setUserDetails] = useLocalStorage("userDetails", []);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useLocalStorage("CompanyProjects", []);
  const alert = useAlert();
  const [selectedCompanyEmployee, setSelectedCompanyEmployee] = useLocalStorage(
    "selectedCompanyEmployee",
    {}
  );
  const [selectedCompanyClients, setSelectedCompanyClients] = useLocalStorage(
    "selectedCompanyClients",
    {}
  );
  const [selectedProject, setSelectedProject] = useLocalStorage(
    "selectedProject",
    {}
  );
  const [selectedProjectTasks, setSelectedProjectTasks] = useLocalStorage(
    "selectedProjectTasks",
    {}
  );
  const [companiesData, setCompaniesData] = useLocalStorage(
    "companiesData",
    {}
  );
  const [selectCompany, setSelectCompany] = useLocalStorage(
    "selectedCompany",
    {}
  );
  const [userNotifications, setUserNotifications] = useLocalStorage(
    "notifications",
    {}
  );
  const [selectedProjectNotes, setSelectedProjectNotes] = useLocalStorage(
    "selectedProjectNotes",
    {}
  );

  const [allCompanyTasks, setAllCompanyTasks] = useLocalStorage(
    "allCompanyTasks",
    []
  );

  const [
    selectedProjectInventory,
    setSelectedProjectInventory,
  ] = useLocalStorage("selectedProjectInventory", {});

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("CompanyProjects");
    localStorage.removeItem("companiesData");
    localStorage.removeItem("selectedCompany");
    localStorage.removeItem("selectedProject");
    localStorage.removeItem("selectedProjectTasks");
    localStorage.removeItem("notifications");
    localStorage.removeItem("selectedProjectNotes");
    localStorage.removeItem("selectedProjectInventory");
    localStorage.removeItem("selectedCompanyEmployee");
    localStorage.removeItem("selectedCompanyClients");
    localStorage.removeItem("allCompanyTasks");

    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return auth.currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return auth.currentUser.updatePassword(password);
  }

  async function setSelectedCompany(company) {
    if (auth.currentUser) {
      await db
        .collection("Companies")
        .doc("" + company.id)
        .onSnapshot((querySnapshot) => {
          console.log(querySnapshot.data());
          console.log("company changed");
          setSelectCompany(querySnapshot.data());
          let emp = [];
          querySnapshot.data().users.forEach((user) => {
            emp.push(user);
          });
          setSelectedCompanyEmployee(emp);
          getCompanyProjects(querySnapshot.data().id);
          getAllProjectsTasks();
        });
    }
  }

  async function initialGetCompanies() {
    let items = [];
    if (auth.currentUser) {
      items = [];

      await db
        .collection("Companies")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((company) => {
            company.data().users.forEach((user) => {
              if (user.email === auth.currentUser.email) {
                let item = company.data();
                item.id = company.id;
                items.push(item);
                console.log(user.email);
              }
            });
          });
        });

      console.log(items);

      setCompaniesData(items);
      setSelectedCompany(items[0]);
      await getCompanyProjects(items[0].id);

      items = [];
    }
    items = [];
  }

  async function getCompanies() {
    let items = [];
    if (auth.currentUser) {
      items = [];

      await db
        .collection("Companies")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.data().users.forEach((user) => {
              if (user.email === auth.currentUser.email) {
                console.log(user.email);
                items.push(doc.data());
              }
            });
          });
        });

      setCompaniesData(items);
      items = [];
    }
    items = [];
  }

  async function getCompanyProjects(id) {
    console.log("getCompanyProjects");

    if (auth.currentUser) {
      db.collection("Companies/" + id + "/Projects").onSnapshot((temp) => {
        const items = [];
        temp.forEach((doc) => {
          let item = doc.data();
          item.id = doc.id;
          items.push(item);
        });
        setProjects(items);
      });
    }
  }

  async function initialGetCompanyProjects() {
    if (auth.currentUser) {
      await db
        .collection("Companies/" + selectCompany.id + "/Projects")
        .onSnapshot((temp) => {
          const items = [];
          temp.forEach((doc) => {
            items.push(doc.data());
          });
          setProjects(items);
        });
    }
  }

  async function insertProjectToFirestore(
    projectName,
    startDate,
    endDate,
    description
  ) {
    const assigned = [];
    assigned.push({
      email: auth.currentUser.email,
      name: auth.currentUser.displayName,
      type: "owner",
      photoURL: auth.currentUser.photoURL,
    });
    companiesData.forEach((company) => {
      if (company.companyName === selectCompany.companyName) {
        company.users.forEach((user) => {
          if (user.email === auth.currentUser.email) {
            if (user.type === "owner") {
              db.collection("Companies/" + selectCompany.id + "/Projects")
                .doc()
                .set({
                  companyName: selectCompany.companyName,
                  id: selectCompany.id,
                  uid: "" + auth.currentUser.uid,
                  email: "" + auth.currentUser.email,
                  projectName: "" + projectName,
                  startDate: "" + startDate,
                  endDate: "" + endDate,
                  description: "" + description,
                  assigned: assigned,
                })
                .then(() => {
                  console.log("Document successfully written!");
                  alert.success("Project Added Successfully!");
                  getCompanyProjects(company.id);
                })
                .catch((error) => {
                  console.error("Error writing document: ", error);
                  alert.error("Failed to Add Project!");
                });
            }
          }
        });
      }
    });

    await updateDetails();
  }

  async function updateProject(project) {
    if (auth.currentUser) {
      await db
        .collection("Companies")
        .doc(selectCompany.id)
        .collection("Projects")
        .doc(selectedProject.id)
        .set(project)
        .then(() => {
          updateDetails();
          setSelectedProject(project);
        });
    }
  }

  async function deleteProject(project) {
    if (auth.currentUser) {
      await db
        .collection("Companies")
        .doc(selectCompany.id)
        .collection("Projects")
        .doc(project.id)
        .delete()
        .then(() => {
          updateDetails();
          getAllProjectsTasks();
          localStorage.removeItem("selectedProjectNotes");
          localStorage.removeItem("selectedProjectInventory");
          localStorage.removeItem("selectedProjectTasks");
          localStorage.removeItem("selectedProject");
        });
    }
  }

  async function insertTaskToFirestore(
    taskName,
    taskDescripiton,
    startDate,
    endDate,
    subTasks
  ) {
    if (auth.currentUser) {
      await db;
      db.collection("Companies")
        .doc("" + selectCompany.id)
        .collection("Projects")
        .doc("" + selectedProject.id)
        .collection("Tasks")
        .doc("" + taskName)
        .set({
          taskName: taskName,
          taskDescripiton: taskDescripiton,
          startDate: startDate,
          endDate: endDate,
          complete: false,
          subTasks: subTasks,
          assigned: [],
        })
        .then(() => {
          console.log("task written succesfully");
          getProjectTasks(selectedProject);
          getAllProjectsTasks();
        })
        .catch((e) => {
          console.error(e.message);
        });
    }
  }

  async function deleteTask(task) {
    if (auth.currentUser) {
      await db;
      db.collection("Companies")
        .doc("" + selectCompany.id)
        .collection("Projects")
        .doc("" + selectedProject.id)
        .collection("Tasks")
        .doc("" + task.taskName)
        .delete()
        .then(() => {
          console.log("task written succesfully");
          getProjectTasks(selectedProject);
          getAllProjectsTasks();
        })
        .catch((e) => {
          console.error(e.message);
        });
    }
  }

  async function getProjectTasks(project) {
    let items = [];
    if (auth.currentUser && project) {
      items = [];
      await db
        .collection("Companies")
        .doc(selectCompany.id)
        .collection("Projects")
        .doc(project.id)
        .collection("Tasks")
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((task) => {
            items.push(task.data());
          });
          setSelectedProjectTasks(items);
          items = [];
        });

      items = [];
    }
    setLoading(false);
  }

  async function handleSubTaskChange(task) {
    if (auth.currentUser) {
      await db
        .collection("Companies")
        .doc(selectCompany.id)
        .collection("Projects")
        .doc(selectedProject.id)
        .collection("Tasks")
        .doc(task.taskName)
        .set(task)
        .then(() => {
          console.log("subtask succesfully edited");
          getProjectTasks(selectedProject);
          getAllProjectsTasks();
        });
    }
  }

  async function insertNoteToFirestore(msg) {
    if (auth.currentUser) {
      let date = format(new Date(), "MMM-dd HH:m");
      await db
        .collection("Companies")
        .doc(selectCompany.id)
        .collection("Projects")
        .doc(selectedProject.id)
        .collection("Notes")
        .doc()
        .set({
          msg: msg,
          dateOfCreation: date,
          creator: {
            name: auth.currentUser.displayName,
            uid: auth.currentUser.uid,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
          },
        });
      getProjectNotes(selectedProject);
    }
  }

  async function deleteNote(note) {
    if (auth.currentUser) {
      await db
        .collection("Companies")
        .doc(selectCompany.id)
        .collection("Projects")
        .doc(selectedProject.id)
        .collection("Notes")
        .doc(note.id)
        .delete()
        .then(() => {
          console.log("note deleted succesfully");
          getProjectNotes(selectedProject);
        });
    }
  }

  async function getProjectNotes(project) {
    let items = [];
    if (auth.currentUser && project) {
      items = [];

      await db
        .collection("Companies")
        .doc(selectCompany.id)
        .collection("Projects")
        .doc(project.id)
        .collection("Notes")
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((note) => {
            let item = note.data();
            item.id = note.id;
            items.push(item);
          });
          setSelectedProjectNotes(items);
          items = [];
        });
      items = [];
    }
    items = [];
  }

  async function insertProductToFirestore(
    name,
    price,
    sellingPrice,
    quantity,
    unitsSold
  ) {
    if (auth.currentUser) {
      await db
        .collection("Companies")
        .doc(selectCompany.id)
        .collection("Projects")
        .doc(selectedProject.id)
        .collection("Inventory")
        .doc()
        .set({
          productName: name,
          productPrice: price,
          productSellingPrice: sellingPrice,
          productQuantity: quantity,
          productUnitsSold: unitsSold,
        });
      getProjectInventory(selectedProject);
    }
  }

  async function deleteProduct(prod) {
    if (auth.currentUser) {
      await db
        .collection("Companies")
        .doc(selectCompany.id)
        .collection("Projects")
        .doc(selectedProject.id)
        .collection("Inventory")
        .doc(prod.id)
        .delete();
      getProjectInventory(selectedProject);
    }
  }

  async function updateProduct(
    prodId,
    name,
    quantity,
    price,
    sellingPrice,
    units
  ) {
    if (auth.currentUser) {
      await db
        .collection("Companies")
        .doc(selectCompany.id)
        .collection("Projects")
        .doc(selectedProject.id)
        .collection("Inventory")
        .doc(prodId)
        .set({
          productName: name,
          productPrice: price,
          productSellingPrice: sellingPrice,
          productQuantity: quantity,
          productUnitsSold: units,
        });
      getProjectInventory(selectedProject);
    }
  }

  async function getProjectInventory(project) {
    let items = [];
    if (auth.currentUser && project) {
      items = [];

      await db
        .collection("Companies")
        .doc(selectCompany.id)
        .collection("Projects")
        .doc(project.id)
        .collection("Inventory")
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((note) => {
            let item = note.data();
            item.id = note.id;
            items.push(item);
          });
          setSelectedProjectInventory(items);
          items = [];
        });
      items = [];
    }
    items = [];
  }

  function sortInventory(temp) {
    setSelectedProjectInventory(temp);
  }

  async function updateProfile(firstName, lastName) {
    await auth.currentUser
      .updateProfile({
        displayName: firstName + " " + lastName,
      })
      .then(function () {
        console.log("success");
      })
      .catch(function (error) {
        console.log("failed");
      });
  }

  async function insertDetailsToFirestore(
    firstName,
    lastName,
    phone,
    companyName
  ) {
    var details = {
      email: "" + auth.currentUser.email,
      firstName: "" + firstName,
      lastName: "" + lastName,
      phone: "" + phone,
      companyName: companyName,
      uid: "" + auth.currentUser.uid,
      photoURL: auth.currentUser.photoURL,
    };

    await db
      .collection("Users")
      .doc("" + auth.currentUser.email)
      .set(details)
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

    await insertCompanyToFirestore(companyName[0]);
    await initialUpdateDetails();
  }

  async function initialUpdateDetails() {
    setLoading(true);
    await fetchUserDetails();
    await getUserNotifications();
    await initialGetCompanies();
    await initialGetCompanyProjects();
    await initialGetClients();
    await getAllProjectsTasks();
    await updateDetails();

    console.log(auth.currentUser);

    setLoading(false);
  }

  async function getAllProjectsTasks() {
    let items = [];

    if (auth.currentUser) {
      items = [];
      for (let index = 0; index < projects.length; index++) {
        await db
          .collection("Companies")
          .doc(selectCompany.id)
          .collection("Projects")
          .doc(projects[index].id)
          .collection("Tasks")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((task) => {
              let temp = task.data();
              items.push({
                assigned: temp.assigned,
                complete: temp.complete,
                endDate: temp.endDate,
                startDate: temp.startDate,
                subTasks: temp.subTasks,
                taskDescripiton: temp.taskDescripiton,
                title: temp.taskName,
                color: colors[index],
                belongsTo: projects[index],
              });
            });
          });
      }
      await setAllCompanyTasks(items);
      items = [];
    }
    items = [];
  }

  async function updateDetails() {
    await fetchUserDetails;
    await getCompanies();
    await getCompanyProjects(selectCompany.id);
    await getAllProjectsTasks();
  }

  async function insertCompanyToFirestore(companyName) {
    setLoading(true);
    var users = [
      {
        uid: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        type: "owner",
        photoURL: auth.currentUser.photoURL,
      },
    ];

    var projects = [];

    var company = {
      companyName: companyName,
      users: users,
      projects: projects,
    };

    await db
      .collection("Companies")
      .doc()
      .set(company)
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

    let items = [];

    await db
      .collection("Companies")
      .get()
      .then((querySnapshot) => {
        items = [];
        querySnapshot.forEach((doc) => {
          doc.data().users.forEach((user) => {
            if (
              user.email === auth.currentUser.email &&
              companyName === doc.data().companyName
            ) {
              var item = doc.data();
              item.id = doc.id;
              items.push(item);
            }
          });
        });
      });

    company.id = items[0].id;

    await db
      .collection("Companies/")
      .doc(items[0].id)
      .set(company)
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

    setSelectedCompany(company);
    items = [];
  }

  async function fetchUserDetails() {
    var details = [];

    if (auth.currentUser) {
      await db
        .collection("Users")
        .doc("" + auth.currentUser.email)
        .get()
        .then((doc) => {
          const data = doc.data();
          if (data !== undefined) {
            console.log("logged in succesfully with set");
            details = data;
            console.log(details);
            setUserDetails(details);
            console.log(userDetails);
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  async function checkUserExist() {
    var exists = -1;
    if (auth.currentUser) {
      await db
        .collection("Users")
        .doc("" + auth.currentUser.email)
        .get()
        .then((doc) => {
          const data = doc.data();
          console.log(data);
          if (data !== undefined) {
            exists = 1;
          } else {
            exists = 0;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return exists;
  }

  async function checkEmployeeExist(email) {
    var exists = -1;
    if (auth.currentUser) {
      await db
        .collection("Users")
        .doc("" + email)
        .get()
        .then((doc) => {
          const data = doc.data();
          if (data !== undefined) {
            exists = data;
          } else {
            exists = 0;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return exists;
  }

  async function insertClientToFirestore(ClientName, ClientEmail) {
    if (auth.currentUser) {
      await db
        .collection("Companies/" + selectCompany.id + "/Clients")
        .doc()
        .set({
          ClientName: ClientName,
          ClientEmail: ClientEmail,
        })
        .then(() => {
          console.log("notification succesfully written");
          GetClients(selectCompany.id);
        });
    }
  }

  async function insertEmployeeToFirestore(
    EmployeeName,
    EmployeeEmail,
    EmployeeType,
    Projects
  ) {
    if (auth.currentUser) {
      const exists = await checkEmployeeExist(EmployeeEmail);
      console.log(exists);
      if (exists === -1 || exists === 0) {
        let temp = [];
        Projects.forEach((project) => {
          temp.push({ projectName: project.projectName, type: EmployeeType });
        });
        let comp = {};
        let user = {
          name: EmployeeName,
          type: EmployeeType,
          email: EmployeeEmail,
          AssignedProjects: temp,
        };
        await db
          .collection("Companies")
          .doc(selectCompany.id)
          .get()
          .then((response) => {
            comp = response.data();
            comp.users.push(user);
            console.log(comp);
            db.collection("Companies")
              .doc(selectCompany.id)
              .set(comp)
              .then(() => {
                console.log("employee successfuly inserted");
              });
          });

        GetEmployee(selectCompany.id);

        Projects.forEach((project) => {
          project.assigned.push(user);
          db.collection("Companies")
            .doc(selectCompany.id)
            .collection("Projects")
            .doc(project.id)
            .set({
              projectName: project.projectName,
              companyName: project.companyName,
              description: project.description,
              uid: project.uid,
              email: project.email,
              id: project.id,
              startDate: project.startDate,
              endDate: project.endDate,
              assigned: project.assigned,
            });
        });
        let names = [];
        Projects.forEach((project) => {
          names.push(project.projectName);
        });
        let variables = {
          msg:
            "Hello " +
            EmployeeName +
            ", <br><br> You have been invited by " +
            currentUser.displayName +
            ", to work at their company " +
            selectCompany.companyName +
            " as a/an " +
            EmployeeType +
            " for the following project/s: " +
            names +
            ".<br><br>We have noticed that you do not have an account at EZB Development, to accept the invitation please go to the following link: http://localhost:3000/ and signup<br><br>Thank you.<br><br>**PLEASE DO NOT REPLY TO THIS EMAIL**",
          Name: "EZB Development",
          Subject: "Invitation to " + selectCompany.companyName,
          reciever: EmployeeEmail,
        };
        emailJS
          .send(
            "Gmail",
            "Development_email",
            variables,
            "user_Ufgqez1YDtVtHo6gPiYox"
          )
          .then(
            function (response) {
              console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
              console.log("FAILED...", error);
            }
          );
      } else {
        let temp = [];
        Projects.forEach((project) => {
          temp.push({ projectName: project.projectName, type: EmployeeType });
        });
        let comp = {};

        let user = {
          name: exists.firstName + " " + exists.lastName,
          email: EmployeeEmail,
          phone: exists.phone,
          AssignedProjects: temp,
          photoURL: exists.photoURL,
        };

        await db
          .collection("Companies")
          .doc(selectCompany.id)
          .get()
          .then((response) => {
            comp = response.data();
            comp.users.push(user);
            console.log(comp);
            db.collection("Companies")
              .doc(selectCompany.id)
              .set(comp)
              .then(() => {
                console.log("employee successfuly inserted");
              });
          });

        GetEmployee(selectCompany.id);

        let user1 = {
          name: exists.firstName + " " + exists.lastName,
          email: EmployeeEmail,
          type: EmployeeType,
          photoURL: exists.photoURL,
        };
        Projects.forEach((project) => {
          project.assigned.push(user1);
          db.collection("Companies")
            .doc(selectCompany.id)
            .collection("Projects")
            .doc(project.id)
            .set({
              projectName: project.projectName,
              companyName: project.companyName,
              description: project.description,
              uid: project.uid,
              email: project.email,
              id: project.id,
              startDate: project.startDate,
              endDate: project.endDate,
              assigned: project.assigned,
            });
        });
        let names = [];
        Projects.forEach((project) => {
          names.push(project.projectName);
        });
        createNotification(
          EmployeeEmail,
          currentUser.displayName +
            " Have added you to their company " +
            selectCompany.companyName +
            " as a " +
            EmployeeType +
            " at the following project/s: " +
            names
        );
      }
    }
  }

  async function deleteEmployee(email) {
    if (auth.currentUser) {
      const temp = selectedCompanyEmployee.filter(
        (user) => user.email !== email
      );
      let comp = selectCompany;
      comp.users = temp;
      let tempProjects = [];
      projects.forEach((project) => {
        project.assigned = project.assigned.filter(
          (user) => user.email !== email
        );
        tempProjects.push(project);
      });
      let projectTasks = [];
      for (let i = 0; i < tempProjects.length; i++) {
        projectTasks = [];
        await db
          .collection("Companies")
          .doc(selectCompany.id)
          .collection("Projects")
          .doc(tempProjects[i].id)
          .collection("Tasks")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((task) => {
              let updatedTask = task.data();
              updatedTask.subTasks.forEach((sub) => {
                if (sub.assigned !== undefined) {
                  if (sub.assigned.email === email) {
                    console.log("deleted");
                    delete sub.assigned;
                  }
                }
              });
              projectTasks.push(updatedTask);
            });

            for (let j = 0; j < projectTasks.length; j++) {
              db.collection("Companies")
                .doc(selectCompany.id)
                .collection("Projects")
                .doc(tempProjects[i].id)
                .collection("Tasks")
                .doc(projectTasks[j].taskName)
                .set(projectTasks[j]);
            }
          });
      }

      console.log(tempProjects);
      for (let i = 0; i < tempProjects.length; i++) {
        await db
          .collection("Companies")
          .doc(selectCompany.id)
          .collection("Projects")
          .doc(tempProjects[i].id)
          .set(tempProjects[i]);
      }
      await db
        .collection("Companies")
        .doc(selectCompany.id)
        .set(comp)
        .then(() => {
          console.log("employee successfully deleted");
          GetEmployee(selectCompany.id);
        });
    }
  }

  async function updateClient(name, email, id) {
    if (auth.currentUser) {
      await db
        .collection("Companies")
        .doc(selectCompany.id)
        .collection("Clients")
        .doc(id)
        .set({
          ClientEmail: email,
          ClientName: name,
          id: id,
        })
        .then(() => {
          GetClients(selectCompany.id);
        });
    }
  }

  async function deleteClient(email) {
    let temp;
    selectedCompanyClients.forEach((client) => {
      if (email === client.ClientEmail) {
        temp = client;
      }
    });

    if (auth.currentUser) {
      await db
        .collection("Companies/" + selectCompany.id + "/Clients")
        .doc(temp.id)
        .delete();
      GetClients(selectCompany.id);
    }
  }

  async function GetEmployee(id) {
    let items = [];
    if (auth.currentUser) {
      items = [];

      await db
        .collection("Companies")
        .doc(id)
        .onSnapshot((querySnapshot) => {
          querySnapshot.data().users.forEach((user) => {
            items.push(user);
          });
          setSelectedCompanyEmployee(items);
          items = [];
        });
      items = [];
    }
    items = [];
  }

  async function initialGetEmployee() {
    let items = [];
    if (auth.currentUser) {
      items = [];
      await db
        .collection("Companies")
        .doc(selectCompany.id)
        .collection("Employee")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((note) => {
            let item = note.data();
            item.id = note.id;
            items.push(item);
          });
          setSelectedCompanyEmployee(items);
          items = [];
        });
      items = [];
    }
    items = [];
  }

  async function GetClients(id) {
    let items = [];
    if (auth.currentUser) {
      items = [];

      await db
        .collection("Companies")
        .doc(id)
        .collection("Clients")

        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((note) => {
            let item = note.data();
            item.id = note.id;
            items.push(item);
          });
          setSelectedCompanyClients(items);
          items = [];
        });
      items = [];
    }
    items = [];
  }

  async function initialGetClients() {
    let items = [];
    if (auth.currentUser) {
      items = [];

      await db
        .collection("Companies")
        .doc(selectCompany.id)
        .collection("Clients")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((note) => {
            let item = note.data();
            item.id = note.id;
            items.push(item);
          });
          setSelectedCompanyClients(items);
          items = [];
        });
      items = [];
    }
    items = [];
  }

  async function createNotification(email, message) {
    if (auth.currentUser) {
      await db
        .collection("Users/" + email + "/Notifications")
        .doc()
        .set({
          message: message,
          creationDate: new Date(),
          read: false,
        })
        .then(() => {
          console.log("notification succesfully written");
        });
    }
  }

  async function deleteNotification(noti) {
    if (auth.currentUser) {
      await db
        .collection("Users")
        .doc(auth.currentUser.email)
        .collection("Notifications")
        .doc(noti.id)
        .delete()
        .then(() => {
          console.log("notification successfully deleted");
          getUserNotifications();
        });
    }
  }

  async function getUserNotifications() {
    if (auth.currentUser) {
      let items = [];
      await db
        .collection("Users/" + auth.currentUser.email + "/Notifications")
        .onSnapshot((doc) => {
          items = [];
          doc.forEach((temp) => {
            let item = temp.data();
            item.id = temp.id;
            items.push(item);
          });
          setUserNotifications(items);
        });
    }
  }

  async function setUserNotificationsRead(items) {
    if (auth.currentUser) {
      await items.forEach((not) => {
        db.collection("Users/" + auth.currentUser.email + "/Notifications")
          .doc(not.id)
          .set({
            creationDate: not.creationDate,
            message: not.message,
            read: true,
          });
      });

      getUserNotifications();
    }
  }

  function authLogin() {
    return auth
      .signInWithPopup(provider)
      .then((result) => {})
      .catch((error) => {});
  }

  async function setSelectedProject1(project) {
    setLoading(true);
    localStorage.removeItem("selectedProject");
    localStorage.removeItem("selectedProjectTasks");
    localStorage.removeItem("selectedProjectNotes");
    await setSelectedProject(project);
    getProjectTasks(project);
    getProjectNotes(project);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    authLogin,
    auth,
    checkUserExist,
    updateProfile,
    insertDetailsToFirestore,
    insertProjectToFirestore,
    getCompanyProjects,
    projects,
    selectedProject,
    setSelectedProject1,
    insertCompanyToFirestore,
    fetchUserDetails,
    userDetails,
    companiesData,
    selectCompany,
    setSelectCompany,
    setSelectedCompany,
    updateDetails,
    initialUpdateDetails,
    createNotification,
    userNotifications,
    setUserNotificationsRead,
    insertTaskToFirestore,
    selectedProjectTasks,
    handleSubTaskChange,
    insertNoteToFirestore,
    selectedProjectNotes,
    insertClientToFirestore,
    selectedCompanyClients,
    selectedCompanyEmployee,
    insertEmployeeToFirestore,
    deleteEmployee,
    deleteClient,
    insertProductToFirestore,
    getProjectInventory,
    selectedProjectInventory,
    sortInventory,
    deleteProduct,
    updateProduct,
    deleteTask,
    deleteNote,
    allCompanyTasks,
    updateProject,
    deleteProject,
    updateClient,
    deleteNotification,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
