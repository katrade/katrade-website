export interface IAccount {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  address: string;
  email: string;
  _id: string;
  phoneNumber: string;
  profilePic: string;
  verifyEmail: number;
  favourite: string;
  followers: string[];
  following: string[];
  inventories: string[];
}

export const defaultEmptyAccount: IAccount = {
  firstname: "",
  lastname: "",
  username: "",
  password: "",
  address: "",
  email: "",
  _id: "",
  phoneNumber: "",
  profilePic: "",
  verifyEmail: 0,
  favourite: "",
  followers: [],
  following: [],
  inventories: [],
};
