import React from 'react';
import { HiInformationCircle } from 'react-icons/hi';
import { FaPlay } from 'react-icons/fa';

export interface Movie {
  backdrop_path?: string | undefined;
  first_air_date?: string;
  genre_ids: number[];
  id: number;
  name?: string | undefined;
  title?: string | undefined;
  origin_country: string[];
  original_language: string;
  original_name?: string | undefined;
  overview?: string | undefined;
  popularity: number;
  poster_path?: string | undefined;
  vote_average: number;
  vote_count: number;
}

interface MovieProps {    
    movie?: Movie  | null;    
}
  
const Banner: React.FC<MovieProps> = ({ movie }) => {
    const style = {
        backgroundImage:`url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.poster_path}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    }

    function truncate(string: string | undefined, n: number): string {
        return string && string.length > n ? string.substr(0, n - 1) + '...' : string || '';
      }

  return (
    <header className="banner" style={style}>        
        <div className="container">
            <div className="banner__contents">
                <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play <FaPlay/> </button>
                    <button className="banner__button inverse">My List <HiInformationCircle/></button>
                </div>
                <p>
                    {truncate(movie?.overview,150)}
                </p>
                <div className="banner--fadebottom"/>
            </div>
        </div>
    </header>
  )
}

export default Banner