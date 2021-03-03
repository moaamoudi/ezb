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
  const [selectedProject, setSelectedProject] = useState();
  const [companiesData, setCompaniesData] = useLocalStorage(
    "companiesData",
    {}
  );
  const [selectCompany, setSelectCompany] = useLocalStorage(
    "selectedCompany",
    companiesData[0]
  );


  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
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
    console.log(selectCompany);
    console.log("company changed");
    setSelectCompany(company);
    console.log(selectCompany);
  }

  async function getCompanies() {
    setLoading(true);
    var items = [];
    if (auth.currentUser) {
      console.log(userDetails);
      await db.collection("Companies/").onSnapshot((temp) => {
        temp.forEach((doc) => {
          doc.data().users.forEach((user) => {
            console.log(doc.data());
            if (user.email === auth.currentUser.email) {
              console.log(user.email);
              items.push(doc.data());
            }
          });
        });
        console.log(items);
        setCompaniesData(items);
      });
    }
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
    await db.collection("Companies").onSnapshot((temp) => {
      temp.forEach((doc) => {
        doc.data().users.forEach((user) => {
          if (user.email === auth.currentUser.email) {
            if (doc.data().companyName === selectCompany.companyName) {
              if (user.type === "owner") {
                db.collection("Companies/" + doc.id + "/projects")
                  .doc("" + projectName)
                  .set({
                    uid: "" + auth.currentUser.uid,
                    email: "" + auth.currentUser.email,
                    projectName: "" + projectName,
                    startDate: "" + startDate,
                    endDate: "" + endDate,
                    description: "" + description,
                  })
                  .then(function () {
                    console.log("Document successfully written!");
                  })
                  .catch(function (error) {
                    console.error("Error writing document: ", error);
                  });
              }
            }
          }
        });
      });
    });
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
    setLoading(true);

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
    setLoading(false);
  }

  async function updateDetails() {
    await fetchUserDetails();
    await getCompanies();
    await setSelectedCompany(selectCompany)
    setLoading(false)
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
  }

  async function fetchUserDetails() {
    setLoading(true);

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
    setLoading(true);
    var exists = false;
    if (auth.currentUser) {
      await db
        .collection("Users")
        .doc("" + auth.currentUser.email)
        .get()
        .then((doc) => {
          const data = doc.data();
          console.log(data);
          if (data !== undefined) {
            exists = true;
            return exists;
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
      return exists;
    }
  }

  function authLogin() {
    return auth
      .signInWithPopup(provider)
      .then((result) => {})
      .catch((error) => {});
  }

  function setSelectedProject1(project) {
    // setProject(project);
    // setSelectedProject(project);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   const data = localStorage.getItem("userDetails");

  //   console.log(data);
  //   if (data !== "undefined") {
  //     console.log(data);
  //     setUserDetails(JSON.parse(data));
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log(userDetails);
  //   if (userDetails) {
  //     console.log(userDetails);
  //     localStorage.setItem("userDetails", JSON.stringify(userDetails));
  //   }
  // }, []);

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
