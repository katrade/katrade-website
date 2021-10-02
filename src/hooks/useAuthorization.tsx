import { useCookies } from "react-cookie"
import useLoading from "./useLoading";
import { API } from '../app.setting.json'
import { IAccount } from '../interfaces/IUser'
import axios from 'axios';
import { useHistory } from "react-router";
import { resourceUsage } from "process";
import { ContactSupportOutlined } from "@material-ui/icons";
import { uploadItemPicture } from "..//utils/storage";

// test pushing changes

export default function useAuthorization() {
    const [cookies, setCookie] = useCookies(['DaveTheHornyDuck']);
    const [show, hide] = useLoading();
    const history = useHistory();

    function clearAuthCookie() {
        setCookie("DaveTheHornyDuck", "");
    }

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
                setCookie("DaveTheHornyDuck", "");
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
                // window.location.reload();
            })
            .catch(err => {
                alert(`We got some error.\n${err}`);
                clearAuthCookie();
                return hide();
            })
    }

    async function setUsername(newUsername: string) {
        show()
        if (!newUsername) {
            alert("Username is empty.");
            return hide();
        }
        axios.put(`${API}/user/setUsername?newUsername=${newUsername}`,

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
                alert(`We got some error.\n${err}`);
                clearAuthCookie();
                hide();
            })
    }

    async function isUserActive(market?: boolean, signin?: boolean) {
        if (!market && ! signin) {
            if (cookies.DaveTheHornyDuck) {
                return true;
            }
            else {
                return false;
            }
        }
        if (cookies.DaveTheHornyDuck && market) {
            return history.push('/app/market');
        }
        else if (!cookies.DaveTheHornyDuck && signin) {
            return history.push("/app/signin");
        }
        else {
            console.log("function isUserActive ERROR: Condition doesn't match");
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

    async function addItem(dataItem: any | undefined, arrayOfPicture: File[]) {
        if (!dataItem) {
            return false;
        }
        // const bodyFormData = new FormData();
        // bodyFormData.append('body', JSON.stringify(dataItem));
        // bodyFormData.append('files', arrayOfPicture);
        // arrayOfPicture.forEach((file:any)=>{
        //     bodyFormData.append("files", file);
        // });
        show("Uploading item to your inventory");

        if (!dataItem.name) {
            alert("No nameee");
            return hide();
        }
        // fetch1 (create and return an id)
        axios({
            method: "post",
            url: `${API}/inventory`,
            data: dataItem,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`,
            },
        })
            .then(res => {
                console.log("create item done!!")
                const itemId = res.data.id;
                // upload pictures to firebase storage
                uploadItemPicture(itemId, arrayOfPicture).then(output => {

                    // send array of pictures to backend here vvv
                    axios.put(`${API}/inventory/changePic`, {
                        id: itemId,
                        pictures: output
                    },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`,
                            }
                        })
                        .then(res => {
                            console.log("upload item's pictures done!!");
                            console.log(res.data);
                            if (res.data.value) {
                                if (output.length !== arrayOfPicture.length) {
                                    alert("Pictures upload may failed. Please check them again");
                                    return history.push(`/app/product?product_id=${itemId}`);
                                }
                                else {
                                    return history.push(`/app/product?product_id=${itemId}`);
                                }
                            }
                        })

                    
                })
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
                window.location.reload();
            })
            .catch(err => {
                alert(`We got some error.\n${err}`)
                return hide();
            })
    }

    async function getMyInventory() {
        show("โหลดดิ้ง..");
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

    async function getDetailProduct(product_id: any) {
        show("Product Detail");
        return await axios.get(`${API}/inventory/getInventoryById?id=${product_id}`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                hide();
                return res.data;
            })
            .catch((err) => {
                hide();
                console.log(err)
                return null;
            })
    }

    async function deleteMyProduct(product_id: any) {
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

    async function getAllInventory(): Promise<any> {
        show("โหลดดิ้ง..");
        if (!cookies.DaveTheHornyDuck) {
            return alert("No cookie???")
        }
        return await axios.get(`${API}/inventory/getAllInventory`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                hide();
                return res.data;
            })
            .catch(() => {
                hide();
                return null;
            })
    }

    // ของจะโผล่หน้า request to you ของเรา
    async function getRequest(): Promise<any> {
        show("โหลดดิ้ง..");
        return await axios.get(`${API}/user/getUserRequest`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                hide();
                return res.data;
            })
            .catch((err) => {
                hide();
                return null;
            })
    }

    // ของจะโผล่หน้า pending ของเรา
    async function getPending(): Promise<any> {
        show("โหลดดิ้ง..");
        return await axios.get(`${API}/user/getUserPending`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                hide();
                return res.data;
            })
            .catch((err) => {
                hide();
                return null;
            })
    }

    async function postMyReqeust(dataArray: any | undefined) {
        show("ติดต่อขอแลกเปลี่ยน..");
        return await axios.post(`${API}/user/newRequest`, dataArray,
            {
                headers: {
                    'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`,
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => {
                hide();
                window.location.reload();
            })
            .catch(err => {
                alert(`We got some error.\n${err}`)
                return hide();
            })
    }

    async function getFavourite() {
        show("โหลดดิ้ง..");
        return await axios.get(`${API}/user/favourite`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                hide();
                return res.data;
            })
            .catch((err) => {
                hide();
                return null;
            })
    }

    async function addFavourite(product_id: any) {
        return await axios.patch(`${API}/user/pushFavourite`, { id: product_id }, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                // window.location.reload();
            })
            .catch((err) => {
                hide();
                console.log(err)
                return null;
            })
    }

    async function deleteFavourite(product_id: any, checkpath: any) {
        return await axios.patch(`${API}/user/pullFavourite`, { id: product_id }, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                console.log("ลบเรียบร้อย")
                console.log(checkpath)
                if (checkpath != "/app/product") {
                    window.location.reload();
                    // history.push("/app/aboutaccount?component=favorite")
                }
            })
            .catch((err) => {
                hide();
                console.log(err)
                return null;
            })
    }

    async function deleteMyRequestPending(requestpending_id: any) {
        return await axios.delete(`${API}/user/cancelRequest?id=${requestpending_id}`, {
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

    async function getAnotherUser(user_id: any) {
        show("โหลดดิ้ง..");
        return await axios.get(`${API}/user/searchID?id=${user_id}`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                hide();
                return res.data;
            })
            .catch((err) => {
                hide();
                return null;
            })
    }

    async function acceptRequest(request_id: any) {
        return await axios.patch(`${API}/user/acceptRequest`, { id: request_id }, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                window.location.reload();
            })
            .catch((err) => {
                hide();
                console.log(err)
                return null;
            })
    }

    async function getInprogress() {
        show("โหลดดิ้ง..");
        return await axios.get(`${API}/user/getUserProgess`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                console.log(res)
                hide();
                return res.data;
            })
            .catch((err) => {
                hide();
                return null;
            })
    }

    return {
        getUserData,
        updateProfilePic,
        getCategory,
        setUsername,
        isUserActive,
        addItem,
        getMyInventory,
        changeProfile,
        getDetailProduct,
        deleteMyProduct,
        getAllInventory,
        getRequest,
        getPending,
        postMyReqeust,
        getFavourite,
        addFavourite,
        deleteFavourite,
        deleteMyRequestPending,
        getAnotherUser,
        acceptRequest,
        getInprogress,
    }
}