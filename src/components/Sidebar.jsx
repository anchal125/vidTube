import React from 'react'
import "./Sidebar.css"
import { Link } from 'react-router-dom'
import menu_icon from "../assets/menu.png"
import logo from "../assets/logo.png"
import { categories,Subscribers , options1,options2} from './data'


export const Sidebar = ({setExtend,category,setCategory}) => {

  const handle=()=>{
    setExtend(prev=>!prev)

  }
  
  
  return (   
      <div className="sidebar">
        <div className="sidebar-logo">
          <div className="nav-left flex">
            <img src={menu_icon} className='menu' onClick={handle}  alt="img" />
            <Link to="/" className='flex'><img className='logo' src={logo} onClick={()=>setCategory(0)} alt="img" /></Link>
          </div>
        </div>
        <div className="shortcut-links">
          {categories.map((item,index)=>
            <Link key={index} to="/" className={`side-link flex ${category===item.id?"active":""}`} onClick={()=>{setCategory(item.id)}}>
              <img src={item.icon} alt="img" />
              <p>{item.name}</p> 
            </Link>
          
          )}
        </div>
        <Link to="/history"><h3 style={{marginTop:'10px',cursor:'pointer',fontWeight:"800"}}>History</h3></Link>
        
        <div className="subscribers">
          <h3>Subscribed</h3>
          {Subscribers.map((item,index)=>
            <div key={index} className="side-link flex">
              <img src={item.icon} alt="img" />
              <p>{item.name}</p>
            </div>
          )}
        </div>
        <div className="options-1">
          {options1.map((item,index)=>
            <p key={index}>{item}</p>
          )}
        </div>
        <div className="options-1">
          {options2.map((item,index)=>
              <p key={index}>{item}</p>
            )}
        </div>
        <p className="copyright">&copy; 2024 Google LLC</p>
    </div>
  
  )
}
