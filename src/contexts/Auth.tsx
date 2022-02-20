import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { backendRoot } from '../axios/instance'
import { User } from '../interfaces/user'

interface IAuthContext {
  signin: (email: string, password: string) => Promise<void>
  getUserData: () => Promise<any>
  user?: User
  signout: () => void
}

const a: any = {}

const defaultContextValue: IAuthContext = {
  signin: () => new Promise(() => {}),
  getUserData: () => new Promise(() => {}),
  signout: () => {},
}

export const AuthContext = createContext<IAuthContext>(defaultContextValue)

export function AuthProvider({ children }: { children: any }) {
  const [user, setUser] = useState<User>()
  const navigate = useNavigate()

  async function processAuthState(data: any) {
    console.log(data)
    if (!data.verifyEmail) {
      // do something whne email is not verified
      return alert('email is not verified')
    }
    if ((data.username !== undefined && data.username === '') || data.setUsername === false) {
      // do something when username is not set
      return alert('username is not set')
    }
    const t = data.DaveTheHornyDuck

    if (t) {
      localStorage.setItem('t', t)
      setUser(await getUserData())
    }
    return navigate('/market')
  }

  async function signin(email: string, password: string) {
    return await backendRoot
      .post('/auth/signin', {
        email: email,
        password: password,
      })
      .then(({ data }: any) => processAuthState(data))
  }
  function signout() {
    localStorage.removeItem('t')
    setUser(undefined)
  }

  async function getUserData() {
    const t = localStorage.getItem('t')
    if (!t) return undefined
    return await backendRoot
      .get('/auth/getUserData', {
        headers: {
          Authorization: `Bearer ${t}`,
        },
      })
      .then((res) => res.data.data)
      .catch(() => {
        alert('Session expired, please signin.')
        navigate('/')
      })
  }
  async function init() {
    setUser(await getUserData())
  }
  useEffect(() => {
    init()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        getUserData,
        signin,
        user,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
