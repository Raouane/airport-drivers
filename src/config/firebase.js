import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAN5hZhQsb9RmspeUlVe2PimQFXbH5YUEI",
  authDomain: "raouanetransport-3656d.firebaseapp.com",
  projectId: "raouanetransport-3656d",
  storageBucket: "raouanetransport-3656d.appspot.com",
  messagingSenderId: "141265628788",
  appId: "1:141265628788:web:5aaff55ea6d24328beab21",
  measurementId: "G-T5CRD926KV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Connect to emulators
if (window.location.hostname === 'localhost') {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
  connectStorageEmulator(storage, 'localhost', 9199);
  console.log('Connected to Firebase emulators');
}

// Initialize Analytics only in production
let analytics = null;
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  analytics = getAnalytics(app);
}

export { db, storage, auth, analytics };
