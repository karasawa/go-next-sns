import React, { useState } from 'react'

export const useAuth = (email: string, password: string, setOk: any) => {
  const signup = async () => {
    await setOk(true)
    await fetch(new URL(`${process.env.NEXT_PUBLIC_API_URL}/signup`), {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err)
        setOk(false)
      })
      .then((data) => console.log(data))
  }
  const signin = async () => {
    await setOk(true)
    await fetch(new URL(`${process.env.NEXT_PUBLIC_API_URL}/signin`), {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err)
        setOk(false)
      })
      .then((data) => {
        if (data.errMes !== '') {
          console.log(data.errMes)
          setOk(false)
          return
        }
        console.log(data)
      })
  }
  return { signup, signin }
}
