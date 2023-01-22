import Cookie from 'universal-cookie'

const cookie = new Cookie()

export const useUpload = (username: string, e: any) => {
  const upload = async () => {
    const filedata = e.target.files[0]
    await fetch(new URL(`${process.env.NEXT_PUBLIC_API_URL}/secured/upload`), {
      method: 'POST',
      body: JSON.stringify({ username: username, filedata: filedata }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: cookie.get('access_token'),
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err)
      })
      .then((data) => {
        console.log(data)
      })
  }
  return { upload }
}
