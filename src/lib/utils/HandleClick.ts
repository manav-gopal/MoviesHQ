"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MoviesId() {
    const router = useRouter();

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            console.log("HandleClick clicked");


            //for movie card
            const target = e.target as HTMLElement;
            const movieCard = target.closest('.movie-card')!;
            if (movieCard) {
                const movieId = movieCard.getAttribute("data-movie_id");
                const movieName = movieCard.getAttribute("data-movie_name");
                router.push(`/movie/${movieId}-${movieName?.split(' ').join('-')}`);

            }

            //for Reccomendation card
            const recommendationCard = target.closest('.recommendation .card');
            if (recommendationCard) {
                const movieId = recommendationCard.getAttribute("data-movie_id");
                const movieName = recommendationCard.getAttribute("data-movie_name");
                router.push(`/movie/${movieId}-${movieName?.split(' ').join('-')}`);
            }


            //for movie slider
            const movieSlider = target.closest('.slider-content span')!;
            if (movieSlider) {
                const movieId = movieSlider.getAttribute("data-movie_id");
                const movieName = movieSlider.getAttribute("data-movie_name");
                router.push(`/movie/${movieId}-${movieName?.split(' ').join('-')}`);
            }


        };

        // Attach the event listener
        document.addEventListener("click", handleClick);

        // Clean up the event listener
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [router]);

    return null;
}
