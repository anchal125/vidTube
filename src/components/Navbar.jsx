import "./Navbar.css"
import menu_icon from "../assets/menu.png"
import logo from "../assets/logo.png"
import search_icon from "../assets/search.png"
import upload from "../assets/upload.png"
import notification from "../assets/notification.png"
import profile from "../assets/jack.png"
import { Link, useNavigate } from 'react-router-dom'
import { useSearch } from './useSearch'


export const Navbar = ({setExtend,setCategory}) => {
  const [searchHistory,setSearchHistory,input,setInput,pastsearch,focus,setFocus]=useSearch()
  const navigate = useNavigate() 
  
  const handle=()=>{
    setExtend(prev=>!prev)
  }

  const handleClick=(item)=>{
    setInput(item)
    navigate(`/search/${input}`)

  }

  const handleKeyDown=(e)=>{
    if(e.key==='Enter'){
      const inp=input.toLowerCase()
      if(input.trim() && !searchHistory.includes(inp)){
        setSearchHistory(prev=>[...prev,inp])
      }
      
      navigate(`/search/${input}`)
    }
  }

  return (
    <nav className="navbar flex">
      <div className="nav-left flex">
        <img src={menu_icon} className='menu' onClick={handle}  alt="img" />
        <Link to="/" className='flex'><img className='logo' src={logo} onClick={()=>setCategory(0)} alt="img" /></Link>
      </div>

      <div className="nav-center flex">
        <input type="text" placeholder='Search' value={input} onChange={e=>setInput(e.target.value)} onKeyDown={handleKeyDown} onFocus={()=>{setFocus(true)}} onBlur={()=>setTimeout(() => setFocus(false), 600)}/>
        <Link className='flex' to={`/search/${input}`}>
          <img src={search_icon} onClick={()=>{setSearchHistory(prev=>[...prev,input])}  } alt="img" />
        </Link>

        {focus && input && pastsearch.length>0 && <div className="pastsearch">
          <h4 onClick={()=>{localStorage.removeItem("searchHistory"); setSearchHistory([])}}>Delete History</h4>
          <div className="pastsearchitem">
            {pastsearch.map((item,index)=> 
              <p onClick={()=>handleClick(item)} key={index}>{item}</p>
            )}
          </div>
          
        </div> }
        
      </div>

      <div className="nav-right flex">
        <img src={upload} alt="img" />
        <div className="notification flex">
          <img src={notification} alt="img" />
          <p className='notification-no'>9+</p>
          
        </div>
        
        <img className="user" src={profile} alt="img" />
      </div>
    </nav>
  )
}
