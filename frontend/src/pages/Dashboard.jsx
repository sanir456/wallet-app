import { lazy, useEffect, useState } from "react"
import axios from "axios"

const Balance = lazy(() => import("../components/Balance"))
const Users = lazy(() => import("../components/Users"))


export default function Dashboard() {
    const [balance, setBalance] = useState("")

    useEffect(() => {
        async function getBalance(){
            const responce = await axios("http://localhost:3000/api/v1/account/balance",
                {
                    headers:{
                        'authorization':"Beared " + localStorage.getItem("token")
                    }
                }
            )
            setBalance(responce.data.balance/100)
        }
        getBalance()
    })

    return <div>
        <Balance balance={balance}></Balance>
        <hr></hr>
        <Users></Users>
    </div>
}