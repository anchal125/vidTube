import { useState,useEffect} from "react"
import { useLocation } from "react-router-dom"
export const useSearch = () => {
  const [input,setInput]=useState("")
  const [focus,setFocus]=useState(false)
  const location = useLocation(); 

  useEffect(() => {
    setFocus(false)
    document.activeElement.blur();
    
  }, [location]);
  
  const [searchHistory,setSearchHistory]
  =useState(()=>{
    const getSearchHistory=localStorage.getItem("searchHistory")
    if(getSearchHistory){
      return JSON.parse(getSearchHistory)
    }
    else{
      return []
    }
  })

  const pastsearch=searchHistory.filter((item)=>item.includes(input.toLowerCase()))


  localStorage.setItem("searchHistory",JSON.stringify(searchHistory))
  
  return [searchHistory,setSearchHistory,input,setInput,pastsearch,focus,setFocus]
}
