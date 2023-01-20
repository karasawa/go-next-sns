import Cookie from 'universal-cookie'

const cookie = new Cookie()

export const useDeleteChat = (id: number) => {
  const deleteChat = async () => {
    await fetch(
      new URL(`${process.env.NEXT_PUBLIC_API_URL}/secured/chat/delete/${id}`),
      {
        method: 'POST',
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
  return { deleteChat }
}
