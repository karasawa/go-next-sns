import Cookie from 'universal-cookie'

const cookie = new Cookie()

export const useSendChat = (username: string, message: string) => {
  const sendChat = async () => {
    await fetch(
      new URL(`${process.env.NEXT_PUBLIC_API_URL}/secured/chat/create`),
      {
        method: 'POST',
        body: JSON.stringify({ username: username, message: message }),
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
      })
  }
  return { sendChat }
}
