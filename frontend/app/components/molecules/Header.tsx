import React from 'react'
import styled from 'styled-components'
import { LogOutButton } from '../atoms/LogOutButton'

export const Header = () => {
  return (
    <Wrapper>
      <h5>go-next-sns</h5>
      <LogOutButton />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 10vh;
`
