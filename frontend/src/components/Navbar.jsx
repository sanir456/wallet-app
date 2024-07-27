import { useNavigate } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import { userAtom } from "../store/atoms/user"
import { lazy } from "react"

const Button = lazy(()=> import("./Button"))
export default function Navbar(){
    const navigate = useNavigate()
    const [user, setUser] = useRecoilState(userAtom)

    const logoutHandler = () => {
        localStorage.removeItem("token")
        setUser({
            username:'',
            firstName:'',
            lastName:'',
            isLoggedIn:false
        })
        navigate("/signin")
    }

    if(!user.isLoggedIn)
    {
        return
    }

    return <div className="flex justify-between px-2 pt-1 shadow shadow-md">
        <div className="p-1 pl-3 flex justify-center items-center gap-2">
            <img src="src/assets/logo.png" className="w-8 h-8 rounded-md" ></img>
            <div className="font-bold text-2xl" onClick={() => {navigate("/Dashboard")}}>Wallet</div>
        </div>
        <div className="p-1 pl-3 flex justify-center items-center gap-2">
            <div>Hello {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}</div>
            <Button id="sendMoney" onClick={logoutHandler} text="Logout" ></Button>
        </div>
    </div>
}