import React, { useState } from 'react'
import styled from 'styled-components'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useSendChat } from '../../hooks/useSendChat'
import useStore from '../../store/index'

export const ChatBox = () => {
  const [message, setMessage] = useState('')
  const user = useStore((state) => state.user)
  const sendAction = useStore((state) => state.sendAction)
  const updateSendAction = useStore((state) => state.updateSendAction)
  const tweet = async () => {
    const { sendChat } = await useSendChat(user.username, message)
    await sendChat()
    await setMessage('')
    await updateSendAction(sendAction)
  }
  return (
    <Wrapper>
      <HeaderWrapper>
        <H2>最新ツイート</H2>
      </HeaderWrapper>
      <FormWrapper>
        <InputWrapper>
          <AccountCircleIcon sx={{ fontSize: '40px' }} />
          <Input
            placeholder="今どうしてる？"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </InputWrapper>
        <Button onClick={tweet}>ツイートする</Button>
      </FormWrapper>
      <BorderWrapper></BorderWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  border: #cec5f0 1px solid;
  border-top: none;
  border-bottom: none;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  height: 30%;
  width: 100%;
`
const HeaderWrapper = styled.div`
  border: #cec5f0 1px solid;
  border-top: none;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  height: 20%;
  width: 100%;
`
const H2 = styled.h2`
  margin: 0;
`
const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  height: 50%;
  width: 100%;
`
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`
const Input = styled.input`
  padding: 10px;
  width: 70%;
  height: 45%;
  border: none;
  font-size: 20px;
  outline: none;
`
const Button = styled.button`
  padding: 10px;
  width: 30%;
  background-color: #582b63;
  color: white;
  border-radius: 25px;
  border: none;
  margin: 0 0 0 auto;
  margin-right: 30px;
  cursor: pointer;
`
const BorderWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4px;
  background-color: #cec5f0;
`
