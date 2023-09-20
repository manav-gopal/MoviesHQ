import React from 'react';
import '../../style/Content.scss';
import UserCard from '../../card/usercard/UserCard';

function Content(props) {
    const cast = props.credits.cast;
    const cast_slice = cast.slice(0,9);
    console.log(cast_slice);
    return (
        <div className='content_wrapper'>
            <section className='left'>
                <div className='top_billed'>
                    <h3>Top Billed Cast</h3>
                    <div className='cast_scroller'>
                        <UserCard cast={cast_slice}/>
                    </div>
                    <p><a href="#">Full Cast & Crew</a></p>
                </div>
            </section>
            <section className='right'>Right</section>
        </div>
    )
}

export default Content