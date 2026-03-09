import React, { useTransition, useContext, useEffect, useState } from 'react'
import "./Feed.css"
import {Link,useNavigate} from 'react-router-dom'
import moment from 'moment' 
import { Context } from '../store/context'
import { Loader } from './Loader'

export const Feed = ({category}) => {
  const {API_KEY,value_converter, categoryname}=useContext(Context)
  const [data,setData]=useState(null)
  const [pending,startTransition]=useTransition()
  const navigate = useNavigate()


  useEffect(()=>{
    startTransition(async()=>{
      try {
        const videoList_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`
        const data=await fetch(videoList_url)
        if (!data.ok) {
          navigate("/error")
        }
        const response=await data.json()
        
        setData(response.items)
      } catch (error) {
        console.log(error.message)
        navigate("/error")
        
      }
     
    }
    )
    categoryname(category)
    

  },[category])

  if(pending || !data){
    return <Loader/>
  }
  

  return (
    <>
    <h1 className='feed-heading'>{categoryname(category)}</h1>
    <div className='feed'>
      {data && data.map((item,index)=>
        <Link key={index} to={`video/${item.snippet.categoryId}/${item.id}`} className="card">
          <img loading='lazy' src={item.snippet.thumbnails.medium.url} alt="" />
          <h2>{item.snippet.title}</h2>
          <h3>{item.snippet.channelTitle}</h3>
          <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
          
        </Link>
      )}
      
      

    </div>
    </>
  )
}
