import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useRouter } from 'next/router'
import Cookie from 'universal-cookie'
import useStore from '../../store/index'

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

  const clickHandle = async () => {
    await fetch(new URL(`${process.env.NEXT_PUBLIC_API_URL}/secured/ping`), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: cookie.get('access_token'),
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err)
      })
      .then((data) => console.log(data))
  }

  return (
    <div>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={auth}>{isSignIn ? 'ログイン' : '新規登録'}</button>
      <h5 className="text-4xl" onClick={() => setIsSignIn(!isSignIn)}>
        {isSignIn ? 'アカウントを新規登録する' : 'ログイン画面へ戻る'}
      </h5>
      <button onClick={clickHandle}>ping</button>
    </div>
  )
}
