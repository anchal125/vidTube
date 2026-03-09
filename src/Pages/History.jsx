import React, { useContext } from 'react'
import { Context } from '../store/context'
import { Link } from 'react-router-dom'
import { Videocard } from '../components/Videocard'
import "./History.css"

export const History = () => {
  const {setWatchHistory,watchHistory}=useContext(Context)
  return (
    <div className='history'>
      <h2>Watch History</h2>
      <h3 className="delhistory" onClick={()=>{localStorage.removeItem("watchHistory");setWatchHistory([])} }>Delete History</h3>
      {watchHistory.map((item,index)=>
        <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="history-result flex">
          <Videocard key={index} views={item.statistics.viewCount} title={item.snippet.title}  channel={item.snippet.channelTitle} thumbnail={item.snippet.thumbnails.high.url}/>
        </Link>
      )}
    </div>
  )
} 
