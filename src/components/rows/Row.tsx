import { useEffect, useState, useRef } from 'react';
import './row.css';
import { AiOutlineRight, AiOutlineLeft} from 'react-icons/ai'
import axios from '../../../axios'
import Skeleton from '../skeletons/Skeleton';
import MovieCard from '../MovieCard';
import { Movie } from '../Banner';

const Row = ({title, fetctURL, isLargeRow}: {title: string, fetctURL:string, isLargeRow:boolean}) => {
    const [movies, setMovies] = useState<Movie[]>([]);    
    const rowRef = useRef<HTMLDivElement>(null);
    const [isMoved, setIsMoved] = useState(false);
    const [loading, setLoading] = useState(true); 
    const [slideNumber, setSlideNumber] = useState(0)   

    useEffect(() => {
        const fetchData = async() => {
            const request = await axios.get(fetctURL);
            setMovies(request.data.results);
            // setLoading(false)
            return request;
        }

        fetchData();
    },[fetctURL])

    const handleClick = (direction: string) => {
        setIsMoved(true);
        const currentRowRef = rowRef.current;
    
        if (currentRowRef) {
            let distance = currentRowRef.getBoundingClientRect().x - 50;
    
            if (direction === 'right') {
                setSlideNumber(slideNumber + 1);
                currentRowRef.style.transform = `translateX(${-240 + distance}px)`;
                // currentRowRef.style.setProperty('--slider-index', 2)
            }
    
            if (direction === 'left' && slideNumber > 0) {
                setSlideNumber(slideNumber - 1);
                currentRowRef.style.transform = `translateX(${240 + distance}px)`;
            }
        }
    };
       

  return (
    <div className="row">        
        {
            loading ? (
                <Skeleton type="row"/>
            ) : (
                <>
                    <h3 className='row-title'>{title}</h3>
                    <div className="wrapper">
                        <div className={`sliderArrow left ${isMoved ? 'none' : ''}`} onClick={() => handleClick('left')}>
                            <AiOutlineLeft/>
                        </div>                        
                            <div className="movie__slider" ref={rowRef}>
                            {
                                 movies.map((movie) => {
                                    return (
                                        ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path))
                                        && ( 
                                            <MovieCard isLargeRow={isLargeRow} movie={movie} key={movie.id} />
                                        )
                                    )
                                })
                            }  
                            </div>
                        <div className="sliderArrow right" onClick={() => handleClick('right')}>
                            <AiOutlineRight/>
                        </div>                        
                    </div>                    
                </>                
            )
        }        
    </div>
  )
}

export default Row