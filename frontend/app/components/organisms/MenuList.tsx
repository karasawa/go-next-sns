import React from 'react'
import styled from 'styled-components'
import HomeIcon from '@mui/icons-material/Home'
import TagIcon from '@mui/icons-material/Tag'
import NotificationsIcon from '@mui/icons-material/Notifications'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import PersonIcon from '@mui/icons-material/Person'
import { useRouter } from 'next/router'

export const MenuList = () => {
  const router = useRouter()
  const sx = {
    fontSize: '40px',
  }

  return (
    <Wrapper>
      <RouteWrapper>
        <HomeIcon sx={{ sx }} />
        <H4 onClick={() => router.push('/home')}>ホーム</H4>
      </RouteWrapper>
      <RouteWrapper>
        <TagIcon />
        <H4>話題を検索</H4>
      </RouteWrapper>
      <RouteWrapper>
        <NotificationsIcon />
        <H4>通知</H4>
      </RouteWrapper>
      <RouteWrapper>
        <BookmarkIcon />
        <H4>ブックマーク</H4>
      </RouteWrapper>
      <RouteWrapper>
        <PersonIcon />
        <H4 onClick={() => router.push('/profile')}>プロフィール</H4>
      </RouteWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  flex: 20%;
  height: 80vh;
`
const RouteWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 40%;
`
const H4 = styled.h4`
  color: black;
  cursor: pointer;
  font-size: 20px;
  font-weight: 700;
  margin-left: 5px;
`
