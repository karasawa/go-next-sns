import React from 'react'
import { useRouter } from 'next/router'
import Cookie from 'universal-cookie'

const cookie = new Cookie()

export const LogOutButton = () => {
  const router = useRouter()
  const logout = async () => {
    cookie.remove('access_token', { path: '/' })
    router.push('/')
  }
  return (
    <>
      <button onClick={logout}>ログアウト</button>
    </>
  )
}
