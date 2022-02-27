import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';
import { useContext , useRef } from 'react';

const ProfileForm = () => {
  const {token} = useContext(AuthContext);
  const passwordInputRef = useRef();

  const submitHandler = async(e) => {
    e.preventDefault();
    try{
      const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDB5z8RCQ72yq5BpIL1NErMYZk8kJH_Qqs",
      {
        method:'POST',
        body:JSON.stringify({
          idToken:token,
          "password": passwordInputRef.current.value,
          "returnSecureToken":false
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
        alert("Password update successfully!");
      }
    }
    catch(err){
      console.log(err.message);
    }
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
