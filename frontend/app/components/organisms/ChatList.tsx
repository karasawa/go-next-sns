import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGetChats } from '../../hooks/useGetChats'
import useSWR from 'swr'
import useStore from '../../store'
import { ChatCard } from '../molecules/ChatCard'
import { Chat } from '../../types/index'

export const ChatList = () => {
  const sendAction = useStore((state) => state.sendAction)
  const [chats, setChats] = useState<any>([])
  const { getChats } = useGetChats(setChats)
  const { data, error, isLoading } = useSWR('chats', getChats, {
    refreshInterval: 7000,
  })
  useEffect(() => {
    getChats()
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
