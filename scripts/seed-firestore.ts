import { initializeApp } from "firebase/app";
import { getFirestore, doc, writeBatch } from "firebase/firestore";

import { defaultProjects, defaultSiteContent } from "../lib/portfolio-defaults.ts";

const firebaseConfig = {
  apiKey: "AIzaSyB6XV8UauIc5QZRgoI4K5mLZu0mhlAOeVk",
  authDomain: "nexsourc-28c04.firebaseapp.com",
  projectId: "nexsourc-28c04",
  storageBucket: "nexsourc-28c04.appspot.com",
  messagingSenderId: "406710726323",
  appId: "1:406710726323:web:e01a87bbcb4038b0d60ac6",
  measurementId: "G-6QBPYE69J9",
};

async function seed() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const batch = writeBatch(db);

  batch.set(doc(db, "settings", "siteContent"), defaultSiteContent, {
    merge: true,
  });

  defaultProjects.forEach((project) => {
    batch.set(doc(db, "projects", project.slug), project, {
      merge: true,
    });
  });

  await batch.commit();
  console.log(`Seeded ${defaultProjects.length} projects and site content.`);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
