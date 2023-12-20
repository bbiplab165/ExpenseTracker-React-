import { useNavigate } from "react-router-dom"
import Style from "./Navbar.module.css"
import { useState,useEffect } from "react"
import axios from "axios"
import useRazorpay from "react-razorpay";

function Navbar() {
    const navigate = useNavigate()
    const [Razorpay] = useRazorpay();
    const [primeMember, setprimeMember] = useState(false)
    const [token,setToken]=useState('')
    

    function handleReport() {
        navigate('/Reports')
    }
    function handleHome() {
        navigate('/Home')
    }
    function handleLeaderboard() {
        navigate("/Leaderboard")
    }
    function handleLogout() {
        localStorage.setItem('token', JSON.stringify(''))
        navigate('/')
    }
    function handleLogin() {
        navigate('/')
    }

    async function isprimeMember() {
        const token = JSON.parse(localStorage.getItem("token"))
        setToken(token)
        const data = await axios.get('http://localhost:3000/isPrimeMember', { headers: { "Authorization": token } })
        setprimeMember(data.data.primeMember.primeMember)
    }

    async function handleBuyPremium(){
        const response = await axios.get('http://localhost:3000/buyPremium', { headers: { "Authorization": token } })
        console.log(response.data, response.data);
        let option = {
            "key": response.data.key_id,
            "order_id": response.data.order.id,
            "handler": async function (response) {
                await axios.post("http://localhost:3000/premium", {
                    order_id: option.order_id,
                    payment_id: response.razorpay_payment_id
                }, { headers: { "Authorization": token } })
                alert("Congratulations! you are now a prime member")
                isprimeMember()
                navigate("/Home")
            }
        }
        const rzp1 = new Razorpay(option)
        rzp1.open()
    }

    useEffect(() => {
        isprimeMember()
    }, [])

    return (
        <div className={Style.main}>
            <div className={Style.left}>
                <h2 onClick={handleHome}>₹ Expense Tracker</h2>
                <button onClick={handleReport}>Reports</button>
                <button onClick={handleLeaderboard}>LeaderBoard</button>
            </div>
            <div className={Style.right}>
                {primeMember===true?(<button>Premium Member</button>):(<button onClick={handleBuyPremium}>Buy Premium</button>)}
                {token ? (<button onClick={handleLogout}>Logout</button>) : (<button onClick={handleLogin}>Login</button>)}
            </div>
        </div>
    )
}

export default Navbar