import React, { useEffect, useState, useTransition } from 'react'
import "./Search.css"
import { useNavigate, useParams } from 'react-router-dom'
import { FaFilter } from "react-icons/fa";
import { useContext } from 'react';
import { Context } from '../../store/context';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Loader } from '../../components/Loader';


export const Search = () => {
  const {API_KEY}=useContext(Context)
  const {query}=useParams()
  const navigate=useNavigate()
  const [pending,startTransition]=useTransition()
  const [searchdata,setSearchdata]=useState(null)
  
  useEffect(()=>{
    startTransition(async()=>{
      try {
        const search_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=${API_KEY}`;
        const response = await fetch(search_url);
        if (!response.ok) {
          navigate("/error")
        }
        const result = await response.json();
        setSearchdata(result.items);
      } catch (error) {
        console.log(error.message);
        navigate("/error");
      }
    })
    
    
  },[query])

  if(pending || !searchdata){
      return <Loader/>
    }
    

  return (
    <div className="search">
      <div className="filter-res flex">
        <FaFilter />
        <p>FILTER</p>
        
      </div>
      <hr/>
      {searchdata && searchdata.map((item,index)=>
        <Link to={`/video/${item.snippet.categoryId}/${item.id.videoId}`} key={index} className="search-result flex card">
          <img loading='lazy' src={item.snippet.thumbnails.high.url} alt="" />
          <div className="text">
            <p className='vid-title'>{item.snippet.title}</p>
            <p>{moment(item.snippet.publishedAt).fromNow()}</p>
            <p className='vid-channeltitle'>{item.snippet.channelTitle}</p>
            <p className='video-description'>{item.snippet.description}</p>
          </div>
        </Link>
      )}
      

    </div>
  )
}
