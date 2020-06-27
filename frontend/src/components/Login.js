import React from 'react';

function Login()
{
  const doLogin= async event=>
  {
    event.preventDefault();
  };
  return(
  <>
    <h1 id="loginTitle">Login Here</h1>
    <div id="login">
    <form onSubmit={doLogin}>
    <span id="usernameLoginTitle">Username</span>
    <input type="text" id="usernameLogin" placeholder="Username"/>
    <br/>
    <span id="passwordLoginTitle">Password</span>
    <input type="password" id="passwordEnter" placeholder="Password"/>
    <br/>
    <input type="submit" id="loginButton" class="button" value="Sign In"
    onClick={doLogin}/>
    </form>
    <span id="loginResult"></span>
    </div>
    </>

  );
};
export default Login;
