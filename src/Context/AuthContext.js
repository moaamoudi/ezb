import React, { useContext, useState, useEffect } from "react";
import { auth, db, provider } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  

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

  async function updateProfile(firstName, lastName) {
    await auth.currentUser.updateProfile({
        displayName: firstName + " " + lastName,
      })
      .then(function () {
        console.log("success");
      })
      .catch(function (error) {
        console.log("failed");
      });
  }

  async function insertDetailsToFirestore(firstName, lastName, phone, companyName) {
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
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        //var credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        //var token = credential.accessToken;
        // The signed-in user info.
        //var user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        //var errorCode = error.code;
        // var errorMessage = error.message;
        // The email of the user's account used.
        // var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // ...
      });
  }

  //async function testdb() {
  // console.log(currentUser);

  //db.settings({ timestampsInSnapshots: true });

  // const userRef = db.collection("GoogleUser").add({
  //   fullname: "Hesham Amoudi",
  //   email: "klzg",
  // });
  //var temp
  // await db.collection("GoogleUser")
  //   .get()
  //   .then((snap) => {
  //     temp = snap.size // will return the collection size
  //   });

  //   console.log(temp)

  //   temp= temp +1

  //   db.collection("GoogleUser")
  //   .doc("" + temp)
  //   .set({
  //     name: "hello",
  //     state: "aaa",
  //     country: "fuck",
  //   })
  //   .then(function () {
  //     console.log("Document successfully written!");
  //   })
  //   .catch(function (error) {
  //     console.error("Error writing document: ", error);
  //   });

  //   db.collection("GoogleUser").get().then(function(querySnapshot) {
  //     querySnapshot.forEach(function(doc) {
  //         // doc.data() is never undefined for query doc snapshots
  //         console.log(doc.id, " => ", doc.data());
  //     });
  // });

  // var docRef = db.collection("GoogleUser").doc("" + currentUser.uid);

  // docRef
  //   .get()
  //   .then(function (doc) {
  //     if (doc.exists) {
  //       console.log("Document data:", doc.data());
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log("Error getting document:", error);
  //   });
  //}

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    })

    return unsubscribe;
  }, [])

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
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
