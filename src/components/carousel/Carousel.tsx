import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { AiOutlineRight, AiOutlineLeft} from 'react-icons/ai'
import axios from '../../../axios'
import { Movie } from '../Banner';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import MovieCard from '../MovieCard';
import Skeleton from '../skeletons/Skeleton';

const Carousel = ({title, fetchURL, isLargeRow}: {title:string, fetchURL: string, isLargeRow:boolean}) => {
    const [movies, setMovies] = useState<Movie[]>([]); 
    const [loading, setLoading] = useState(true); 
    
    useEffect(() => {
        const fetchData = async() => {
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);
            setLoading(false)
            return request;
        }

        fetchData();
    },[fetchURL])

  return (
    <>
        {
            loading ? (
                <Skeleton type='row'/>
            ) : (
                <div className='container'>
                    <h1 className='row-title'>{title}</h1>
                    <Swiper
                        modules={[Navigation, Pagination, A11y]}
                        spaceBetween={10}
                        slidesPerView={1}
                        loop
                        centeredSlides={ true  }
                        autoplay={
                            {
                                delay: 2500,
                                disableOnInteraction: false
                            }
                        }
                        navigation={
                            {
                                prevEl: '#nav-left',
                                nextEl: '#nav-right',
                                // clickable: true
                            }
                        }
                        keyboard={
                            { 
                                enabled: true 
                            }
                        }
                        breakpoints={
                            {
                                384: {
                                    slidesPerView: 1.5,
                                    spaceBetween: 10
                                },
                                500: {
                                    slidesPerView: 2,
                                    spaceBetween: 24
                                },
                                600: {
                                    slidesPerView: 3
                                },
                                800: {
                                    slidesPerView: 4
                                },
                                1200: {
                                    slidesPerView: 5
                                }
                            }
                        }
                        pagination={
                            {
                                el:'.swiper-custom-pagination',
                                clickable: true,
                                renderBullet: function(index, className){
                                    return `<div class="${className}">
                                    <span class ="line" id='${index}'></span>
                                    </div>`
                                }
                            }
                        }
                        className='slider_container'
                    >                
                        {
                            movies.map((movie) => {
                                return (
                                    ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path))
                                    && (
                                    <SwiperSlide key={movie.id}>
                                        <MovieCard isLargeRow={isLargeRow} movie={movie}/>
                                    </SwiperSlide>
                                    )
                                )
                            })
                        }
                        <div className='custom__navigation'>
                            <div className="custom-arrow" id='nav-left'><AiOutlineLeft className='icon'/></div>
                            <div className="custom-arrow" id='nav-right'><AiOutlineRight className='icon icon-2'/></div>
                        </div>
                        <div className="swiper-custom-pagination"></div>
                    </Swiper>
                </div>
            )
        }        
    </>
  )
}

export default Carousel