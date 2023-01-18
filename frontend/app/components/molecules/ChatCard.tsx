import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import styled from 'styled-components'

export const ChatCard = ({ chat }) => {
  const username = chat.username.split('@')
  return (
    <Wrapper>
      <UserWrapper>
        <AccountCircleIcon sx={{ fontSize: '40px' }} />
        <h3>{username[0]}</h3>
      </UserWrapper>
      <h3>{chat.message}</h3>
      <BorderWrapper></BorderWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center
  border: #cec5f0 1px solid;
//   min-height: 130px;
  width: 100%;
`
const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const BorderWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: #cec5f0;
`
