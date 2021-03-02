import React, { useContext, useState, useEffect, useCallback } from "react";
import { auth, db, provider } from "../firebase";
import StickyState from "../Components/useStickyState.js";
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
  
  const [selectCompany, setSelectCompany] = useState(companiesData[0]);
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

  async function getCompanies() {
    setLoading(true);
    var items = [];
    if (auth.currentUser) {
      console.log(userDetails);
      await db.collection("Companies/").onSnapshot((temp) => {
        temp.forEach((doc) => {
          doc.data().users.forEach((user) => {
            if (user.email === auth.currentUser.email) {
              console.log(user.email);
              items.push(doc.data());
            }
          });

          // userDetails.companyName.forEach((company) => {
          //   if (doc.data().companyName === company) {
          //     console.log("FOUND");
          //     items.push(doc.data());
          //   }
          // });
        });
        console.log(items);
        setCompaniesData(items);
        // localStorage.setItem("companiesData", JSON.stringify(items));
      });
    }
    setLoading(false);
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
      await db
        .collection("Companies").onSnapshot((temp) => {
          temp.forEach((doc) => {
            doc.data().users.forEach((user) => {
              if (user.email === auth.currentUser.email) {
               if(user.type ==="owner"){
                 db.collection("Companies/"+doc.id+"/projects").doc(""+projectName).set({
  
           uid: "" + auth.currentUser.uid,
           email: "" + auth.currentUser.email,
           projectName: "" + projectName,
           startDate: "" + startDate,
           endDate: "" + endDate,
           description: "" + description
                 }).then(function () {
                    console.log("Document successfully written!");
                  })
                  .catch(function (error) {
                    console.error("Error writing document: ", error);
                  });
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

    await insertCompanyToFirestore(companyName);
    setLoading(false);
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
    setLoading(false);
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
            // localStorage.setItem("userDetails", JSON.stringify(details));
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setLoading(false);
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
      await fetchUserDetails();
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
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
