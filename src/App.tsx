// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './Pages/landing/LandingPage'
import Footer from './components/footer/Footer'
import SignInPage from './Pages/sigin/SignInPage'
import SignUpPage from './Pages/signup/SignUpPage'
import MoviesPage from './Pages/movies/MoviesPage'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' Component={LandingPage}/>
        <Route path='/signin' Component={SignInPage}/>
        <Route path='/signup' Component={SignUpPage}/>
        <Route path='/movies' Component={MoviesPage}/>
      </Routes>        
      {/* <Footer/>     */}
    </>
  )
}

export default App
