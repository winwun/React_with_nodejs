import React from 'react';
import '../css/tweet.css';
import {getTweets} from '../service/getTweets';

export default class Tweet extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
          data: getTweets(),
        }
    }

    render() {
        const data = this.state.data;
        return (
            <div>
                {
                    data.map((tweet) => {
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
};
