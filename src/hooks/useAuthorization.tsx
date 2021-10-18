import { useCookies } from "react-cookie"
import useLoading from "./useLoading";
import { API } from '../app.setting.json'
import { IAccount } from '../interfaces/IUser'
import axios from 'axios';
import { useHistory } from "react-router";
// import { resourceUsage } from "process";
// import { ContactSupportOutlined } from "@material-ui/icons";
import { uploadItemPicture } from "..//utils/storage";
import { IChat, IContact, IDealing, IMessage } from "../interfaces/Chat";
// import { connectStorageEmulator } from "@firebase/storage";

// test pushing changes

export default function useAuthorization() {
    const [cookies, setCookie] = useCookies(['DaveTheHornyDuck']);
    const [show, hide] = useLoading();
    const history = useHistory();

    function clearAuthCookie() {
        setCookie("DaveTheHornyDuck", "");
    }

    async function getUserData(): Promise<IAccount | null> {
        // show()
        return await axios.get(`${API}/auth/getUserData`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                if (!res.data.data.username) {
                    history.push(`/app/setup`);
                }
                ;
                return res.data.data;
            })
            .catch(() => {
                setCookie("DaveTheHornyDuck", "");
                ;
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
                return;
            })
    }

    async function setUsername(newUsername: string) {
        show()
        if (!newUsername) {
            alert("Username is empty.");
            return;
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

                    return history.push('/app/market');
                }
                else {
                    return alert(`${res.data.message}`);
                }
            })
            .catch(err => {
                alert(`We got some error.\n${err}`);
                clearAuthCookie();
                ;
            })
    }

    async function isUserActive(market?: boolean, signin?: boolean) {
        if (!market && !signin) {
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
        // console.log(dataItem)
        if (!dataItem) {
            return false;
        }
        show("Uploading item to your inventory");

        if (!dataItem.name) {
            alert("Please name the item");
            return;
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
                            if (res.data.value) {
                                if (output.length !== arrayOfPicture.length) {
                                    alert("Pictures upload may failed. Please check them again");
                                    return history.push(`/app/product?product_id=${itemId}`);
                                }
                                else {
                                    return history.push(`/app/aboutaccount?component=inventory`);
                                }
                            }
                        })


                })
            })
            .catch(err => {
                alert(`We got some error.\n${err}`)
                return;
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
                return;
            })
    }

    async function getMyInventory() {

        return await axios.get(`${API}/inventory/getUserInventory`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                ;
                return res.data;
            })
            .catch(() => {
                ;
                return null;
            })
    }

    async function getDetailProduct(product_id: any) {

        return await axios.get(`${API}/inventory/getInventoryById?id=${product_id}`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                ;
                return res.data;
            })
            .catch((err) => {
                ;
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
            })
            .catch(() => {
                ;
                return null;
            })
    }

    async function getAllInventory(): Promise<any> {
        if (!cookies.DaveTheHornyDuck) {
            alert("Please sign in again");
            window.location.reload();
        }
        return await axios.get(`${API}/inventory/getAllInventory`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                ;
                return res.data;
            })
            .catch(() => {
                ;
                return null;
            })
    }

    // ของจะโผล่หน้า request to you ของเรา
    async function getRequest(): Promise<any> {

        return await axios.get(`${API}/user/getUserRequest`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                ;
                return res.data;
            })
            .catch((err) => {
                ;
                return null;
            })
    }

    // ของจะโผล่หน้า pending ของเรา
    async function getPending(): Promise<any> {
        // show("โหลดดิ้ง..");
        return await axios.get(`${API}/user/getUserPending`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                ;
                return res.data;
            })
            .catch((err) => {
                ;
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
                ;
                if (res.data.value == false) {
                    hide();
                    alert("ส่งคำขอ ล้มเหลว");
                    // window.location.reload();
                } else {
                    hide();
                    alert("ส่งคำขอ สำเร็จ, คำขอจะอยู่ใน pending");
                    // window.location.reload();
                    // history.push("/app/request")
                }
            })
            .catch(err => {
                alert(`We got some error.\n${err}`)
                return;
            })
    }

    async function getFavourite() {
        // show("โหลดดิ้ง..");
        return await axios.get(`${API}/user/favourite`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                ;
                return res.data;
            })
            .catch((err) => {
                ;
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
                ;
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
                // if (checkpath != "/app/product") {
                //     window.location.reload();
                // }
            })
            .catch((err) => {
                ;
                console.log(err)
                return null;
            })
    }

    async function deleteMyRequestPending(requestpending_id: any) {
        console.log(requestpending_id);
        // show("โหลดดิ้ง..");
        return await axios.delete(`${API}/user/cancelRequest?id=${requestpending_id}`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                // window.location.reload();
                // ;
            })
            .catch(() => {
                ;
                return null;
            })
    }

    async function getAnotherUser(user_id: any) {
        // show("โหลดดิ้ง..");
        return await axios.get(`${API}/user/searchID?id=${user_id}`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                ;
                return res.data;
            })
            .catch((err) => {
                ;
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
                ;
                console.log(err)
                return null;
            })
    }

    async function getInprogress() {
        // show("โหลดดิ้ง..");
        return await axios.get(`${API}/user/getUserProgess`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                ;
                return res.data;
            })
            .catch((err) => {
                ;
                return null;
            })
    }

    async function getFollow() {
        // show();
        return await axios.get(`${API}/user/follow`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                ;
                return res.data;
            })
            .catch((err) => {
                ;
                console.log(err)
                return null;
            })
    }

    async function getFollowCheck(user_id: any) {
        // show();
        return await axios.get(`${API}/user/checkFollow?id=${user_id}`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                ;
                return res.data;
            })
            .catch((err) => {
                ;
                console.log(err)
                return null;
            })
    }

    async function onFollow(user_id: any) {
        return await axios.post(`${API}/user/follow`, { id: user_id }, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
            })
            .catch((err) => {
                ;
                console.log(err)
                return null;
            })
    }
    async function unFollow(user_id: any) {
        return await axios.post(`${API}/user/unFollow`, { id: user_id }, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
            })
            .catch((err) => {
                ;
                console.log(err)
                return null;
            })
    }
    async function getUserFollowData(user_id: any) {
        return await axios.get(`${API}/user/getFollowById?id=${user_id}`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                ;
                return res.data;
            })
            .catch((err) => {
                ;
                console.log(err)
                return null;
            })
    }
    async function getUserIdArray(user_id: any) {
        return await axios.post(`${API}/user/getUserFromIdArray`, { data: user_id }, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                ;
                return res.data;
            })
            .catch((err) => {
                ;
                console.log(err)
                return null;
            })
    }

    async function LockRequest(request_id: any, product_id: any) {
        return await axios.patch(`${API}/user/lockRequest`, { id: request_id, inventoryId: product_id }, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err)
                return null;
            })
    }

    async function deleteMyLockRequestPending(requestpending_id: any) {
        // show("โหลดดิ้ง..");
        return await axios.patch(`${API}/user/cancelLockRequest`, { id: requestpending_id }, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                // window.location.reload();
            })
            .catch(() => {
                ;
                return null;
            })
    }

    async function getSearch(searchword: any) {
        return await axios.get(`${API}/inventory/search?query=${searchword}`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                ;
                return res.data;
            })
            .catch(() => {
                ;
                return null;
            })
    }

    async function finishTrade(request_id: any) {
        return await axios.post(`${API}/user/finishTrade`, { requestId: request_id }, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                window.location.reload();
                return res.data;
            })
            .catch((err) => {
                hide();
                console.log(err)
                return null;
            })
    }

    async function getHistory() {
        // show("โหลดดิ้ง..");
        return await axios.get(`${API}/user/getUserHistory`, {
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

    async function getAnotherInventory(user_id: any) {
        // show("โหลดดิ้ง..");
        return await axios.get(`${API}/inventory/getInventoryByUserId?id=${user_id}`, {
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

    async function getChatData(roomID: string): Promise<IChat | null> {
        // show()
        return await axios.get(`https://socketkatrade.herokuapp.com/chatroom/getroom?roomid=${roomID}`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                // console.log(res)
                return res.data;
            })
            .catch(() => {
                setCookie("DaveTheHornyDuck", "");
                return null;
            })
    }

    async function getMatchProduct(product_id: any) {
        // show("โหลดดิ้ง..");
        return await axios.get(`${API}/inventory/getMatchInventory?id=${product_id}`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                // hide();
                return res.data;
            })
            .catch(() => {
                // hide();
                return null;
            })
    }

    async function getChatList(userId: string): Promise<IContact | null> {
        // show()
        return await axios.get(`https://socketkatrade.herokuapp.com/user/getUserFromId?userId=${userId}`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                // console.log("yu nee" + res)
                return res.data;
            })
            .catch(() => {
                setCookie("DaveTheHornyDuck", "");
                return null;
            })
    }
    
    const changePasswordSubmit  = async (currentPassword: string, newPassword: string, confirmNewPassword: string) =>  {
        if (currentPassword != null && (newPassword === confirmNewPassword)) {
            let data: any = {
                currentPassword: currentPassword,
                newPassword: newPassword,
            }
            // console.log(data.currentPassword);
            // console.log(data.newPassword);
            // show("Changing Password . . .");
            axios.patch(`${API}/auth/changePassword`, {currentPassword: currentPassword, newPassword: newPassword,},
            {
                headers: {
                    'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                // console.log(response);
                if (response.data.value === true) {
                   show("Successfull Change Password!");
                   window.location.reload();
                }
                else {
                    alert("เช็คพาสเดิมดีๆหน่อยดิพี่ชุย")
                }
            })
        }
        else {
            alert("กรอกให้ครบสิวะเห้ย")
        }
    }

    async function updateUserContact(userId: string, userName: string, contactId: string, contactName: string) {
        // console.log("updateUserContact()")
        // console.log(userName)
        axios.put(`https://socketkatrade.herokuapp.com/user/newUserContact`,
        {
            userId: userId,
            userName: userName,
            contactId: contactId,
            contactName: contactName
        },
            {
                headers: {
                    'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                // console.log("yu nee" + res)
                return res.data;
            })
            .catch(() => {
                setCookie("DaveTheHornyDuck", "");
                return null;
            })
    }

    async function getDealingList(userId: string): Promise<IDealing[] | null> {
        // show()
        return await axios.get(`${API}/user/getDealing?id=${userId}`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                // console.log("Dealing" + res)
                return res.data;
            })
            .catch(() => {
                setCookie("DaveTheHornyDuck", "");
                hide();
                return null;
            })
    }

    async function getMatchMarket() {
        // show("โหลดดิ้ง..");
        return await axios.get(`${API}/inventory/getMatch`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                return res.data;
            })
            .catch(() => {
                setCookie("DaveTheHornyDuck", "");
                hide();
                return null;
            })
    }

    async function getLastChatData(roomID: string): Promise<IMessage | null> {
        // show()
        return await axios.get(`https://socketkatrade.herokuapp.com/chatroom/getLastMessage?roomid=${roomID}`, {
            headers: {
                'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
            }
        })
            .then(res => {
                // console.log(res) 
                return res.data;
            })
            .catch(() => {
                setCookie("DaveTheHornyDuck", "");
                return null;
            })
    }

    async function replaceAllUserContact(userId: string, duoId: string) {
        // console.log("updateUserContact()")
        axios.put(`https://socketkatrade.herokuapp.com/user/updateUserContact`,
        {
            userId: userId,
            contactId: duoId
        },
            {
                headers: {  
                    'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                // console.log("yu nee" + res)
                return res.data;
            })
            .catch(() => {
                setCookie("DaveTheHornyDuck", "");
                return null;
            })
    }
    
    async function searchByCategory(parentCateEn:any, childCateEn: any) {
        if (childCateEn != "none"){
            return await axios.post(`${API}/inventory/searchByCategory`, 
            {
                parentCategoryEn: parentCateEn , 
                childCategoryEn: childCateEn 
            }, 
            {
                headers: {
                    'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
                }
            })
                .then(res => {
                    // window.location.reload();
                    return res.data;
                })
                .catch(() => {
                    return null;
                })
        }else{
            return await axios.post(`${API}/inventory/searchByCategory`, {parentCategoryEn: parentCateEn}, {
                headers: {
                    'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
                }
            })
                .then(res => {
                    console.log(res.data)
                    // window.location.reload();
                    return res.data;
                })
                .catch(() => {
                    return null;
                })
        }
    }

    // async function getSearch(searchword: any) {
    //     return await axios.get(`${API}/inventory/search?query=${searchword}`, {
    //         headers: {
    //             'Authorization': `Bearer ${cookies.DaveTheHornyDuck}`
    //         }
    //     })
    //         .then(res => {
    //             ;
    //             return res.data;
    //         })
    //         .catch(() => {
    //             ;
    //             return null;
    //         })
    // }
    
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
        getFollow,
        getFollowCheck,
        onFollow,
        unFollow,
        getUserFollowData,
        getUserIdArray,
        LockRequest,
        deleteMyLockRequestPending,
        getSearch,
        finishTrade,
        getHistory,
        getAnotherInventory,
        getChatData,
        getMatchProduct,
        getChatList,
        changePasswordSubmit,
        updateUserContact,
        getDealingList,
        getMatchMarket,
        getLastChatData,
        replaceAllUserContact,
        searchByCategory
    }
}