import React from 'react';
import '../css/activityFeed.css';
import Tweet from './tweet';

export default class activityFeed extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {}
    }
  
    render() {
        return (
            <div className='holder'>
              <Tweet/>
            </div>
        )
    }
};
