import React from 'react';
import '../../style/Content.scss';
import UserCard from '../../card/usercard/UserCard';
import ReviewCard from '../../card/reviewcard/ReviewCard';
import RecommendationCard from '../../card/recommendationCard/RecommendationCard';

function Content(props) {
    const cast = props.credits.cast;
    const cast_slice = cast.slice(0,9);
    console.log("Cast slice: ", cast_slice);
    return (
        <div className='content_wrapper'>
            <section className='left'>
                
                {/* For casts and crews of the movie */}
                <section className='top_billed'>
                    <h3>Top Billed Cast</h3>
                    <div className='cast_scroller'>
                        <UserCard cast={cast_slice}/>
                    </div>
                    <p><a href="#">Full Cast & Crew</a></p>
                </section>

                {/* For Review of the movie */}
                <section className='social_panel'>
                    <section className='review'>
                        <div className='menu'>
                            <h3>Social</h3>
                            <h4>Review</h4>
                        </div>
                        <div className='content'>
                            <ReviewCard reviews={props.reviews} />
                        </div>
                    </section>
                </section>

                {/* For Recommondations of the movie */}
                <section className='recommendation_panel'>
                    <section className='recommendation'>
                        <div className='menu'>
                            <h3>Recommendations</h3>
                        </div>
                        <div className='content'>
                            <RecommendationCard recommendations={props.recommendations}/>
                        </div>
                    </section>
                </section>
            </section>
            <section className='right'>Right</section>
        </div>
    )
}

export default Content