import axios from "axios";
import { MouseEvent, useState } from "react";
import { useCookies } from "react-cookie";
import { API } from "../app.setting.json";


export function useFollowMachine(_following: string[], _followers: string[]) {
    const [cookies,,] = useCookies(["DaveTheHornyDuck"]);
    const [following, setFollowing] = useState<string[]>([]);
    const [followers, setFollowers] = useState<string[]>([]);
    const [updates, setUpdates] = useState()
    
    function onUnfollow(e: MouseEvent<HTMLButtonElement>){
        const unfollowedId = e.currentTarget.name;
        // axios.get(``)
        
    }
    function onFollow(e: MouseEvent<HTMLButtonElement>) {
        const followedId = e.currentTarget.name;  
    }
    
}