import React from 'react';
import '../css/login.css';

export default class Login extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            response: ''
        }
    }

    render() {
        return (
            <div className='login-form'>
                <a className='submit' href='http://localhost:4000/login/twitter'>Login to Twitter</a>
            </div>
        )
    }
};
