import React , {useState} from "react";
import {Link} from 'react-router-dom';
import axios from "axios"
import GoogleLogin from 'react-google-login'


function Login(){
    const [user , setUser] = useState({
        email:'' , password:''
    })
    const onChangeInput = e =>{
        const {name ,value} = e.target;
        setUser({...user,[name]:value})
    }
    const loginSubmit = async  e =>{
        e.preventDefault()
        try{
            await axios.post('/user/login' , {...user})
            localStorage.setItem('firstLogin' , true)
            window.location.href = "/";
        }
        catch(err)
        {
            alert(err.response.data.msg)
        }
    }
    const handleLogin = async googleData => {
        console.log(googleData)
      }
    return(
        <div className="login-page">
                <form onSubmit={loginSubmit}>
                    <input type='email' name='email' required
                    placeholder="Email" value={user.email} onChange={onChangeInput}/>

                    <input type='password' name='password' required  autoComplete="on"
                    placeholder="Password" value={user.password} onChange={onChangeInput}/>
                    
                    <div className="row">
                        <button type ="submit">Login</button>
                        <Link to="/register">Register</Link>

                    </div>
                </form>
                <GoogleLogin
    clientId='385566167652-81l36hjp8ihp51jcdaq98f5pvcmiba35.apps.googleusercontent.com'
    buttonText="Log in with Google"
    onSuccess={handleLogin}
    onFailure={handleLogin}
    cookiePolicy={'single_host_origin'}
/>
        </div>
    )
}

export default Login




