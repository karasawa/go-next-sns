import Cookie from 'universal-cookie'
import { format } from 'date-fns'

const cookie = new Cookie()

export const useGetMyProfile = async (username: string, setCreatedAt: any) => {
  await fetch(new URL(`${process.env.NEXT_PUBLIC_API_URL}/secured/profile`), {
    method: 'POST',
    body: JSON.stringify({ email: username }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: cookie.get('access_token'),
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(err)
    })
    .then(async (data) => {
      console.log(data)
      setCreatedAt(format(new Date(data.user.CreatedAt), 'yyyy年MM月'))
    })
}
