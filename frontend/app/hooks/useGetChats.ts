import Cookie from 'universal-cookie'
import { useSortChats } from '../hooks/useSortChats'

const cookie = new Cookie()

export const useGetChats = (setChats: any) => {
  const getChats = async () => {
    await fetch(
      new URL(`${process.env.NEXT_PUBLIC_API_URL}/secured/chat/get/messages`),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: cookie.get('access_token'),
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err)
      })
      .then((data) => {
        console.log(data)
        useSortChats(data.chats)
        setChats(data.chats)
      })
  }
  return { getChats }
}
