import { useState, useEffect } from 'react'
import Logo from '../logo/Logo';
import movie1 from '../../assets/movie1.jpg'
import movie2 from '../../assets/movie2.jpg'
import movie3 from '../../assets/movie3.webp'
import movie4 from '../../assets/movie4.jpg'
import movie5 from '../../assets/movie5.jpg'
import movie6 from '../../assets/movie6.webp'
import movie7 from '../../assets/movie7.jpg'
import './herosection.css'


const Herosection = () => {
    const [show, setShow] = useState(false);
    const movies:string[] = [movie1, movie2, movie3, movie4, movie5, movie6, movie7];
    const [imageIndex, setImageIndex] = useState(0);

    const changeNavbar = () => {
        if(window.scrollY > 100){
          setShow(true)
        }else{
          setShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNavbar)
        return () => window.removeEventListener('scroll', changeNavbar)
    },[show])

    useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 4000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [imageIndex]);
//   style={{backgroundImage: `url(${movies[imageIndex]})`}}
  return (
    <section className='hero-section' >
        <img src={movies[imageIndex]} alt="" />
        <div className='overlay'>
            <div className={`nav ${show ? 'nav__black' : ''}`}>
                <div className="nav__container container">
                    <Logo/>
                    <div className="btn">Sign In</div>
                </div>
            </div>
            <div className="content">
                <div className="container">
                    <h1>Unlimited movies, TV shows, and more.</h1>
                    <h3>Watch anywhere. Cancel anytime.</h3>
                    <p>More than 25,000 users have experienced our streaming services.</p>                    
                    <button className="btn btn-large">Get Started</button>
                </div>
            </div>
            <div className="pagination">
                <span className={`span ${imageIndex === 0 ? 'active' : ''}`} onClick={() => setImageIndex(0)}><div/></span>
                <span className={`span ${imageIndex === 1 ? 'active' : ''}`} onClick={() => setImageIndex(1)}><div/></span>
                <span className={`span ${imageIndex === 2 ? 'active' : ''}`} onClick={() => setImageIndex(2)}><div/></span>
                <span className={`span ${imageIndex === 3 ? 'active' : ''}`} onClick={() => setImageIndex(3)}><div/></span>
                <span className={`span ${imageIndex === 4 ? 'active' : ''}`} onClick={() => setImageIndex(4)}><div/></span>
                <span className={`span ${imageIndex === 5 ? 'active' : ''}`} onClick={() => setImageIndex(5)}><div/></span>
                <span className={`span ${imageIndex === 6 ? 'active' : ''}`} onClick={() => setImageIndex(6)}><div/></span>
            </div>
        </div>
    </section>
  )
}

export default Herosection