import React from 'react';
import '../../style/Content.scss';
import UserCard from '../../card/usercard/UserCard';
import ReviewCard from '../../card/reviewcard/ReviewCard';
import RecommendationCard from '../../card/recommendationCard/RecommendationCard';

//icons
import facebook_icon from '../../../assets/image/facebook_icon.png'
import twitterx_icon from '../../../assets/image/twitterx_icon.png'
import instagram_icon from '../../../assets/image/instagram_icon.png'
import link_icon from '../../../assets/image/link_icon.png'

//Abbriviation Map
const abbreviationMap = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    pt: 'Portuguese',
    nl: 'Dutch',
    ru: 'Russian',
    zh: 'Chinese',
    ja: 'Japanese',
    ko: 'Korean',
    ar: 'Arabic',
    hi: 'Hindi',
    bn: 'Bengali',
    ur: 'Urdu',
    te: 'Telugu',
    ta: 'Tamil',
    ml: 'Malayalam',
    fi: 'Finnish',
    sv: 'Swedish',
    no: 'Norwegian',
    da: 'Danish',
    is: 'Icelandic',
    pl: 'Polish',
    cs: 'Czech',
    hu: 'Hungarian',
    tr: 'Turkish',
    el: 'Greek',
    th: 'Thai',
    vi: 'Vietnamese',
    id: 'Indonesian',
    ms: 'Malay',
    fil: 'Filipino',
    he: 'Hebrew',
    fa: 'Persian',
    si: 'Sinhala',
    sw: 'Swahili',
    am: 'Amharic',
    km: 'Khmer',
    my: 'Burmese',
    ne: 'Nepali',
    pa: 'Punjabi',
    gu: 'Gujarati',
    kn: 'Kannada',
    mr: 'Marathi',
    sd: 'Sindhi',
    bo: 'Tibetan',
    ug: 'Uighur',
    ky: 'Kyrgyz',
    tt: 'Tatar',
    // Add more mappings as needed
};


function Content(props) {
    const cast = props.credits.cast;
    const cast_slice = cast.slice(0, 9);
    // console.log("Cast slice: ", cast_slice);
    return (
        <div className='content_wrapper'>
            <section className='left'>

                {/* For casts and crews of the movie */}
                <section className='top_billed'>
                    <h3>Top Billed Cast</h3>
                    <div className='cast_scroller'>
                        <UserCard cast={cast_slice} />
                    </div>
                    <p><a href='null' rel='norefferrer' target='_blank'>Full Cast & Crew</a></p>
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
                            <RecommendationCard recommendations={props.recommendations} />
                        </div>
                    </section>
                </section>
            </section>

            {/* Right section For Social links, keywords and extras */}
            <section className='right'>
                <div className='social_links'>
                    <div><a href={props.links.facebook} target='_blank' rel='noreferrer' title='Facebook link'><span style={{ backgroundImage: `url(${facebook_icon})` }}></span></a></div>
                    <div><a href={props.links.twitter} target='_blank' rel='noreferrer' title='Twitter link'><span style={{ backgroundImage: `url(${twitterx_icon})` }}></span></a></div>
                    <div><a href={props.links.instagram} target='_blank' rel='noreferrer' title='Instagram link'><span style={{ backgroundImage: `url(${instagram_icon})` }}></span></a></div>
                    <div className='homepage'><a href={props.links.homepage} target='_blank' rel='noreferrer' title='Homepage link'><span style={{ backgroundImage: `url(${link_icon})` }}></span></a></div>
                </div>

                <p><strong>Status</strong><br />{props.details.status}</p>
                <p><strong>Original language</strong><br />{abbreviationMap[props.details.original_language]}</p>
                <p><strong>Budget</strong><br />{props.details.budget === 0 ? '-' : props.details.budget.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                <p><strong>Revenue</strong><br />{props.details.revenue === 0 ? '-' : props.details.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>

                <section className='keywords_panel'>
                    <h4><strong>Keywords</strong></h4>
                    <ul>
                        {
                            props.keywords.map((item, index) => {
                                return <li keyword_id={item.id} key={index}>{item.name}</li>
                            })
                        }
                    </ul>
                </section>
            </section>
        </div>
    )
}

export default Content