import React from 'react';
import './UserCard.scss';

function UserCard(props) {
    return (
        <ul className='card_wrapper'>
            {props.cast.map((item, index) => {
                return (
                    <li key={index} className='card'>
                        {/* Image */}
                        {item.profile_path ? (
                            <img className='image' src={'https://www.themoviedb.org/t/p/w240_and_h266_face/' + item.profile_path} alt="Not found" />
                        ) : (
                            <div className='no_image'>
                                {
                                    item.gender === 1 ? (
                                        <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg" alt="Not found" />
                                    ) : (
                                        <img src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg' alt='Not Found' />
                                    )
                                }
                            </div>
                        )
                        }
                        <p>{item.name}</p>
                        <p className='character'>{item.character}</p>
                    </li>
                );
            })}
            <li className='more_cards'><span>{'View More -->'}</span></li>
        </ul>
    )
}

export default UserCard