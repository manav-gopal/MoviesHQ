"use client";

import { useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function HandleMovieClicks() {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const movieElement = target.closest('[data-movie_id][data-movie_name]');

        if (movieElement instanceof HTMLElement) {
            const movieId = movieElement.dataset.movie_id;
            const movieName = movieElement.dataset.movie_name;

            if (movieId && movieName) {
                const formattedName = movieName.split(' ').join('-');
                router.push(`/movie/${movieId}-${formattedName}`);
            } else {
                console.error('Invalid movie data:', { movieId, movieName });
            }
        }
    }, [router]);

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [handleClick]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);

    return null;
}
