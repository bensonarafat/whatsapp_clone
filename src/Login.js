import React from 'react' 
import "./Login.css"
import Button from '@mui/material/Button';
import {provider} from "./firebase";
import { getAuth, signInWithPopup } from "firebase/auth";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login(){
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
          .then((result) => {
            dispatch({
                type: actionTypes.SET_USER, 
                user: result.user
            })
            // ...
          }).catch((error) => {
            alert("Oops, there was an error sign in");
          });
     
    }
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://static.whatsapp.net/rsrc.php/v3/y7/r/DSxOAUB0raA.png" alt="Whatspp"/>
            
                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button onClick={signIn}>Sign In With Google</Button>
            </div>
        </div>
    );
}

export default Login;