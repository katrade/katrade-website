import { useCookies } from "react-cookie"
import useLoading from "./useLoading";
import { API } from '../app.setting.json'
import { IAccount } from '../interfaces/IUser'
import axios from 'axios';

export default function useAuthorization() {
    const [cookies] = useCookies(['DaveTheHornyDuck']);
    const [show, hide] = useLoading();

    async function getUserData(): Promise<IAccount | null> {
        show()
        return await axios.get(`${API}/auth/getUserData`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
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
        show();
        return await axios.put(`${API}/user/info`, {
            profilePic: dataUrl
        },
        {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        }
        )
        .then(res => {
            window.location.reload();
        })
    }

    return { getUserData, updateProfilePic }
}
