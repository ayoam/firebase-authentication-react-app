import React, { useEffect, useState } from 'react'

const AuthContext = React.createContext({
  token:'',
  isLoggedIn:false,
  login:(token)=>{},
  logout:()=>{}
})

export const AuthContextProvider = (props) => {
  const [token,setToken]=useState(null);
  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token',token);
  }

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
  }
  useEffect(()=>{
    const initialToken = localStorage.getItem('token');
    if(initialToken!=null){
      setToken(initialToken);
    }
  },[])

  return(
    <AuthContext.Provider value={{
      token,
      isLoggedIn:userIsLoggedIn,
      login:loginHandler,
      logout:logoutHandler
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext