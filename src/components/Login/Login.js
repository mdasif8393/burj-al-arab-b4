import React, { useContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


firebase.initializeApp(firebaseConfig);




const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;
            
            loggedInUser.name = user.displayName;
            loggedInUser.email = user.email;
            history.replace(from);
            console.log(loggedInUser);
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
    }

    return (
        <div style={{textAlign: 'center'}}>
            <button style={{backgroundColor: 'lightgray'}}onClick={handleGoogleSignIn}>Google Sign in</button>
        </div>
    );
};

export default Login;