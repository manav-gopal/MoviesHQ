import React from 'react';
import './ReviewCard.scss';
import userIcon from '../../image/user_icon.png';

function ReviewCard(props) {
    // if there is no Reviews for the movie then return a comment 
    if (props.reviews.length === 0 || props.reviews.length === null) {
        return <p>We don't have any reviews for this Movie.</p>
    }
    //To formate the date in Local sttring form Ex. "August 8, 2023"
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    }
  return (
    <div className='inner_content'>
        {
        props.reviews.map((item, key) =>{
            // if the some data are missing skip that review 
            if (item.author_details.rating < 0 || item.author_details.rating === null || item.author_details.avatar_path === null) {
                return null;
            }
            //else
            return(
                <div className='card' key={key}>
                    <div className='group'>
                        <div className='avatar' style={{background:`url(${userIcon})`}}></div>
                        <div className='info'>
                            <h3>{item.author}</h3>
                            <div className='flex'>
                                <div className='rounded_rating'>{item.author_details.rating + "/10"}</div>
                                <h5>
                                    Written by <span>{item.author_details.author}</span> on {formatDate(item.created_at)}
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className='text_review'>
                        <p>{item.content}</p>
                    </div>
                </div>
            )
        })
        }
    </div>
  )
}

export default ReviewCard