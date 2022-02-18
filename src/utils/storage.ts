import { storage } from "../firebase/firebase";
import { ref, uploadBytes } from "firebase/storage";
import axios from "axios";

const accepts = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/heic",
  "image/HEIC",
];

export function uploadProfilePic(files: File[], id: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (!id) {
      throw new Error("No id is given");
    }
    if (files.length !== 1) {
      throw new Error("Require only 1 file");
    }
    const storageRef = ref(storage, `profile/${id}`);
    const target = files[0];
    if (!accepts.includes(target.type)) {
      throw new Error("File type not supported");
    }

    uploadBytes(storageRef, target)
      .then((snapshot) => {
        console.log(snapshot);
        resolve(
          `https://firebasestorage.googleapis.com/v0/b/letskatrade.appspot.com/o/profile%2F${id}?alt=media`
        );
      })
      .catch((err) => {
        throw new Error(err);
      });
  });
}

export function uploadItemPicture(
  _id: string,
  pictures: File[]
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const output: string[] = [];
    for (var i = 0; i < pictures.length; i++) {
      const fileName = `${_id}-${i}`;
      const storageRef = ref(storage, `items/${fileName}`);
      const target = pictures[i];
      output.push(
        `https://firebasestorage.googleapis.com/v0/b/letskatrade.appspot.com/o/items%2F${fileName}?alt=media`
      );

      if (!accepts.includes(target.type)) {
        throw new Error("File type not supported");
      }

      uploadBytes(storageRef, target)
        .then((snapshot) => {})
        .catch((err) => {
          throw new Error(err);
        });
    }
    resolve(output);
  });
}
