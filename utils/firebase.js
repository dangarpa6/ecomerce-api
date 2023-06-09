const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyBd1RadfrbP4vjsgnJ_cXbKySCN7guNZwg",
  authDomain: "wifisalesboost-a8a1a.firebaseapp.com",
  projectId: "wifisalesboost-a8a1a",
  storageBucket: "wifisalesboost-a8a1a.appspot.com",
  messagingSenderId: "1017267524065",
  appId: "1:1017267524065:web:bd3a42cf49676163a282a0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = { storage };
