import { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Banner from '../../components/Banner'
import axios from '../../../axios'
import { useSelector } from 'react-redux'
import requests from '../../requests'
import { Movie } from '../../components/Banner'
import Skeleton from '../../components/skeletons/Skeleton'
import Row from '../../components/rows/Row'
import './moviespage.css'
import Footer from '../../components/footer/Footer'
import Carousel from '../../components/carousel/Carousel'

interface StoreProps {
  searchedMovies: string | null;
}

// Define the Redux state interface
interface RootState {
  user: StoreProps;
  movie: Movie;
}

const MoviesPage: React.FC = () => {
  const [bannerMovie, setBannerMovie] = useState<Movie | null>(null);

  const [loading, setLoading] = useState(true);
  const {searchedMovies} = useSelector((state: RootState) => state.user)
  
  useEffect(() => {
    const fetchData = async() => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const newBannerMovie = request.data.results;
      const randomNumber = Math.floor(Math.random() * newBannerMovie.length - 1);
      setBannerMovie(newBannerMovie[randomNumber]);
      setLoading(false);      
      
      return request;
    }

    fetchData()
  },[])
  if(bannerMovie){
    console.log('bannerMovie ',bannerMovie);
  }

  return (
    <div className="moviespage">
      <Navbar />
      {loading ? (
        // Render loading spinner or message
        <Skeleton type="banner"/>        
      ) : (
        // Render content when data is loaded
        <Banner movie={bannerMovie}/>
      )}
      <div className="movies__collection">
        {/* <Row
            title="NETFLIX ORIGINALS"
            fetctURL={requests.fetchNetflixOriginals}
            isLargeRow={false}
        /> */}
        <Carousel
          title="NETFLIX ORIGINALS"
          fetchURL={requests.fetchNetflixOriginals}
          isLargeRow={false}
        />
        {/* <Row
            title="Trending Now"
            fetctURL={requests.fetchTrending}
            isLargeRow={false}
        />
        <Row
            title="Top Rated"
            fetctURL={requests.fetchTopRated}
            isLargeRow={false}
        />
        <Row
            title="Action Movies"
            fetctURL={requests.fetchActionMovies}
            isLargeRow={false}
        />
        <Row
            title="Comedy Movies"
            fetctURL={requests.fetchComedyMovies}
            isLargeRow={false}
        />
        <Row
            title="Horror Movies"
            fetctURL={requests.fetchHorrorMovies}
            isLargeRow={false}
        />
        <Row
            title="Romance Movies"
            fetctURL={requests.fetchRomanceMovies}
            isLargeRow={false}
        />
        <Row
            title="Documentaries"
            fetctURL={requests.fetchDocumentaries}
            isLargeRow={false}
        /> */}
        <Footer/>
      </div>      
    </div>
  );  
}

export default MoviesPage