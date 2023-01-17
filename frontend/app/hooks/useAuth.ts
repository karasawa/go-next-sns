import Cookie from 'universal-cookie'
import { useRouter } from 'next/router'

const cookie = new Cookie()

export const useAuth = (email: string, password: string) => {
  const signup = async () => {
    await fetch(new URL(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`), {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err)
      })
      .then((data) => console.log(data))
  }
  const signin = async () => {
    await fetch(new URL(`${process.env.NEXT_PUBLIC_API_URL}/token`), {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err)
        // console.log(err)
      })
      .then((data) => {
        console.log(data)
        const options = { path: '/' }
        cookie.set('access_token', data.token, options)
      })
  }
  return { signup, signin }
}
