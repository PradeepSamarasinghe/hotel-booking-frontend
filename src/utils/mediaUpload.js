import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getStorage } from "firebase/storage";
import app from "../config/firebase";

// Initialize Firebase Storage
const storage = getStorage(app);

export function uploadImage(file, path, onProgress) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("No file provided"));

    const filename = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `${path}/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      snapshot => {
        if (typeof onProgress === "function") {
          const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          onProgress(percent);
        }
      },
      error => {
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({ url: downloadURL });
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}
