import { Navbar } from './components/Navbar'
import './App.css'
import { Route,Routes, useLocation } from 'react-router-dom'
import { useState,useEffect,lazy ,Suspense} from 'react'
import { Loader } from './components/Loader';


const Home = lazy(() => import('./Pages/Home/Home').then(module=> {return {default:module.Home}}));
const Video = lazy(() => import('./Pages/Video/Video').then(module=> {return {default:module.Video}}));
const Search = lazy(() => import('./Pages/Search/Search').then(module=> {return {default:module.Search}}));
const Sidebar= lazy(() =>import('./components/Sidebar').then(module=> {return {default:module.Sidebar}}));
const Error=lazy(()=>import('./Pages/Error').then(module=>({default:module.Error})))
const History=lazy(()=>import('./Pages/History').then(module=>({default:module.History})))


function App() {
  const [extend,setExtend]=useState(false)
  const [category,setCategory]=useState(0)
  const location = useLocation();

  useEffect(() => {

    setExtend(false)
    
  }, [location]);

  
  

  return (
    <div className='app'>
      <Navbar setExtend={setExtend} setCategory={setCategory}></Navbar>
      <Suspense fallback={null}>
        {extend?<Sidebar setExtend={setExtend} extend={extend} category={category} setCategory={setCategory}></Sidebar>:null}
      </Suspense>
      
      <Suspense fallback={<Loader/>}>
        
        <Routes>
          <Route path='/' element={<Home  setExtend={setExtend} extend={extend} category={category} setCategory={setCategory} />} />
          <Route path="/history" element={<History/>}/>
          <Route path='/video/:categoryId/:videoId' element={<Video setExtend={setExtend} extend={extend} category={category} setCategory={setCategory} />} />
          <Route path='/search/:query' element={<Search/>} />  
          <Route path="*" element={<Error/>}></Route>
        </Routes>
      </Suspense>
    </div> 
  )
}

export default App
