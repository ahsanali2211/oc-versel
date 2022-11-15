// import firebase from 'firebase/app'
// import  FirebaseApp  from 'firebase/app'
// // import 'firebase/firebase-messaging'
// const firebasenew =FirebaseApp
// var firebaseConfig = {
//     apiKey: "AIzaSyA-WzhvZMVO8ET-Gn35oIhzjeUNd5qHL5I",
//     authDomain: "oc-demo-2e18e.firebaseapp.com",
//     projectId: "oc-demo-2e18e",
//     storageBucket: "oc-demo-2e18e.appspot.com",
//     messagingSenderId: "661213893640",
//     appId: "1:661213893640:web:04f38bc7f7078126a66dbd",
//     measurementId: "G-62B32NSDNT"
// }

// firebasenew.initializeApp(firebaseConfig)
//     export default  firebasenew.messaging()

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // apiKey: "AIzaSyA-WzhvZMVO8ET-Gn35oIhzjeUNd5qHL5I",
  // // authDomain: "oc-demo-2e18e.firebaseapp.com",
  // projectId: "oc-demo-2e18e",
  // // storageBucket: "oc-demo-2e18e.appspot.com",
  // messagingSenderId: "661213893640",
  // appId: "1:661213893640:web:04f38bc7f7078126a66dbd",
  // // measurementId: "G-62B32NSDNT"
  apiKey: "AIzaSyAnEki3pHr1ScDfEQO1aLuU9yI_Kum0brA",
  authDomain: "the-checklist.firebaseapp.com",
  databaseURL: "https://the-checklist.firebaseio.com",
  projectId: "the-checklist",
  storageBucket: "the-checklist.appspot.com",
  messagingSenderId: "488046670226",
  appId: "1:488046670226:web:1c463debb97ef86e",
  measurementId: "G-RTK9K86VL1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

//    export default firebaseMessaging
export const getUserToken = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      "BMYh05o-FRLnk7OzQ8pB5Tn26eLkTb56zKWLN9TibuixA7hbwFuxIn2ktLKbRPo-fdOM-xtZ42NSElJB2WQcX3s",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        // setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
