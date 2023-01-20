import React from 'react'
import { getDate, getMonth, getYear, format } from 'date-fns'

export const useCalculateChatTime = (createdAt: Date) => {
  const ymd = format(new Date(createdAt), 'yyyyMMdd')
  const yyyy = format(new Date(createdAt), 'yyyy')
  const mm = format(new Date(createdAt), 'MM')
  const dd = format(new Date(createdAt), 'dd')

  const today = format(new Date(), 'yyyyMMdd')
  const tyyyy = format(new Date(), 'yyyy')
  const tmm = format(new Date(), 'MM')
  const tdd = format(new Date(), 'dd')

  let formatedTime
  if (yyyy !== tyyyy) {
    formatedTime = format(new Date(createdAt), 'yyyy年MM月dd日')
  } else if (mm !== tmm) {
    formatedTime = format(new Date(createdAt), 'MM月dd日')
  } else if (dd !== tdd) {
    formatedTime = format(new Date(createdAt), 'dd日')
  } else {
    formatedTime = format(new Date(createdAt), 'HH:mm')
  }
  return formatedTime
}
