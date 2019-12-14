import firebase from "firebase";
/* const firebaseConfig = {
  apiKey: "AIzaSyB0DJ6WKIcvdh5Su1KIFxdUKAUJ8TvubWU",
  authDomain: "gaming-application-dba5c.firebaseapp.com",
  databaseURL: "https://gaming-application-dba5c.firebaseio.com", // hyperinfinite
  projectId: "gaming-application-dba5c",
  storageBucket: "",
  messagingSenderId: "63237393870",
  appId: "1:63237393870:web:038b9759c580d228382f9f"
}; */
const firebaseConfig = {
  apiKey: "AIzaSyCivKkpQcaKHTFOtLxyhi3mM5H8s1aouSE",
  authDomain: "social-networking-gariyasi.firebaseapp.com",
  databaseURL: "https://social-networking-gariyasi.firebaseio.com",
  projectId: "social-networking-gariyasi",
  storageBucket: "social-networking-gariyasi.appspot.com",
  messagingSenderId: "525478900402",
  appId: "1:525478900402:web:33dfcac1cd8f0120394fab"
};
const Firebase = firebase.initializeApp(firebaseConfig);
export default Firebase;
