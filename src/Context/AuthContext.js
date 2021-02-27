import React, { useContext, useState, useEffect } from "react";
import { auth, db, provider } from "../firebase";
import StickyState from "../Components/useStickyState.js";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userDetails, setUserDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState();
  const [selectedProject, setSelectedProject] = useState();
  const [companiesData, setCompaniesData] = useState()
  // const [project, setProject] = StickyState(selectedProject, "project");

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

   function getCompanies() {
    console.log("GETCOMPANIES");
    if (currentUser) {
      console.log("AFTER GETCOMPANIES IF");
       db.collection("Companies/").onSnapshot((temp) => {
        const items = [];
        temp.forEach((doc) => {
          console.log(doc.data());
          
          userDetails.companyName.forEach((company) => {
            if (doc.data().companyName === company) {
              console.log("FOUND");
              items.push(doc.data())
            }
          });

          
        });
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

  //--------------------------------------------------------------------------------------
  //RECONSTRUCT
  async function insertProjectToFirestore(
    projectName,
    startDate,
    endDate,
    description
  ) {
    await db
      .collection("Users/" + auth.currentUser.email + "/Projects")
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

    await insertCompanyToFirestore(companyName);
  }
  async function insertCompanyToFirestore(companyName) {
    var users = [
      {
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        type: "owner",
      },
    ];

    await db
      .collection("Companies")
      .doc()
      .set({
        companyName: companyName[0],
        users: users,
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  async function fetchUserDetails() {
    var details = "";
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
            // console.log(details);
            setUserDetails(details);
            
            getCompanies();
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return details;
  }

  async function checkUserExist() {
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
      setUserDetails(fetchUserDetails());
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
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
