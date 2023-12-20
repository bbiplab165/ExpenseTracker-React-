import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import Style from "./Registration.module.css"

function Registration() {
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate()

    function handleLogin() {
        navigate("/")
    }

    async function handleRegist(e) {
        e.preventDefault()
        const res = await axios.post("http://localhost:3000/create", { name, email, password })
        console.log(res.data.admin);
        navigate("/")
    }
    return (
        <div className={Style.main}>
            <div className={Style.Registration}>
                <div className={Style.div}>
                    <h1>Create Account</h1>
                    <div className={Style.name}>
                        <label>Name:</label>
                        <input type="text" onChange={(e) => setName(e.target.value)} className={Style.input} />
                    </div>
                    <div className={Style.email}>
                        <label>Email:</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} className={Style.input} />
                    </div>
                    <div className={Style.password}>
                        <label>Password:</label>
                        <input type="password" onChange={(e) => setPass(e.target.value)} className={Style.input} />
                    </div>
                    <button onClick={handleRegist}>Register</button>
                </div>
                <div className={Style.right}>
                    <div className={Style.cointaner}>
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button onClick={handleLogin}>Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration