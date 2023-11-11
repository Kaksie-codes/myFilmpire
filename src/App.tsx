// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './Pages/LandingPage'
import Footer from './components/footer/Footer'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>          
      <Router>
        <Routes>
          <Route index Component={LandingPage}/>
        </Routes>
      </Router>  
      <Footer/>    
    </div>
  )
}

export default App
