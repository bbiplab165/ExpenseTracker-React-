import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import Style from "./Login.module.css"

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const navigate = useNavigate()

    function handleRegistration() {
        navigate("/Registration")
    }

    async function handleLogin(e) {
        e.preventDefault()
        const res = await axios.post("http://localhost:3000/login", { email, password })
        // console.log(res.data.admin);
        localStorage.setItem('token',JSON.stringify(res.data.token))
        navigate("/Home")
    }
    return (
        <div className={Style.main}>
            <div className={Style.login}>
                <div className={Style.details}>
                    <h1>Login</h1>
                    <div className={Style.email}>
                        <label>Email:</label>
                        <input type="Email" onChange={(e) => setEmail(e.target.value)} className={Style.input} />
                    </div>
                    <div className={Style.password}>
                        <label>Password:</label>
                        <input type="password" onChange={(e) => setPass(e.target.value)} className={Style.input} />
                    </div>
                    {/* <h4 >Forget Password?</h4> */}
                    <button onClick={handleLogin}>Login</button>
                </div>
                <div className={Style.right}>
                    <div className={Style.cointaner}>
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button onClick={handleRegistration}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Login