import React from 'react'
import "./recommended.css"
import { useState,useEffect,useContext,useTransition } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Context } from '../store/context'
import { Loader } from './Loader'
import { Videocard } from './Videocard'

export const Recommended = ({category}) => {
  const {API_KEY}=useContext(Context)
  const [apiData,setApiData]=useState(null)
  const [pending, startTransition] = useTransition();
  const navigate = useNavigate()
  
useEffect(() => {
  startTransition(async () => {
    try {
      const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`;
      const response = await fetch(relatedVideo_url);
      if (!response.ok) {
        navigate("/error")
      }
      const data = await response.json();
      setApiData(data.items);
    } catch (error) {
      console.log(error.message);
      navigate("/error")
    }
  });
}, [category]);

if (pending || !apiData) {
  return <Loader />;
}

  
  return (
    <div className="recommended">
      {apiData.map((item,index)=>
        <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list flex">
          <Videocard thumbnail={item.snippet.thumbnails.medium.url} title={item.snippet.title} channel={item.snippet.channelTitle} views={item.statistics.viewCount}/>

        </Link>
      
      
      )} 
      
    </div>  
  )
}
