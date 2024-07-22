import { lazy, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"

const InputBox = lazy(() => import("../components/InputBox"))
const Button = lazy(() => import("../components/Button"))

export default function SendMoney() {
    const [amount, setAmount] = useState(0)
    const [params] = useSearchParams()
    const id = params.get("id")
    const name = params.get("name")   
    const navigate = useNavigate()
    console.log(amount);

    async function initiateTransfer() {
        try{
            const response = await axios.post("http://localhost:3000/api/v1/account/transfer",
                {
                    "toUser":id,
                    "amount":amount
                },
                {
                    headers:{
                        'authorization':"Beared " + localStorage.getItem("token")
                    }
                }
            )
            navigate("/dashboard")
        }catch(err){
            console.log(err.response.data.error);
            alert(err.response.data.error)
        }
    }

    return <div className="flex justify-center items-center min-h-screen bg-slate-200">
        <div className="flex flex-col shadow shadow-md px-8 bg-white">
            <div className="p-16 pt-8 pb-8 text-3xl font-bold text-center">
                Send Money
            </div>
            <div className=" flex flex-row justify-start items-center gap-2">
                <div className="rounded-full w-10 h-10 text-center p-2 bg-green-600"> S </div>
                <div className="text-md font-semibold"> {name} </div>
            </div>
            <div className="py-2">
                <InputBox id="amount" type="number" text="Amount (in Rs)" onChange={(e) => {setAmount(e.target.value)}} placeholder="Enter Amount"></InputBox>
            </div>
            <div className="pb-8">
                <Button id="tx_init" onClick={initiateTransfer} text="Initiate Transfer" className="bg-green-600 text-white font-medium w-full rounded-md text-xs p-2 my-2"></Button>
            </div>
        </div>
    </div>
}