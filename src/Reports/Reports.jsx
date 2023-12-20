import { useEffect, useState } from "react"
import Navbar from "../Navbar/Navbar"

import Style from "./Reports.module.css"
import axios from "axios"

function Reports() {
    const [dayExpense, setDayExpense] = useState([])
    const [monthlyExpense, setMonthlyExpense] = useState([])
    const [date, setDate] = useState('')
    const [month, setMonth] = useState('')
    const [primeMember, setprimeMember] = useState('')
    const [totalDaily, setTotalDaily] = useState(0)
    const [totalMonth, setTotalMonth] = useState(0)

    const token = JSON.parse(localStorage.getItem("token"))

    async function isprimeMember() {
        const data = await axios.get(`http://localhost:3000/isPrimeMember`, { headers: { "Authorization": token } })
        setprimeMember(data.data.primeMember.primeMember)
    }

    useEffect(() => {

        if (token.length > 0) {
            isprimeMember()
        }
    }, [])

    async function handleDate() {
        console.log(date);
        let d
        const parts = date.split("-");
        if (parts.length === 3) {
            const [year, month, day] = parts;
            d = `${day}-${month}-${year}`;
        }
        const data = await axios.get(`http://localhost:3000/searchDate/${d}`, { headers: { "Authorization": token } })
        setDayExpense(data.data.userData)
        console.log(data.data);
        setTotalDaily(data.data.total)
    }
    async function handleMonth() {
        const data = await axios.get(`http://localhost:3000/searchMonth/${month}`, { headers: { "Authorization": token } })
        setMonthlyExpense(data.data.userData)
        console.log(data);
        setTotalMonth(data.data.total)
    }
    return (
        <div>
            <Navbar />
            {token.length > 0 ? (
                <div className={Style.report}>
                    {primeMember === false ? (
                        <div className={Style.notprimeMember}>
                            <h1>Please buy Premium to see Reports</h1>
                        </div>
                    ) : (
                        <div>
                            <div className={Style.main}>
                                <div className={Style.search}>
                                    <h3>Daily Report</h3>
                                    <div className={Style.input}>
                                        <label>Select Date :</label>
                                        <input type="date" pattern="\d{4}-\d{2}-\d{2}" onChange={(e) => setDate(e.target.value)} />
                                        <button onClick={handleDate}>Search</button>
                                    </div>
                                </div>
                                <div className={Style.table}>
                                    <div className={Style.rowHeader}>
                                        <h3>Data</h3>
                                        <h3>Category</h3>
                                        <h3>Description</h3>
                                        <h3>Amount</h3>
                                    </div>
                                    {dayExpense.length === 0 ? (
                                        <h3 className={Style.noData}>Please select a date</h3>
                                    ) : (
                                        <div className={Style.right}>
                                            <div className={Style.contains}>
                                            {dayExpense.map((i) => (
                                                <div className={Style.row} key={i._id}>
                                                    <h3>{i.date}</h3>
                                                    <h3>{i.catagory}</h3>
                                                    <h3>{i.description}</h3>
                                                    <h3>{i.amount}</h3>
                                                </div>
                                            ))}
                                            </div>
                                            <h2 className={Style.total}>Total: ₹{totalDaily}</h2>
                                        </div>
                                    )}
                                </div>

                            </div>
                            <div className={Style.main}>
                                <div className={Style.search}>
                                    <h3>Monthly Report</h3>
                                    <div className={Style.input}>
                                        <label>Select Month :</label>
                                        <input type="month" onChange={(e) => setMonth(e.target.value)} />
                                        <button onClick={handleMonth}>Search</button>
                                    </div>
                                </div>
                                <div className={Style.table}>
                                    <div className={Style.rowHeader}>
                                        <h3>Data</h3>
                                        <h3>Category</h3>
                                        <h3>Description</h3>
                                        <h3>Amount</h3>
                                    </div>
                                    {monthlyExpense.length === 0 ? (
                                        <h3 className={Style.noData}>Please select a Month</h3>
                                    ) : (
                                        <div className={Style.right}>
                                            <div className={Style.contains}>
                                                {monthlyExpense.map((i) => (
                                                    <div className={Style.row} key={i._id}>
                                                        <h3>{i.date}</h3>
                                                        <h3>{i.catagory}</h3>
                                                        <h3>{i.description}</h3>
                                                        <h3>{i.amount}</h3>
                                                    </div>
                                                ))}
                                            </div>
                                            <h2 className={Style.total}>Total: ₹{totalMonth}</h2>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className={Style.notprimeMember}>
                    <h1>Please Login</h1>
                </div>
            )
            }
        </div>
    );
}

export default Reports