import React , {useState} from "react";
import {Link} from 'react-router-dom';
import axios from "axios"

function Register(){
    const [user , setUser] = useState({
       name:"" , email:'' , password:''
    })
    const onChangeInput = e =>{
        const {name ,value} = e.target;
        setUser({...user,[name]:value})
    }
    const registerSubmit = async  e =>{
        e.preventDefault()
        try{
            await axios.post('/user/register' , {...user})
            localStorage.setItem('firstlogin' , true)
            window.location.href = "/";
        }
        catch(err)
        {
            alert(err.response.data.msg)
        }
    }
    return(
        <div className="login-page">
                <form onSubmit={registerSubmit}>
                    <input type='text' name='name' required
                    placeholder="Name" value={user.name} onChange={onChangeInput}/>

                    <input type='email' name='email' required
                    placeholder="Email" value={user.email} onChange={onChangeInput}/>    

                    <input type='password' name='password' required  autoComplete="on"
                    placeholder="Password" value={user.password} onChange={onChangeInput}/>
                    
                    <div className="row">
                        <button type ="submit">Register</button>
                        <Link to="/login">Login</Link>

                    </div>
                </form>
        </div>
    )
}

export default Register



// import React from 'react';
// import { GoogleLogout } from 'react-google-login';

// const clientId =
//   '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

// function Logout() {
//   const onSuccess = () => {
//     console.log('Logout made successfully');
//     alert('Logout made successfully ✌');
//   };

//   return (
//     <div>
//       <GoogleLogout
//         clientId={clientId}
//         buttonText="Logout"
//         onLogoutSuccess={onSuccess}
//       ></GoogleLogout>
//     </div>
//   );
// }

// export default Logout;