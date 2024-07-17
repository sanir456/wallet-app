import { lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
const Heading = lazy(() => import("../components/Heading"))
const SubHeading = lazy(() => import("../components/SubHeading"))
const InputBox = lazy(() => import("../components/InputBox"))
const Button = lazy(() => import("../components/Button"))
const BottomWarning = lazy(() => import("../components/BottomWarning"))

export default function Signup(){
    const [signUpData, setSignUpData] = useState({
        username:'',
        firstName:'',
        lastName:'',
        password:''
    })

    const navigate = useNavigate()

    const onChangeHandle = (e) => {
        const {name,value} = e.target
        setSignUpData({
            ...signUpData,
            [name]:value
        })
    }    

    const onSubmitHandle = async () => {
        try{
            const response =  await axios.post("http://localhost:3000/api/v1/user/signup", signUpData)
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
        }catch(err){
            alert(err.response.data.error)
        }
    }

    return <div className="flex justify-center items-center min-h-screen bg-gray-300">
        <div className="m-2 p-6 border shadow-lg rounded bg-white lg:w-1/4">
            <Heading text="Sing Up"></Heading>
            <SubHeading text="Enter details to create account"></SubHeading>
            <InputBox id="fn" name="firstName" onChange={onChangeHandle} type="text" text="First name" placeholder="Enter your first name"></InputBox>
            <InputBox id="ls" name="lastName" onChange={onChangeHandle} type="text" text="Last name" placeholder="Enter your last name"></InputBox>
            <InputBox id="email" name="username" onChange={onChangeHandle} type="email" text="Email" placeholder="Enter your email address"></InputBox>
            <InputBox id="pass" name="password" onChange={onChangeHandle} type="password" text="Password" placeholder="Enter your password"></InputBox>
            <Button id="signup" text="Sign Up" onClick={onSubmitHandle}></Button>
            <BottomWarning text="Already have an account?" linkPlaceholder="Sing in" linkTo="/signin"></BottomWarning>
        </div>
    </div>
}