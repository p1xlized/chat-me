import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore';


//bulma
import 'bulma/css/bulma.css';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
// Initialize Firebase and store the app instance in 'app'
const app = initializeApp(firebaseConfig);

// Create a Firestore instance
const db = getFirestore(app);

// Export the db variable
export { db };

// Create the Vue app
createApp(App).use(router).mount('#app');

