import React from 'react';
import '@/styles/components/cards/ReviewCard.scss';
import userIcon from '@/assets/image/user_icon.png';
import { type MovieReviewResponse } from '@/types/movieDataAPI.types';

interface ReviewCardProps {
  reviews: MovieReviewResponse['results'] | null;
}

function ReviewCard({ reviews }: ReviewCardProps) {
    // if there is no Reviews for the movie then return a comment 
    if (!reviews || reviews.length === 0) {
        return <p>We don&apos;t have any reviews for this Movie Yet.</p>
    }
    //To format the date in Local string form Ex. "August 8, 2023"
    function formatDate(dateString: string) {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    }
  return (
    <div className='inner_content'>
        {
        reviews.map((item, key) =>{
            // if the some data are missing skip that review 
            if (!item.author_details.rating || !item.author_details.avatar_path) {
                return null;
            }
            //else
            return(
                <div className='card' key={key}>
                    <div className='group'>
                        <div className='avatar' style={{background:`url(${userIcon.src})`}}></div>
                        <div className='info'>
                            <h3>{item.author}</h3>
                            <div className='flex'>
                                <div className='rounded_rating'>{item.author_details.rating + "/10"}</div>
                                <h5>
                                    Written by <span>{item.author_details.username}</span> on {formatDate(item.created_at)}
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