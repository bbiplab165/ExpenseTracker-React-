import { useState } from "react"
import Style from "./ForgotPassword.module.css"
import axios from "axios";


function ForgotPassword(){
    const [email,setEmail]=useState('')
    async function handleReset(){
        console.log(email);
        await axios.post("http://localhost:3000/forgotPassword",{
            email:email
        })
    }
    return(
        <div className={Style.main}>
            <div className={Style.login}>
                <h2>Please give Your Email</h2>
                <input type="Email" onChange={(e)=>setEmail(e.currentTarget.value)}/>
                <button onClick={handleReset}>Reset Password</button>
            </div>
        </div>
    )
}

export default ForgotPassword