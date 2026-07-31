import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  projectId: "funky-mantis-nr4g1",
  appId: "1:817998457375:web:7b6b921ebcc58104b5432a",
  apiKey: "AIzaSyBD--xN8YE_MpLMboJemU3Zg9MvojcHBN4",
  authDomain: "funky-mantis-nr4g1.firebaseapp.com",
  storageBucket: "funky-mantis-nr4g1.firebasestorage.app",
  messagingSenderId: "817998457375"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
