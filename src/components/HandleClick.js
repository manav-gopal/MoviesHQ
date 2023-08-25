import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function MoviesId() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleClick = (e) => {
            
            //for movie card
            const movieCard = e.target.closest('.movie-card');
            if (movieCard) {
                const movieId = movieCard.getAttribute("movie_id");
                const movieName = movieCard.getAttribute("movie_name");
                navigate(`/movie/${movieId}/${movieName}`);
            }

            //for movie slider
            const movieSlider = e.target.closest('.slider-content span');
            if (movieSlider) {
                const movieId = movieSlider.getAttribute("movie_id");
                const movieName = movieSlider.getAttribute("movie_name");
                navigate(`/movie/${movieId}/${movieName}`);
            }
        };

        // Attach the event listener
        document.addEventListener("click", handleClick);

        // Clean up the event listener
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [navigate]);

    return null;
}
