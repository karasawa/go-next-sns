import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { MyChatList } from '../organisms/MyChatList'
import useStore from '../../store/index'
import { useGetMyProfile } from '../../hooks/useGetMyProfile'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import IconButton from '@mui/material/IconButton'
import { useImageHandle } from '../../hooks/useImageHandle'
import { useUpload } from '../../hooks/useUpload'
import { updateLiteralTypeNode } from 'typescript'

export const MyProfile = () => {
  const [createdAt, setCreatedAt] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const user = useStore((state) => state.user)
  const { onFileInputChange } = useImageHandle(setProfileImage)
  const sxA = {
    position: 'absolute',
    left: '0',
    bottom: '0',
    fontSize: '90px',
  }
  const sxB = {
    position: 'absolute',
    left: '0',
    bottom: '0',
    borderRadius: '50%',
    height: '40px',
  }

  useEffect(() => {
    const getProfile = async () => {
      await useGetMyProfile(user.username, setCreatedAt)
    }
    getProfile()
  }, [])

  const changeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileInputChange(e)
    const { upload } = useUpload(user.username, e)
    upload()
  }

  return (
    <Wrapper>
      <BackgroundWrapper>
        {profileImage === '' ? (
          <AccountCircleIcon sx={sxA} />
        ) : (
          <Img src={profileImage} />
        )}
        <IconButton sx={sxB}>
          <Label htmlFor="image">
            <CameraAltIcon />
          </Label>
        </IconButton>
        <input
          type="file"
          style={{ display: 'none' }}
          id="image"
          accept=".png, .jpg, .jpeg"
          onChange={changeImage}
        />
      </BackgroundWrapper>
      <ProfileWrapper>
        <Button>プロフィールを編集</Button>
        <UserName>{user.username}</UserName>
        <UseStartWrapper>
          <CalendarMonthIcon sx={{ fontSize: '16px', color: 'gray' }} />
          <H4>{createdAt}からnochitterを利用しています</H4>
        </UseStartWrapper>
      </ProfileWrapper>
      <BorderWrapper></BorderWrapper>
      <MyChatList />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: #cec5f0 1px solid;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;
  height: 100%;
  width: 100%;
  flex: 33%;
`
const BackgroundWrapper = styled.div`
  position: relative;
  height: 25%;
  width: 100%;
  background-color: #bfc5ca;
`
const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
const Img = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 90px;
  width: 90px;
  border-radius: 50%;
`
const ProfileWrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  width: 95%;
`
const Button = styled.button`
  padding: 10px;
  width: 180px;
  background-color: #582b63;
  color: white;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  margin: 5px 0 0 auto;
`
const UseStartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const UserName = styled.h2`
  font-size: 20px;
  margin: 5px;
`
const H4 = styled.h4`
  font-size: 14px;
  margin: 5px;
  color: gray;
`
const BorderWrapper = styled.div`
  width: 100%;
  height: 4px;
  background-color: #cec5f0;
`
