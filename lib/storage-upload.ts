"use client";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { storage } from "@/lib/firebase";

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9.-]+/g, "-").toLowerCase();
}

export async function uploadImageFile(file: File, folder: string) {
  const extension = file.name.split(".").pop() ?? "jpg";
  const objectPath = `${folder}/${Date.now()}-${sanitizeFileName(
    file.name.replace(`.${extension}`, "")
  )}.${extension}`;
  const storageRef = ref(storage, objectPath);

  await uploadBytes(storageRef, file, {
    contentType: file.type || "image/jpeg",
  });

  return getDownloadURL(storageRef);
}
