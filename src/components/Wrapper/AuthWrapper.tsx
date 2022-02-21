import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function AuthWrapper({ children, title }: { children: any, title?: string }) {
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

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      { user ? children: null }
    </>
  )
}
