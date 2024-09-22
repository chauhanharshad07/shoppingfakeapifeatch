
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Home from './component/Home'
import Details from './component/Details'
import Create from './component/Create';
import Edit from './component/Edit';

function App() {

  const {search,pathname} = useLocation();
  return (
    <>
      <div className='w-full h-screen flex'>
        {(pathname != '/' || search.length > 0) && 
        <NavLink to="/" className="px-3  text-lg  rounded-md font-semibold text-red-400 absolute left-[17.5%] top-[1%]">Home</NavLink>
        }
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path='/edit/:id' element={<Edit />} />
        </Routes>
      </div>
    </>
  )
}

export default App
