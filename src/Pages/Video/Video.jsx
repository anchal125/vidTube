import React from 'react'
import "./Video.css"
import { PlayVideo } from '../../components/PlayVideo'
import { Recommended } from '../../components/Recommended'
import { useParams } from 'react-router-dom'

export const Video = ({category}) => {
  const {videoId}=useParams()
  
  return (
    <>
      
      <div className='video'>
        <PlayVideo VideoId={videoId}></PlayVideo>
        <Recommended category={category}></Recommended>

      </div> 
    </>
  )
}
