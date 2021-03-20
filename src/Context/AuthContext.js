import React, { useContext, useState, useEffect, useCallback } from "react";
import { auth, db, provider } from "../firebase";
import { format } from "date-fns";
import { set } from "date-fns";
import useLocalStorage from "../Components/useLocalStorage.js";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userDetails, setUserDetails] = useLocalStorage("userDetails", []);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useLocalStorage("CompanyProjects", []);
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
    let temp;
    if (auth.currentUser) {
      await db
        .collection("Companies")
        .doc("" + company.id)
        .onSnapshot((querySnapshot) => {
          console.log(querySnapshot.data());
          console.log("company changed");
          setSelectCompany(querySnapshot.data());

          getCompanyProjects(querySnapshot.data().id);
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
      setSelectedCompany(items[0]);
      getCompanyProjects(items[0].id);
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

    if (currentUser) {
      db.collection("Companies/" + id + "/Projects").onSnapshot((temp) => {
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
    var project = {
      uid: "" + auth.currentUser.uid,
      email: "" + auth.currentUser.email,
      projectName: "" + projectName,
      startDate: "" + startDate,
      endDate: "" + endDate,
      description: "" + description,
    };

    companiesData.forEach((company) => {
      if (company.companyName === selectCompany.companyName) {
        company.users.forEach((user) => {
          if (user.email === auth.currentUser.email) {
            if (user.type === "owner") {
              db.collection("Companies/" + selectCompany.id + "/Projects")
                .doc("" + projectName)
                .set({
                  companyName: selectCompany.companyName,
                  id: selectCompany.id,
                  uid: "" + auth.currentUser.uid,
                  email: "" + auth.currentUser.email,
                  projectName: "" + projectName,
                  startDate: "" + startDate,
                  endDate: "" + endDate,
                  description: "" + description,
                  users: selectCompany.users,
                })
                .then(function () {
                  console.log("Document successfully written!");
                })
                .catch(function (error) {
                  console.error("Error writing document: ", error);
                });
            }
          }
        });
      }
    });
    await updateDetails();
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
        .doc("" + selectedProject.projectName)
        .collection("Tasks")
        .doc("" + taskName)
        .set({
          taskName: taskName,
          taskDescripiton: taskDescripiton,
          startDate: startDate,
          endDate: endDate,
          complete: false,
          subTasks: subTasks,
        })
        .then(() => {
          console.log("task written succesfully");
          getProjectTasks(selectedProject);
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
        .doc(project.projectName)
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
        .doc(selectedProject.projectName)
        .collection("Tasks")
        .doc(task.taskName)
        .set(task)
        .then(() => {
          console.log("subtask succesfully edited");
          getProjectTasks(selectedProject);
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
        .doc(selectedProject.projectName)
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

  async function getProjectNotes(project) {
    let items = [];
    if (auth.currentUser && project) {
      items = [];

      await db
        .collection("Companies")
        .doc(selectCompany.id)
        .collection("Projects")
        .doc(project.projectName)
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
    await fetchUserDetails();
    await getUserNotifications();
    await initialGetCompanies();
    await getCompanyProjects(selectCompany.id);

    for (let index = 0; index < companiesData.length; index++) {
      if (companiesData[index].companyName === selectCompany.companyName) {
        await setSelectedCompany(companiesData[index]);
      }
    }
  }

  async function updateDetails() {
    await fetchUserDetails;
    await getCompanies();
  }

  async function insertCompanyToFirestore(companyName) {
    setLoading(true);
    var users = [
      {
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        type: "owner",
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
    setLoading(false);
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

  async function createNotification() {
    if (auth.currentUser) {
      await db
        .collection("Users/" + auth.currentUser.email + "/Notifications")
        .doc()
        .set({
          message: "Create notification test",
          creationDate: new Date(),
          read: false,
        })
        .then(() => {
          console.log("notification succesfully written");
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
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
