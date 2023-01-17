import React from 'react'
import styled from 'styled-components'

export const ChatBox = () => {
  return (
    <Wrapper>
      <h3>最近の出来事を共有しよう！</h3>
      <FormWrapper>
        <Input />
        <Button>送信</Button>
      </FormWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: black 1px solid;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  height: 50%;
  width: 100%;
`
const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: end;
  height: 50%;
  width: 100%;
`
const Input = styled.input`
  padding: 20px;
  margin-bottom: 10px;
  width: 70%;
  border-radius: 10px;
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
