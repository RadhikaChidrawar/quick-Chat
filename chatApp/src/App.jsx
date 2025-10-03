import React from 'react'
import {Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/loginPage'
import ProfilePage from './pages/ProfilePage'
// import ProfilePage from 


function App() {
  return (
    <div className="bg-[url('../src/assets/bgImage1.svg')] bg-contain" >
      <Routes>
          <Route path='/'element={<HomePage/>} />
          <Route path='/login'element={<LoginPage/>} />
          <Route path='/profile'element={<ProfilePage/>} />
      </Routes>
    </div>
  )
}

export default App
