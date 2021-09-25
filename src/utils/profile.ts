import { storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function upload(files: File[], id: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        if (files.length !== 1) {
            throw new Error("Only 1 file can be upload.");
        }
        const target = files[0];
        const storageRef = ref(storage, `profile/${id}`);
        uploadBytes(storageRef, target)
            .then((snapshot) => {
                resolve(`https://firebasestorage.googleapis.com/v0/b/letskatrade.appspot.com/o/profile%2F${id}?alt=media`);
            })
            .catch((err) => {
                throw new Error(err)
            })
    })
    
}

