import React, { useContext, useState, useEffect } from "react";
import { auth, db, provider } from "../firebase";
import StickyState from "../Components/useStickyState.js";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState();
  const [selectedProject, setSelectedProject] = useState();
  const [project, setProject] = StickyState(selectedProject, "project");

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
    goals,
    description
  ) {
    await db
      .collection("Users/" + auth.currentUser.uid + "/Projects")
      .doc("" + projectName)
      .set({
        uid: "" + auth.currentUser.uid,
        email: "" + auth.currentUser.email,
        projectName: "" + projectName,
        startDate: "" + startDate,
        endDate: "" + endDate,
        goals: "" + goals,
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
    await db
      .collection("Users")
      .doc("" + auth.currentUser.uid)
      .set({
        email: "" + auth.currentUser.email,
        firstName: "" + firstName,
        lastName: "" + lastName,
        phone: "" + phone,
        companyName: "" + companyName,
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  async function checkUserExist() {
    var exists = false;
    if (auth.currentUser) {
      await db
        .collection("Users")
        .doc("" + auth.currentUser.uid)
        .get()
        .then((doc) => {
          const data = doc.data();
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
    setProject(project);
    setSelectedProject(project);
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
    project,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
