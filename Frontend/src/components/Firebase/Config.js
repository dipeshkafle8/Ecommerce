import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBeqkgNKwbYXJlvcKI0UkSZmylf6KNKsx8",
  authDomain: "ecommerce-d3b60.firebaseapp.com",
  projectId: "ecommerce-d3b60",
  storageBucket: "ecommerce-d3b60.appspot.com",
  messagingSenderId: "777034381586",
  appId: "1:777034381586:web:5316eb16a330e1fd829bcb",
  measurementId: "G-WB3VZGJEWL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const storage = getStorage(app);
