
import { useEffect, useState } from "react"
import {  useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar"
import Style from "./Home.module.css"
import axios from "axios"

function Home() {
    const [catagory, setCatagory] = useState('')
    const [description, setDest] = useState('')
    const [amount, setAmount] = useState('')
    const [update, setUpdate] = useState(false)
    const [allExpense, setAllExpense] = useState([])
    const [id, setId] = useState('')

    const token=JSON.parse(localStorage.getItem("token")) || [];

    function handleSelect(e) {
        setCatagory(e.target.value)
    }
    async function addExpense() {
        await axios.post("http://localhost:3000/createExpense", { catagory, amount, description },{ headers: { "Authorization": token } })
        fetchAllExpense()
    }
    async function fetchAllExpense() {
        const expense = await axios.get("http://localhost:3000/allExpense",{ headers: { "Authorization": token } })

        setAllExpense(expense.data.expense)
    }
    useEffect(() => {
        fetchAllExpense()
    }, [])

    async function handleEdit(expense){
        console.log(expense._id);
        setCatagory(expense.catagory)
        setDest(expense.description)
        setAmount(expense.amount)
        setId(expense._id)
        setUpdate(true)
    }

    async function handleDelete(id){
        console.log(id);
        await axios.post("http://localhost:3000/delete",{id:id},{ headers: { "Authorization": token } })
        fetchAllExpense()
    }

    async function handleUpdate(){
        const data=await axios.post("http://localhost:3000/update",{catagory,description,amount,id},{ headers: { "Authorization": token } })
        console.log(data);
        setCatagory('')
        setDest('')
        setAmount('')
        setUpdate(false)
        fetchAllExpense()
    }

    return (
        <div className={Style.main}>
            <Navbar />
            <div className={Style.addExpense}>
                <div className={Style.select}>
                    <select value={catagory} onChange={handleSelect}>
                        <option>Select Catagory</option>
                        <option>Fuel</option>
                        <option>Rent</option>
                        <option>Food</option>
                        <option>Clothes</option>
                    </select>
                </div>
                <div className={Style.desc}>
                    <label>Description :</label>
                    <input value={description} type="test" onChange={(e) => setDest(e.target.value)} />
                </div>
                <div className={Style.amount}>
                    <label>Amount :</label>
                    <input value={amount} type="number" onChange={(e) => setAmount(e.target.value)} />
                </div>
                {update===true?(<button onClick={handleUpdate}>Update</button>):(<button onClick={addExpense}>Add Expense</button>)}
            </div>
            <div className={Style.showItem}>
                <table>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Catagory</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allExpense.map((i) => (
                                <tr key={i._id}>
                                    <td>{i.date}</td>
                                    <td>{i.catagory}</td>
                                    <td>{i.description}</td>
                                    <td>{i.amount}</td>
                                    <td className={Style.button}>
                                        <button onClick={()=>handleEdit(i)}>Edit</button>
                                        <button onClick={()=>handleDelete(i._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

            </div>
        </div >
    )
}

export default Home