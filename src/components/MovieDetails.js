import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import './style/MovieDetails.scss';
// import { getDominantColor } from './getDominantColor';
import CircularProgressBar from './canvas/CircularProgressBar';
import Youtube from './card/video/Youtube';

function MovieDetail(props) {
    const { movieDetails, movieReleaseDates, movieCredits, movieKeywords,movieRecommendations,movieVideo } = props;
    const refBG = useRef(0);

    
    useEffect(() => {
        
        const bg_wrapper = refBG.current.style;
        const url = 'https://image.tmdb.org/t/p/original/';

        if (movieDetails) {
            if (refBG.current) {
                bg_wrapper.backgroundImage = `url(${url + movieDetails.backdrop_path})`;
            }
            // Use getDominantColor function to set the background color
            //   getDominantColor(refBG.current).then(colorCode => {
            //     console.log(colorCode); 
            //   }).catch(error => {
            //     console.error(error);
            //   });
            const ott_tital = document.querySelector('.ott_title .title .name');
            ott_tital.textContent = movieDetails.title;
        }
        if (movieReleaseDates) {
            // Certification
            const certification = document.querySelector(".facts .certification");
            certification.textContent = movieReleaseDates.release_dates[0].certification;

            // Release Date
            const country = movieReleaseDates.iso_3166_1;
            const release = document.querySelector(".facts .release");
            const [year, month, day] = movieReleaseDates.release_dates[0].release_date.split('T')[0].split('-');
            release.textContent = `${day}/${month}/${year} (${country})`;

            // Tag Releas Date
            const tag_releaseDate = document.querySelector('.ott_title .title .tag.release_date');
            tag_releaseDate.textContent = ` (${year})`;

            if (movieDetails) {
                // Genres
                const genres = document.querySelector('.facts .genres');
                let gen = '';
                const len = movieDetails.genres.length;
                movieDetails.genres.map((item, index) => {
                    gen += `<span genre_id={${item.id}}>${item.name}</span>`;
                    if (index !== len - 1) {
                        gen += ", ";
                    }
                });
                genres.innerHTML = gen; //set the val of gen in genres

                //Runtime
                const runtime = document.querySelector('.facts .runtime');
                const hour = Math.floor(movieDetails.runtime / 60);
                const min = movieDetails.runtime % 60;
                runtime.textContent = (hour) ? `${hour}h ${min}m` : `${min}m`;


            }
        }
        if (movieDetails) {
            // Tagline
            const tagline = document.querySelector('.header_info .tagline');
            tagline.textContent = movieDetails.tagline;

            // Overview 
            const overview = document.querySelector('.header_info .overview');
            overview.textContent = movieDetails.overview;
        }

        if (movieCredits) {
            // Lead Peaples
            const keyRoles = ['Director', 'Screenplay', 'Writer', 'Story', 'Creator'];
            const jobRoleOrder = ['Director', 'Screenplay', 'Writer', 'Story', 'Creator'];
            const leadCrewData = movieCredits.crew.filter(member => keyRoles.includes(member.job));
            const mergedCrew = {};
            leadCrewData.forEach(item => {
                if (!mergedCrew[item.id]) {
                    mergedCrew[item.id] = {
                        id: item.id,
                        name: item.name,
                        jobs: [item.job]
                    };
                } else {
                    mergedCrew[item.id].jobs.push(item.job);
                }
            });
            const mergedCrewList = Object.values(mergedCrew);
            //? console.log(mergedCrewList);
            //! Sort the mergedCrewList based on job role order
            mergedCrewList.sort((a, b) => {
                const indexA = jobRoleOrder.indexOf(a.jobs[0]);
                const indexB = jobRoleOrder.indexOf(b.jobs[0]);
                return indexA - indexB;
            });

            const leadPeoples = document.querySelector('.leadPeoples');
            leadPeoples.innerHTML = null;
            // Iterate through the mergedCrewList and create <li> elements
            mergedCrewList.forEach(item => {
                const list = document.createElement('li');
                list.className = 'profile';
                const para = document.createElement('p');
                para.textContent = `${item.name}`;
                const character = document.createElement('p');
                character.className = 'character';
                character.textContent = `${item.jobs.join(', ')}`;

                list.appendChild(para);
                list.appendChild(character);
                leadPeoples.appendChild(list);
            });
        } 
    }, [movieDetails, movieReleaseDates, movieCredits,movieVideo]);
    
    function youtube() {
        const url = `https://www.youtube.com/watch?v=${movieVideo}`;
        const windowName = 'Youtube';
        window.open(url, windowName, "height=500,width=900");
    }
    
    if (!movieDetails) {
        return <div>
            <Navbar />
            <div className='nav_cover'></div>
            Loading...</div>;
    }
    return (
        <div>
            <Navbar />
            <div className='nav_cover'></div>
            <div className='movies_detail'>
                <div className='bg_wrapper' ref={refBG}>
                    <div className='bg_blur'>
                        <div className='orignal_header'>
                            <div className='poster_wrapper'>
                                <div className='poster'>
                                    <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt={movieDetails.title} />
                                </div>
                                <div className='ott_offer'>Available to rent or buy at Amazon</div>
                            </div>
                            <div className='poster_header_wrapper'>
                                <div className='header_poster'>
                                    <div className='ott_title'>
                                        <h1 className='title'>
                                            <span className='name'>Title</span>
                                            <span className='tag release_date'>{'(xxxx)'}</span>
                                        </h1>
                                        <div className='facts'>
                                            <span className='certification'></span>
                                            <span className='release'></span>
                                            <span className='genres'></span>
                                            <span className='runtime'></span>
                                        </div>
                                    </div>
                                    <ul className='action'>
                                        <li className='rating'>
                                            <div className='circular_bar'>
                                                <CircularProgressBar percentage={Math.floor(movieDetails.vote_average * 10)} color={"rgb(33,208,122)"} widthAndHeight={"68"} />
                                            </div>
                                            <div className='text'>User <br /> Score</div>
                                        </li>
                                        <li className='trailer'>
                                            <div onClick={youtube}>
                                            <span className='playIcon'></span>Play Trailer
                                            </div>
                                        </li>
                                    </ul>
                                    <div className='header_info'>
                                        <h3 className='tagline'>Text</h3>
                                        <h3>Overview</h3>
                                        <div className='overview'>
                                            <p>Paragraph</p>
                                            <Youtube/>
                                        </div>
                                        <ol className='leadPeoples'></ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;
