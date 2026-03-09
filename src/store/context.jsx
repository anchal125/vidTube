import {createContext,useState} from "react";

export const Context=createContext()
export const ContextProvider=({children})=>{
  const [watchHistory,setWatchHistory]=useState(()=>{
    const getWatchHistory=localStorage.getItem('watchHistory')
    if(getWatchHistory){
      return JSON.parse(getWatchHistory)
    }
    else{
      return []
    }
  })
  


  const API_KEY='AIzaSyDElM3AtblD5yG5tIL_LUEbTjQzvVOVmGA'
  localStorage.setItem("watchHistory",JSON.stringify(watchHistory))
  
  const checkDecimalZeroAfterFix = (number) => {
    return number.endsWith('.0');
  };

  const value_converter = (value) => {
    let formattedValue;

    if (value >= 1000000000) {
      formattedValue = (value / 1000000000).toFixed(1);
      formattedValue = checkDecimalZeroAfterFix(formattedValue) 
        ? Math.floor(formattedValue) + 'B' 
        : formattedValue+ 'B';
    } else if (value >= 1000000) {
      formattedValue = (value / 1000000).toFixed(1);
      formattedValue = checkDecimalZeroAfterFix(formattedValue) 
        ? Math.floor(formattedValue) + 'M' 
        : formattedValue+ 'M';
    } else if (value >= 1000) {
      formattedValue = (value / 1000).toFixed(1);
      formattedValue = checkDecimalZeroAfterFix(formattedValue) 
        ? Math.floor(formattedValue) + 'K' 
        : formattedValue + 'K';
    } else {
      formattedValue = value; // Convert to string without decimal places
    }

    return formattedValue;
  };
    

  const categoryname=(category)=>{
    let categoryName;

    switch (category) {
      case 20:
        categoryName = 'Gaming';
        break;
      case 2:
        categoryName = 'Automobiles';
        break;
      case 17:
        categoryName = 'Sports';
        break;
        case 24:
        categoryName = 'Entertainment';
        break;
      case 28:
        categoryName = 'Tech';
        break;
      case 10:
        categoryName = 'Music';
        break;
      case 22:
        categoryName = 'Blogs';
        break;
      case 25:
        categoryName = 'News';
        break;
      default:
        categoryName = '';
    }
    return categoryName
  }


  const contextValue={
    API_KEY,
    categoryname,
    value_converter,
    setWatchHistory,
    watchHistory

  }

  

  





  return (
  <Context.Provider value={contextValue}>
    {children}
  </Context.Provider>
  )
}