import Cookie from 'universal-cookie'
import { useSortChats } from '../hooks/useSortChats'

const cookie = new Cookie()

export const useGetMyChats = (setChats: any, username: string) => {
  const getMyChats = async () => {
    await fetch(
      new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/secured/chat/get/my/messages`
      ),
      {
        method: 'POST',
        body: JSON.stringify({ username: username }),
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
        console.log(data.chats)
        useSortChats(data.chats)
        setChats(data.chats)
      })
  }
  return { getMyChats }
}
