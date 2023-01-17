import React from 'react'
import { Header } from '../components/molecules/Header'
import styled from 'styled-components'
import { MenuList } from '../components/organisms/MenuList'
import { ChatBox } from '../components/organisms/ChatBox'
import { ChatList } from '../components/organisms/ChatList'
import { Information } from '../components/organisms/Information'

export default function Home() {
  return (
    <div>
      <Header />
      <Wrapper>
        <MenuList />
        <ChatWrapper>
          <ChatBox />
          <ChatList />
        </ChatWrapper>
        <Information />
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`
const ChatWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  flex: 33%;
  height: ;
  height: 80vh;
`
