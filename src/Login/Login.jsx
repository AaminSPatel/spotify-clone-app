import style from './Login.module.css'
import {FaFacebook,FaGoogle,FaApple,FaToggleOff,FaToggleOn} from 'react-icons/fa6'

export default function Login(){
   

    return(
        <section className={style.container}>
            <div className={style.log1}>
                <h1>Login to Spotify</h1>
                <ul>
                    <li><a href="#">
                        <span><FaGoogle/></span>
                        Continue with Google
                        </a></li>
                    <li><a href="#">
                    <span><FaFacebook/></span>
                    Continue with Facebook
                        </a></li>
                    <li><a href="#">
                    <span><FaApple/></span>
                    Continue with Apple
                        </a></li>
                    <li><a href="#">
                        Continue with phone number
                        </a></li>
                </ul>
            </div>
            <hr />
            <div className={style.log2}>
                <form action="">
                    <label htmlFor="username">Email or username</label>
                    <input type="text" placeholder='Email or username'/> 

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='Password'/>

                    <p>
                     <input type="checkbox" />Remember me
                    </p>

                    <button>Log In</button>

                    <a href="#">Forgot you password</a>
                </form>
            </div>
            <hr />
            <div className={style.log3}>
                <p>
                    Don't have an account?  
                    <a href="#"> Sign up for Spotify</a>
                </p>
                

            </div>
        </section>
    )
}