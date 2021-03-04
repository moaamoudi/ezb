import React, { useContext, useState, useEffect, useCallback } from "react";
import { auth, db, provider } from "../firebase";

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
  const [projects, setProjects] = useState();
  const [selectedProject, setSelectedProject] = useLocalStorage(
    "selectedProject",
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

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("companiesData");
    localStorage.removeItem("selectedCompany");
    localStorage.removeItem("selectedProject");
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

  function setSelectedCompany(company) {
    console.log("company changed");
    setSelectCompany(company);
  }

  async function getCompanies() {
    let items = [];
    if (auth.currentUser) {
      console.log(userDetails);
      items = [];
      await db.collection("Companies").onSnapshot((temp) => {
        temp.forEach((doc) => {
          doc.data().users.forEach((user) => {
            if (user.email === auth.currentUser.email) {
              console.log(user.email);
              var item = doc.data();
              item.id = doc.id;
              items.push(item);
            }
          });
        });
        console.log(items);
        setCompaniesData(items);
        setSelectedCompany(items[0]);
        items = [];
      });
    }
    items = [];
  }

  //--------------------------------------------------------------------------------------
  //RECONSTRUCT
  async function getUserProjects() {
    if (currentUser) {
      db.collection("Users/" + currentUser.uid + "/Projects").onSnapshot(
        (temp) => {
          const items = [];
          temp.forEach((doc) => {
            items.push(doc.data());
          });
          setProjects(items);
        }
      );
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
    selectCompany.projects.push(project);

    companiesData.forEach((company) => {
      if (company.companyName === selectCompany.companyName) {
        company.users.forEach((user) => {
          if (user.email === auth.currentUser.email) {
            if (user.type === "owner") {
              db.collection("Companies")
                .doc("" + selectCompany.id)
                .set({
                  companyName: selectCompany.companyName,
                  id: selectCompany.id,
                  users: selectCompany.users,
                  projects: selectCompany.projects,
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
    await updateDetails();
  }

  async function updateDetails() {
    await fetchUserDetails();
    await getCompanies();

    for (let index = 0; index < companiesData.length; index++) {
      if (companiesData[index].companyName === selectCompany.companyName) {
        await setSelectedCompany(companiesData[index]);
      }
    }
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
    setSelectedCompany(company);
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

  function authLogin() {
    return auth
      .signInWithPopup(provider)
      .then((result) => {})
      .catch((error) => {});
  }

  function setSelectedProject1(project) {
    setSelectedProject(project);
    setLoading(false);
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
    getUserProjects,
    projects,
    selectedProject,
    setSelectedProject1,
    insertCompanyToFirestore,
    getCompanies,
    // project,
    fetchUserDetails,
    userDetails,
    companiesData,
    selectCompany,
    setSelectCompany,
    setSelectedCompany,
    updateDetails,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
