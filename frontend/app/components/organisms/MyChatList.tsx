import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGetMyChats } from '../../hooks/useGetMyChats'
import useStore from '../../store'
import { ChatCard } from '../molecules/ChatCard'
import { Chat } from '../../types/index'

export const MyChatList = () => {
  const sendAction = useStore((state) => state.sendAction)
  const user = useStore((state) => state.user)
  const [chats, setChats] = useState<any>([])
  const { getMyChats } = useGetMyChats(setChats, user.username)

  useEffect(() => {
    getMyChats()
  }, [sendAction])
  return (
    <>
      <Wrapper className="chat_list">
        {chats.map((chat: Chat) => (
          <ChatCard key={chat.ID} chat={chat} />
        ))}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  border: #cec5f0 1px solid;
  border-top: none;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;
  height: 70%;
  width: 100%;
  overflow: scroll;
`
