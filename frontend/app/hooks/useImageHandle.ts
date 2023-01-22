export const useImageHandle = (setProfileImage: any) => {
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const fileObject = e.target.files[0]
    setProfileImage(window.URL.createObjectURL(fileObject))
  }
  return { onFileInputChange }
}
