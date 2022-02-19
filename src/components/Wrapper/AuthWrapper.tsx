import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function AuthWrapper({ children }: { children: any }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  // const [pass, setPass] = useState<boolean>(false)

  // async function checkUser() {
  //   const u = await getUserData()
  //   if (u === null) {
  //     return navigate('/')
  //   }
  //   setPass(true)

  // }

  // useEffect(() => {
  //   checkUser()
  // }, [])
  useEffect(() => {
    if (localStorage.getItem('t') === null) navigate('/')
  }, [user])
  console.log(localStorage.getItem('t'), user)
  if (!user) return null
  return children
}
