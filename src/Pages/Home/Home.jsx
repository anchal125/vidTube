import React from 'react'
import { Feed } from '../../components/Feed'

// named export

export const Home = ({extend,category}) => {
  
  return (
    <>
      
      <Feed extend={extend} category={category} ></Feed>
    </>
  )
}
