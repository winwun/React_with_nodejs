import React from 'react';
import '../css/composeTweet.css';

const ComposeTweet = (props) => {
    return (
        <div className='container'>
            <textarea value={props.tweetDetails} onChange={props.handleChange} placeholder='Whats happening?'/>
            <button className='submit' onClick={props.postTweet}>tweet</button>    
        </div>
    )
}

export default ComposeTweet;