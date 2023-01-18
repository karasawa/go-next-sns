import React from 'react'
import { useRouter } from 'next/router'
import Cookie from 'universal-cookie'
import styled from 'styled-components'
import useStore from '../../store/index'

const cookie = new Cookie()

export const LogOutButton = () => {
  const resetUser = useStore((state) => state.resetUser)
  const router = useRouter()
  const logout = async () => {
    cookie.remove('access_token', { path: '/' })
    resetUser()
    router.push('/')
  }
  return (
    <>
      <Button onClick={logout}>ログアウト</Button>
    </>
  )
}

const Button = styled.button`
  padding: 10px;
  width: 110px;
  background-color: #582b63;
  color: white;
  border-radius: 25px;
  border: none;
  cursor: pointer;
`
