import React from 'react';
import '../css/activityFeed.css';
import Tweet from './tweet';
import ComposeTweet from '../components/composeTweet';

export default class activityFeed extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            response:'',
            tweetDetails: '',
            loading: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.postTweet = this.postTweet.bind(this);
    }

    componentDidMount() {
        this.getTweets()
          .then(res => this.setState({ response: res.tweets, loading: false }))
          .catch(err => console.log(err));
      }
    
      getTweets = async () => {
        const response = await fetch('/get/tweets');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
      };

      postTweet() { 
         fetch('/post/tweet/?status='+this.state.tweetDetails)
         .then(res => {
            this.setState({tweetDetails: ''})
            this.getTweets().then(res => this.setState({ response: res.tweets, loading: false}))
          })
         .catch(err => console.log(err))
         this.setState({loading: true})
         
      }

      handleChange(event) {
        this.setState({tweetDetails: event.target.value});
      }
      
  
    render() {
        const { loading } = this.state;
        if(loading) {  
            return <div className='loader'></div>; 
        }
        return (
            <div id='feed'>
                <ComposeTweet tweetDetails={this.state.tweetDetails} handleChange={this.handleChange} postTweet={this.postTweet}/>
                <div className='holder'>
                <Tweet tweets={this.state.response}/>
                </div>
            </div>
        )
    }
};
