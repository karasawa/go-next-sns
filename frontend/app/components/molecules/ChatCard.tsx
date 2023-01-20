import React, { FC } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import styled from 'styled-components'
import { Chat } from '../../types/index'
import { useCalculateChatTime } from '../../hooks/useCalculateChatTime'
import { useDeleteChat } from '../../hooks/useDeleteChat'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteIcon from '@mui/icons-material/Delete'
import useStore from '../../store/index'

type Props = {
  chat: Chat
}

export const ChatCard: FC<Props> = ({ chat }) => {
  const sendAction = useStore((state) => state.sendAction)
  const updateSendAction = useStore((state) => state.updateSendAction)
  const user = useStore((state) => state.user)
  const username = chat.username.split('@')
  const sendTime = useCalculateChatTime(chat.CreatedAt)
  const sx = { cursor: 'pointer' }

  let userNameColor
  if (user.username === chat.username) {
    userNameColor = { color: '#8B52A1' }
  } else {
    userNameColor = { color: 'black' }
  }

  const remove = async () => {
    const { deleteChat } = await useDeleteChat(chat.ID)
    await deleteChat()
    await updateSendAction(sendAction)
  }

  return (
    <Wrapper>
      <UserWrapper>
        <AccountCircleIcon sx={{ fontSize: '30px' }} />
        <UserName style={userNameColor}>{username[0]}</UserName>
        <SendTime>{sendTime}</SendTime>
      </UserWrapper>
      <Message>{chat.message}</Message>
      <IconWrapper>
        <ChatBubbleIcon sx={sx} />
        <ShareIcon sx={sx} />
        <FavoriteIcon sx={sx} />
        <DeleteIcon sx={sx} onClick={remove} />
      </IconWrapper>
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
  min-height: 150px;
  width: 100%;
`
const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 80%;
  flex: 30%;
`
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  flex: 30%;
  color: #582b63;
`
const BorderWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: #cec5f0;
`
const Message = styled.h3`
  margin: 5px;
`
const UserName = styled.h4`
  margin: 5px;
`
const SendTime = styled.h4`
  margin: 5px;
  color: gray;
`
