import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useRouter } from 'next/router'

export const AuthForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignIn, setIsSignIn] = useState(true)
  const [ok, setOk] = useState(false)
  const router = useRouter()

  const auth = async () => {
    const { signup, signin } = useAuth(email, password, setOk)
    if (isSignIn) {
      await signin()
    } else {
      await signup()
    }
    setEmail('')
    setPassword('')
    if (ok) router.push('/home')
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
    </div>
  )
}
