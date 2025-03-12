import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyDh-CuNWknm3XLsRhVRSCQFynNrgKRcOOE",
  authDomain: "netflix-clone-cb705.firebaseapp.com",
  projectId: "netflix-clone-cb705",
  storageBucket: "netflix-clone-cb705.firebasestorage.app",
  messagingSenderId: "333926785093",
  appId: "1:333926785093:web:114161572c99788198832c"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth,email,password);
    const user = res.user;
    await addDoc(collection(db,'user'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch(error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
}


const login = async (email,password) => {
  try {
    await signInWithEmailAndPassword(auth,email,password)

  }catch(error){
    console.log(error)
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
}


const logout = () => {
  signOut(auth);
}

export { auth, db, login, signUp, logout}