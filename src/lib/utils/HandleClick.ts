"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MoviesId() {
    const router = useRouter();

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            console.log("HandleClick clicked");

            const target = e.target as HTMLElement;
            const movieCard = target.closest('.movie-card');
            const recommendationCard = target.closest('.recommendation .card');
            const movieSlider = target.closest('.slider-content span');

            let movieId, movieName;

            if (movieCard || recommendationCard || movieSlider) {
                const element = movieCard ?? recommendationCard ?? movieSlider;
                movieId = element?.getAttribute("data-movie_id");
                movieName = element?.getAttribute("data-movie_name");

                if (movieId && movieName) {
                    const formattedName = movieName.split(' ').join('-');
                    router.push(`/movie/${movieId}-${formattedName}`);
                } else {
                    console.error('Invalid movie data:', { movieId, movieName });
                }
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [router]);

    return null;
}
