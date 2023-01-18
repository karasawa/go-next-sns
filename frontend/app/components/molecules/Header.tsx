import React from 'react'
import styled from 'styled-components'
import { LogOutButton } from '../atoms/LogOutButton'
import useStore from '../../store/index'

export const Header = () => {
  const user = useStore((state) => state.user)
  const username = user.username.split('@')

  return (
    <Wrapper>
      <UsernameWrapper>{username[0]}</UsernameWrapper>
      <H3>go-next-sns</H3>
      <LogOutButton />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 8vh;
  border-bottom: #cec5f0 1px solid;
`
const UsernameWrapper = styled.div`
  min-width: 80px;
  font-size: 20px;
`
const H3 = styled.h3`
  font-size: 20px;
`
