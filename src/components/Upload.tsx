import { storage } from "../firebase/firebase";
import { uploadBytes, ref } from "firebase/storage";

const id = "11023947502938689";

export default function Upload() {

    function onFileChange(e: any) {
        e.preventDefault();
        console.log(e.target.files[0]);
        const fileName = e.target.files[0].name;
        console.log(fileName);

        const storageRef = ref(storage, `profile/${id}`);
        uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
            console.log(snapshot);
        })
    }
    
    return (
        <div>
            <input type="file" name="test" onChange={onFileChange}></input>
        </div>
    )
}