import React from 'react';
import '../css/tweet.css';

const Tweet = (props) => {
    return (
        <div className='container'>
                {
                    (props.tweets && props.tweets.length) &&
                    props.tweets.map((tweet) => {
                        return (
                            <div className='tweet-holder' key={tweet.id}>
                                <img className='picture' src={tweet.user.profile_image_url_https} alt='img'/>
                                <div className='details'>
                                    <div>
                                        <span>
                                            <strong>{tweet.user.name}</strong>
                                        </span>
                                        &nbsp;
                                        <span>@{tweet.user.screen_name}</span>
                                        &nbsp;
                                        <small>{new Date(tweet.created_at).toLocaleString()}</small>
                                    </div>
                                    <p>{tweet.text}</p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
    )
}

export default Tweet;