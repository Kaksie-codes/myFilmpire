import MovieCard from "../MovieCard"
import './searched.css'

export interface SearchedMovie {
  adult: boolean;
  backdrop_path?: string | undefined; 
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview?: string | undefined;
  popularity: number;
  poster_path?: string | undefined;
  release_date: string;
  title?: string | undefined;
  video: false;
  vote_average: number;
  vote_count: number;
}

interface SearchedMovieProps {    
    movies?: SearchedMovie[]  | null;    
}
const SearchedMoviesContainer = ({movies}: SearchedMovieProps) => {

  return (
    <div className="searched-movies">
      <div className="container">
        {
          movies?.map(movie => {
            return(
              ((movie.backdrop_path))
              && (
                <MovieCard key={movie.id}  isLargeRow={false} movie={movie}/>
              )
            )            
          })
        }
      </div>
    </div>
  )
}

export default SearchedMoviesContainer