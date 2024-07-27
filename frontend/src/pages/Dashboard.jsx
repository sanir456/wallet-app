import { lazy, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Balance = lazy(() => import("../components/Balance"))
const Users = lazy(() => import("../components/Users"))


export default function Dashboard() {
    const [balance, setBalance] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        const fetchBalanced = async () => {
            try{
                const response = await axios.get("http://localhost:3000/api/v1/account/balance",
                    {
                        headers:{
                            'authorization':"Beared " + localStorage.getItem("token")
                        }
                    }
                )
                setBalance(response.data.balance/100)
            } catch(error){
            console.log(error);
            navigate("/signin")
            }
        }
        fetchBalanced()
    },[])

    return <div>
        <Balance balance={balance}></Balance>
        <hr></hr>
        <Users></Users>
    </div>
}