import { lazy } from "react"
import { useNavigate } from "react-router-dom"

const Button = lazy(() => import("./Button"))
export default function({users}) {
    const navigate = useNavigate()
    return <div>
        {/* {users} */}
        {users.map((user) => {
           return <div key={user._id} className="flex justify-between mx-2 mr-8">
                <div className="p-1 pl-3 flex justify-center items-center gap-2">
                    <div className="rounded-full w-10 h-10 text-center p-2 bg-slate-300"> S </div>
                    <div className="text-md">{user.firstName} {user.lastName}</div>
                </div>
                <div className="p-1 pl-3 flex justify-center items-center gap-2">
                    <Button id="sendMoney" text="Send Money" onClick={() => {navigate("/send")}}></Button>
                </div>
            </div>
        })}
    </div>
}