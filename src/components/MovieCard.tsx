import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Movie } from './Banner'

const MovieCard = ({ isLargeRow, movie }: {isLargeRow: boolean, movie: Movie}) => {
    const baseUrl = "https://image.tmdb.org/t/p/original/";
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleMouseEnter = () => {
        setIsHovered(true);
        // alert('Hovered')
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    function truncate(string: string | undefined, n: number): string {
        return string && string.length > n ? string.substr(0, n - 1) + '...' : string || '';
    }
  
return (
    <div className={`movie-card`}         
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >         
        <img src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>        
        <p>{truncate(movie?.name || movie?.title, 15)}</p>                       
    </div>
  )
}

export default MovieCard