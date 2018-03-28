import React from 'react';
import '../css/login.css';
import { Link } from 'react-router-dom'

export default class Login extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {}
    }


    render() {
        return (
            <div className='login-form'>
                <Link to={{ pathname: '/activityFeed' }}>
                    <button className='submit'>Login to Twitter</button>
                </Link>
            </div>
        )
    }
};
