import { Movie } from './Banner'

const MovieCard = ({ isLargeRow, movie }: {isLargeRow: boolean, movie: Movie}) => {
    const baseUrl = "https://image.tmdb.org/t/p/original/";
    
    function truncate(string: string | undefined, n: number): string {
        return string && string.length > n ? string.substr(0, n - 1) + '...' : string || '';
    }
  
return (
    <div className={`movie-card`}>         
        <div className="image">
            <img src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
        </div>
        <p>{truncate(movie?.name || movie?.title, 15)}</p>                       
    </div>
  )
}

export default MovieCard