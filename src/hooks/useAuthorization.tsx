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

    return [getUserData]
}
