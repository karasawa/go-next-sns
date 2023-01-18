import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGetChats } from '../../hooks/useGetChats'
import useSWR from 'swr'
import useStore from '../../store'
import { ChatCard } from '../molecules/ChatCard'

export const ChatList = () => {
  const sendAction = useStore((state) => state.sendAction)
  const [chats, setChats] = useState<any>([])
  const { getChats } = useGetChats(setChats)
  //   const { data, error, isLoading } = useSWR('chats', getChats, {
  //     refreshInterval: 7000,
  //   })
  //   console.log(data)
  useEffect(() => {
    getChats()
    // console.log(chats)
  }, [sendAction])
  return (
    <>
      <Wrapper className="chat_list">
        {chats.map((chat) => (
          <ChatCard key={chat.ID} chat={chat} />
        ))}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  position: relative;
  border: #cec5f0 1px solid;
  border-top: none;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  height: 70%;
  width: 100%;
  overflow: scroll;
`
