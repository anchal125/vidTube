import React, { useContext } from 'react'

import { Context } from '../store/context'

export const Videocard = ({thumbnail,title,channel,views}) => {
  const {value_converter}=useContext(Context)
  return (
    <>
      <img loading='lazy' src={thumbnail} alt="img" />
      <div className="vid-info text">
        <h4>{title}</h4>
        <p className='channelname'>{channel}</p>
        <p>{value_converter(views)} views</p>
      </div>

    </>
  )
}
