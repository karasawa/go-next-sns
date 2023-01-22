export const useSortChats = (chats: any) => {
  chats.sort(function (a: any, b: any) {
    if (a.created_at > b.created_at) {
      return 1
    } else {
      return -1
    }
  })
}
