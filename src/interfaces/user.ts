export interface User {
  _id: string
  firstname: string
  lastname: string
  username: string
  password: string
  address: string
  email: string
  phoneNumber: string
  profilePic: string
  verifyEmail: 0 | 1
}
