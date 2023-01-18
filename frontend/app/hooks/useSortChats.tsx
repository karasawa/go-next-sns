export const useSortChats = (chats) => {
  chats.sort(function (a, b) {
    if (a.created_at > b.created_at) {
      return 1
    } else {
      return -1
    }
  })
}
