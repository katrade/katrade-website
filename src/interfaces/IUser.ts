export interface IAccount {
    firstname: string
	lastname: string
    username: string
    password: string
	address: string
	email: string
	phoneNumber: string
	profilePic: string
	verifyEmail: number
	favourite: string
	followers: string[]
	following: string[]
	inventories: string[]
}

export const defaultEmptyAccount: IAccount = {
    firstname: "",
	lastname: "",
    username: "",
    password: "",
	address: "",
	email: "",
	phoneNumber: "",
	profilePic: "",
	verifyEmail: 0,
	favourite: "",
	followers: [],
	following: [],
	inventories: [],
}

