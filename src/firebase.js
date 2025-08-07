// 📁 src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDdDJwge9ELOsOgzQER0RC5cL_1mvwxbw0",
  authDomain: "valdora-test-quiz.firebaseapp.com",
  projectId: "valdora-test-quiz",
  storageBucket: "valdora-test-quiz.firebasestorage.app",
  messagingSenderId: "383006582624",
  appId: "1:383006582624:web:1805c08152ae5aa30ca005",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
