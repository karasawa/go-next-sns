import create from 'zustand'
import type { User } from '../types/index'

type State = {
  user: User
  updateUser: (payload: User) => void
  resetUser: () => void
  sendAction: boolean
  updateSendAction: (payload: boolean) => void
}

const useStore = create<State>((set) => ({
  user: { username: '' },
  updateUser: (payload) => set({ user: { username: payload.username } }),
  resetUser: () => set({ user: { username: '' } }),
  sendAction: true,
  updateSendAction: (payload) => set({ sendAction: !payload }),
}))

export default useStore
