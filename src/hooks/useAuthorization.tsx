import { useCookies } from "react-cookie"
import useLoading from "./useLoading";
import { API } from '../app.setting.json'
import { IAccount } from '../interfaces/IUser'
import axios from 'axios';
import { useHistory } from "react-router";

export default function useAuthorization() {
    const [cookies] = useCookies(['DaveTheHornyDuck']);
    const [show, hide] = useLoading();
    const history = useHistory();

    async function getUserData(): Promise<IAccount | null> {
        show("Preparing your page")
        return await axios.get(`${API}/auth/getUserData`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                if (!res.data.data.username) {
                    history.push(`/app/setup`);
                }
                hide();
                return res.data.data;
            })
            .catch(() => {
                hide();
                return null;
            })
    }

    async function updateProfilePic(dataUrl: string | undefined) {
        if (!dataUrl) {
            return false;
        }
        show("Uploading your new profile picture");
        return await axios.post(`${API}/user/updateProfilePic`, {
            profilePic: dataUrl
        },
        {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`,
                'Content-Type': 'application/json'
            }
        }
        )
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            alert(`We got some error.\n${err}`)
            return hide();
        })
    }

    async function setUsername(newUsername: string) {
        show()
        if (!newUsername) {
            alert("Username is empty.");
            return hide();
        }
        axios.put(`${API}/user/setUsername?newUsername=${newUsername}` , 
        
        {},
        {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {        
            if (res.data.value) {
                hide()
                return history.push('/app/market');
            }
            else {
                return alert(`${res.data.message}`);
            }
        })
        .catch(err => {
            alert(`We got some error.\n${err}`) 
            hide();
        })
    }

    async function isUserActive() {
        if (cookies.DaveTheHornyDuck) {
            return history.push('/app/market');
        }
    }

    async function getCategory(): Promise<any> {
        return await axios.get(`${API}/category/getAll`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                return res.data;
            })
            .catch(() => {
                return null;
            })
    }

    async function addItem(dataItem:any | undefined , arrayOfPicture:any) {
        if (!dataItem) {
            return false;
        }
        const bodyFormData = new FormData();
        bodyFormData.append('body', JSON.stringify(dataItem));
        // bodyFormData.append('files', arrayOfPicture);
        arrayOfPicture.forEach((file:any)=>{
            bodyFormData.append("files", file);
        });
        show("Uploading item to your inventory");

        return await axios({
            method: "post",
            url: `${API}/inventory`,
            data: bodyFormData,
            headers: { 
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`, 
            },
        })
            .then(res => {
                history.push(`/app/aboutaccount?component=inventory`);
            })
            .catch(err => {
                alert(`We got some error.\n${err}`)
                return hide();
            })
    }
    

    async function changeProfile(profileData: any) {
        show("Changing your profile")
        await axios.put(`${API}/user/info`, profileData, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                history.push("/app/aboutaccount?component=account")
            })
            .catch(err => {
                alert(`We got some error.\n${err}`)
                return hide();
            })
    }
        
    async function getInventory() {
        return await axios.get(`${API}/inventory/getUserInventory`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                // if (!res.data.data.username) {
                hide();
                return res.data;
            })
            .catch(() => {
                hide();
                return null;
            })
    }

    async function getDetailProduct(product_id:any) {
        show("Product Deatail");
        return await axios.get(`${API}/inventory/getInventoryById?id=${product_id}`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                // if (!res.data.data.username) {
                hide();
                return res.data;
            })
            .catch(() => {
                hide();
                return null;
            })
    }

    async function deleteMyProduct(product_id:any) {
        return await axios.delete(`${API}/inventory/deleteInventoryById?id=${product_id}`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                window.location.reload();
                hide();
            })
            .catch(() => {
                hide();
                return null;
            })
    }

    return { getUserData, updateProfilePic , getCategory,
        setUsername, isUserActive , addItem , getInventory,
        changeProfile , getDetailProduct , deleteMyProduct }
}

