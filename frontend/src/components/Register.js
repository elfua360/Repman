import React from 'react';

function Register()
{
  const doRegister= async event=>
  {
    event.preventDefault();
  };
  return(
  <>
    <h1 id="registerTitle">Register Here</h1>
    <div id="register">
    <form onSubmit={doRegister}>
    <span id="usernameRegisterTitle">Username</span>
    <input type="text" id="usernameRegister" placeholder="Username"/>
    <br/>
    <span id="passwordRegisterTitle">Password</span>
    <input type="password" id="passwordCreate" placeholder="Password"/>
    <br/>
    <input type="submit" id="createButton" class="button" value="Create Account"
    onClick={doRegister}/>
    </form>
    <span id="registerResult"></span>
    </div>
    </>

  );
};
export default Register;
