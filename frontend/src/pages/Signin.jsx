import { lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useSetRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user";
const Heading = lazy(() => import("../components/Heading"))
const SubHeading = lazy(() => import("../components/SubHeading"))
const InputBox = lazy(() => import("../components/InputBox"))
const Button = lazy(() => import("../components/Button"))
const BottomWarning = lazy(() => import("../components/BottomWarning"))

export default function Signin() {
    const [signInData, setSignInData] = useState({
        username:'',
        password:''
    })
    const setUser = useSetRecoilState(userAtom)

    const navigate = useNavigate()

    const onChangeHandle = (e) => {
        const {name,value} = e.target
        setSignInData({
            ...signInData,
            [name]:value
        })
    }

    const onSubmitHandle = async () => {
        try{
            const response =  await axios.post("http://localhost:3000/api/v1/user/signin", signInData)
            localStorage.setItem("token", response.data.token)
            setUser({
                ...response.data.user,
                isLoggedIn:true
            })
            navigate("/dashboard")
        }catch(err){
            alert(err.response.data.error)
        }
    }

    return <div className="flex justify-center items-center min-h-screen bg-gray-300">
        <div className="m-2 p-6 border shadow-lg rounded bg-white lg:w-1/4">
            <Heading text="Sing In"></Heading>
            <SubHeading text="Enter details to Sign In"></SubHeading>
            <InputBox id="email" onChange={onChangeHandle} name="username" type="email" text="Email" placeholder="Enter your email address"></InputBox>
            <InputBox id="pass" onChange={onChangeHandle} name="password" type="password" text="Password" placeholder="Enter your password"></InputBox>
            <Button id="signin" text="Sign In" onClick={onSubmitHandle}></Button>
            <BottomWarning text="Do not have an account?" linkPlaceholder="Sing Up" linkTo="/signup"></BottomWarning>
        </div>
    </div>
}