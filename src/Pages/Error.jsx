import React from 'react'
import { Link } from 'react-router-dom'

const error={
  color:'red',cursor:'pointer'

}

export const Error = () => {
  return (
    <div style={{position:'absolute',top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
      <div>
        <h1>Error 404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" style={error}>Go Back</Link>
      </div>
    </div>
  )
}
