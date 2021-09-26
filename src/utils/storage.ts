import { storage } from "../firebase/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { error } from "console";

export function uploadProfilePic(files: File[], id: string): Promise<string> {
    const accepts = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/heic",
        "image/HEIC"
    ]
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

        uploadBytes(storageRef,  target)
            .then(snapshot => {
                resolve(`https://firebasestorage.googleapis.com/v0/b/letskatrade.appspot.com/o/profile%2F${id}?alt=media`);
            })
            .catch(err => {
                throw new Error(err);
            })
    })
}