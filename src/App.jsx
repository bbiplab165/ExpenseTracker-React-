import {Route,Routes} from "react-router-dom"

import Login from './Login/Login'
import Registration from './Registration/Registration'
import Home from "./Home/Home"
import Reports from "./Reports/Reports"
import Leaderboard from "./LeaderBoard/LeaderBoard"
import ForgotPassword from "./ForgotPassword/ForgotPassword"

import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/Registration" element={<Registration/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/Reports" element={<Reports/>}/>
      <Route path="/Leaderboard" element={<Leaderboard/>}/>
      <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
    </Routes>
  )
}

export default App
