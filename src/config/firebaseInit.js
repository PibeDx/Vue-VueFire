import firebase from "firebase";
import "firebase/firestore";
import config from "./firebase";
//Inicializamos firebase
const firebaseApp = firebase.initializeApp(config);
export default firebase;
