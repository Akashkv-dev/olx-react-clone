import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDv5dWRoBBk11Mw2CwtQel-2moDnCGvZ6o",
    authDomain: "olx-clone-924a7.firebaseapp.com",
    projectId: "olx-clone-924a7",
    storageBucket: "olx-clone-924a7.appspot.com",
    messagingSenderId: "656665055539",
    appId: "1:656665055539:web:296dbebec3c0b24c71ee46",
    measurementId: "G-JXS80CXTDS"
  };

export const Firebase= initializeApp(firebaseConfig);
export const auth =getAuth(Firebase);
export const firestore =getFirestore(Firebase);
export const storage = getStorage(Firebase)
