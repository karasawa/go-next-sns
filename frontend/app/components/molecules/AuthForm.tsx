import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useRouter } from 'next/router'
import Cookie from 'universal-cookie'
import useStore from '../../store/index'
import styled from 'styled-components'

const cookie = new Cookie()

export const AuthForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignIn, setIsSignIn] = useState(true)
  const router = useRouter()
  const user = useStore((state) => state.user)
  const updateUser = useStore((state) => state.updateUser)

  const auth = async () => {
    const { signup, signin } = useAuth(email, password)
    setEmail('')
    setPassword('')
    if (isSignIn) {
      await signin()
      if (cookie.get('access_token') !== 'undefined') {
        updateUser({ ...user, username: email })
        router.push('/home')
      }
    } else {
      await signup()
      setIsSignIn(true)
    }
  }

  return (
    <Wrapper>
      <FormWrapper>
        <label htmlFor="email">メールアドレス</label>
        <Input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" style={{ marginTop: '10px' }}>
          パスワード
        </label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={auth}>{isSignIn ? 'ログイン' : '新規登録'}</Button>
        <H5 onClick={() => setIsSignIn(!isSignIn)}>
          {isSignIn ? 'アカウントを新規登録する' : 'ログイン画面へ戻る'}
        </H5>
      </FormWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const FormWrapper = styled.div`
  padding: 40px 20px;
  width: 25%;
  border: #cec5f0 1px solid;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Button = styled.button`
  margin-top: 30px;
  padding: 10px;
  width: 110px;
  background-color: #582b63;
  color: white;
  border-radius: 25px;
  border: none;
  cursor: pointer;
`
const H5 = styled.h5`
  color: #cec5f0;
  cursor: pointer;
`
const Input = styled.input`
  padding: 7px;
  width: 80%;
  margin: 7px 0;
  border-color: #cec5f0;
  border-radius: 7px;
  outline: none;
`
