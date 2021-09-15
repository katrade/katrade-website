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
    return { getUserData, updateProfilePic, setUsername, isUserActive }
}
