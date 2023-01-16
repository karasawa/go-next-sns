import React from 'react'

export const useAuth = () => {
  const signup = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task: '',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
    return {}
  }
}
