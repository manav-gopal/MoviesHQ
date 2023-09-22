import React from 'react';
import './RecommendationCard.scss';

function RecommendationCard(props) {
    return (
        <ul className='card_wrapper'>
            {props.recommendations.slice(0,12).map((item, index) => {
                if (item.backdrop_path == null) {
                    return null;
                }
                return (
                    <li key={index} className='card' movie_id={item.id} movie_name={item.title}>
                        {/* Image */}
                        <img className='image' src={'https://www.themoviedb.org/t/p/w300/' + item.backdrop_path} alt="Not found" />
                        <p>{item.title}</p>
                        <p className='character'>{(item.vote_average*10).toFixed(0)+"%"}</p>
                    </li>
                );
            })}
            <li className='more_cards'><span>{'View More -->'}</span></li>
        </ul>
    )
}

export default RecommendationCard