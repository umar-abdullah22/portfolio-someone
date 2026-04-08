"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB6XV8UauIc5QZRgoI4K5mLZu0mhlAOeVk",
  authDomain: "nexsourc-28c04.firebaseapp.com",
  projectId: "nexsourc-28c04",
  storageBucket: "nexsourc-28c04.appspot.com",
  messagingSenderId: "406710726323",
  appId: "1:406710726323:web:e01a87bbcb4038b0d60ac6",
  measurementId: "G-6QBPYE69J9",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
