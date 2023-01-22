import React, { memo } from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search'
import { TwitterTweetEmbed } from 'react-twitter-embed'

const MemoInformation = () => {
  return (
    <Wrapper>
      <InputWrapper>
        <SearchIcon />
        <Input placeholder="キーワードを検索" type="text" />
      </InputWrapper>
      <InformatinoWrapper>
        <H2>今どうしてる？</H2>
        <TwitterTweetEmbed tweetId={'933354946111705097'} />
      </InformatinoWrapper>
    </Wrapper>
  )
}
export const Information = memo(MemoInformation)

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;
  flex: 20%;
  height: 80vh;
`
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f8fa;
  padding: 10px;
  border-radius: 20px;
  width: 70%;
`
const H2 = styled.h2`
  margin: 8px;
  margin-top: 15px;
`
const Input = styled.input`
  border: none;
  background-color: #f5f8fa;
  flex: 1;
  outline: none;
`
const InformatinoWrapper = styled.div`
  margin-top: 15px;
  padding: 30px;
  padding-top: 5px;
  background-color: #f5f8fa;
  border-radius: 20px;
  width: 70%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;
`
