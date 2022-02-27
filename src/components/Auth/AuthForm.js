import { useState , useRef, useContext } from 'react';
import { useHistory } from "react-router-dom"

import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const {login} = useContext(AuthContext);
  const history = useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async(e) => {
    e.preventDefault();
    if(isLogin){
      try{
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDB5z8RCQ72yq5BpIL1NErMYZk8kJH_Qqs",
        {
          method:'POST',
          body:JSON.stringify({
            "email":emailInputRef.current.value,
            "password":passwordInputRef.current.value,
            "returnSecureToken":true
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        });
        
        // if(!response.ok){throw new Error()};

        const data = await response.json();

        if(data.error){
          alert(data.error.message);
        }

        login(data.idToken);

        history.replace('/profile');

      }catch(error){
        console.log(error.message);
      }

    }else{
      try{
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDB5z8RCQ72yq5BpIL1NErMYZk8kJH_Qqs",
        {
          method:'POST',
          body:JSON.stringify({
            "email":emailInputRef.current.value,
            "password":passwordInputRef.current.value,
            "returnSecureToken":true
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        });
        
        // if(!response.ok){throw new Error()};

        const data = await response.json();

        if(data.error){
          alert(data.error.message);
        }else{
          //verification email
          // const emailVerificationResponse = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDB5z8RCQ72yq5BpIL1NErMYZk8kJH_Qqs",
          // {
          //   method:'POST',
          //   body:JSON.stringify({
          //     "requestType":"VERIFY_EMAIL",
          //     "idToken":data.idToken,
          //   }),
          //   headers:{
          //     'Content-Type': 'application/json'
          //   }
          // });
          // const emailVerificationData= await emailVerificationResponse.json();
          // console.log(emailVerificationData);
        }
      }
      catch(err){
        console.log(err.message);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordInputRef} required />
        </div>
        <div className={classes.actions}>
          <button >{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
