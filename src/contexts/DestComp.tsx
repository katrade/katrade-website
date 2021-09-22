import React , { useReducer } from 'react';

type DestCompContextType = {
    destCompState: any,
    destCompDispatch: any,
}

interface propsInterface {
    children: any
}

function reducer(state:any, action:any) {
    if (action.type === "Account") {
        return { dest: "Account" };
    }else if (action.type === "ChangePassword") {
        return { dest: "ChangePassword" };
    }else if (action.type === "Following") {
        return { dest: "Following" };
    }else if (action.type === "Followers") {
        return { dest: "Followers" };
    }else if (action.type === "Favorite") {
        return { dest: "Favorite" };
    }else if (action.type === "Inventory") {
        return { dest: "Inventory" };
    }else if (action.type === "History") {
        return { dest: "History" };
    }
    return state;
}

export const DestCompContext = React.createContext<DestCompContextType  | any >(null);

export function DestCompProvider({ children }: propsInterface) {

    const [ destCompState , destCompDispatch] = useReducer(reducer, "");

    return (
        <DestCompContext.Provider value={{ destCompState , destCompDispatch }}>
            { children }
        </DestCompContext.Provider>
    )
}