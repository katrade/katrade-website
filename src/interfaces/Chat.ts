import { IAccount } from "./IUser";

export interface IChat {
    __v: any,
    _id: string,
    roomId: string,
    messages: any[]
}

export interface IContact extends IAccount {
    userContacts: IUserContacts[]
}

export interface IUserContacts{
    userIdContact: string
    userNameContact: string
}