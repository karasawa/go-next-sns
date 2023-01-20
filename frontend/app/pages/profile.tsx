import React from 'react'
import { Header } from '../components/molecules/Header'
import styled from 'styled-components'
import { MenuList } from '../components/organisms/MenuList'
import { Information } from '../components/organisms/Information'
import { MyProfile } from '../components/organisms/Profile'

export default function Profile() {
  return (
    <div>
      <Header />
      <Wrapper>
        <MenuList />
        <ProfileWrapper>
          <MyProfile />
        </ProfileWrapper>
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
const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  flex: 33%;
  height: 88vh;
`
