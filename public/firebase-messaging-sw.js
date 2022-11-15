importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js");

try {
  var firebaseConfig = {
    //  apiKey: "AIzaSyA-WzhvZMVO8ET-Gn35oIhzjeUNd5qHL5I",
    //  authDomain: "oc-demo-2e18e.firebaseapp.com",
    //  projectId: "oc-demo-2e18e",
    //  storageBucket: "oc-demo-2e18e.appspot.com",
    //  messagingSenderId: "661213893640",
    //  appId: "1:661213893640:web:04f38bc7f7078126a66dbd",
    //  measurementId: "G-62B32NSDNT"
    apiKey: "AIzaSyAnEki3pHr1ScDfEQO1aLuU9yI_Kum0brA",
    authDomain: "the-checklist.firebaseapp.com",
    databaseURL: "https://the-checklist.firebaseio.com",
    projectId: "the-checklist",
    storageBucket: "the-checklist.appspot.com",
    messagingSenderId: "488046670226",
    appId: "1:488046670226:web:1c463debb97ef86e",
    measurementId: "G-RTK9K86VL1",
  };

  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
} catch (error) {
  console.log(error);
}

 
