import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCi_YgKl672ZOM5U7zgJxs-uz9KUXj_J9M",
  authDomain: "tryfirst-fba16.firebaseapp.com",
  projectId: "tryfirst-fba16",
  storageBucket: "tryfirst-fba16.firebasestorage.app",
  messagingSenderId: "457536938894",
  appId: "1:457536938894:web:b89b7a50f7972f852f3adf"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
