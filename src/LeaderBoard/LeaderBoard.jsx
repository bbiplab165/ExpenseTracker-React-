import { useEffect, useState } from "react"
import axios from "axios"

import Navbar from "../Navbar/Navbar"
import Style from "./Leaderboard.module.css"

function Leaderboard() {
    const [expense, setExpense] = useState([])
    const [primeMember, setprimeMember] = useState('')

    const token = JSON.parse(localStorage.getItem("token"))||[];

    async function isprimeMember() {
        const data = await axios.get(`http://localhost:3000/isPrimeMember`, { headers: { "Authorization": token } })
        setprimeMember(data.data.primeMember.primeMember)
    }

    useEffect(() => {

        if(token.length>0){
            async function loadExpense() {
                const data = await axios.get("http://localhost:3000/leaderboard", { headers: { "Authorization": token } })
                setExpense(data.data.data)
            }
            isprimeMember()
            loadExpense()
        }
    }, [])


    return (
        <div>
            <Navbar />
            {token.length > 0 ? (
                <div>
                    {
                        primeMember === false ? (
                            <div className={Style.notAdmin}>
                                <h1>Please buy Premium to see Leaderboard</h1>
                            </div>
                        ) : (
                            <div className={Style.main}>
                                <h2>Leaderboard</h2>
                                <div className={Style.header}>
                                    <h3>Position</h3>
                                    <h3>Name</h3>
                                    <h3>Expenses</h3>
                                </div>
                                <div>
                                    {expense.map((i, index) => (
                                        <div key={index} className={Style.expenses}>
                                            <h3>{index + 1}</h3>
                                            <h3>{i.name}</h3>
                                            <h3>{i.totalExpense}</h3>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                </div>
            ) : (
                <div className={Style.notAdmin}>
                    <h1>Please Login</h1>
                </div>
            )
            }
        </div>
    )
}

export default Leaderboard