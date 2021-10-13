import { IAccount } from "./IUser";

export interface IChat {
    __v: any,
    _id: string,
    roomId: string,
    messages: any[]
}

export interface IMessage {
    _id: string
    sender: string
    content_type: string
    content: string
    timestamp: string
    messages: any[]
}

export interface IContact extends IAccount {
    userContacts: IUserContacts[]
}

export interface IUserContacts{
    userIdContact: string
    userNameContact: string
}

export interface IDealing {
    ownerInventoryId: string
    requestId: string
    sourceInventory: ISourceInventory[]
    state: number
    targetInventory: ITargetInventory[]
    timeStamp: string
    userConfirm: number

}

interface ISourceInventory {
    category: any[]
    detail: string
    lock: number
    name: string
    owner: string
    pictures: string[]
    require: any[]
    timeStamp: string
    username: string
    _id: string
}

interface ITargetInventory {
    category: any[]
    detail: string
    lock: number
    name: string
    owner: string
    pictures: string[]
    require: any[]
    timeStamp: string
    username: string
    _id: string
}

// export const defaultEmptyDealing: IDealing = {
//     sourceInventory: [],
//     targetInventory: [],
//     userConfirm: 0
// }