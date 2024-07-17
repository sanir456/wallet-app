import { lazy } from "react";
import { useNavigate } from "react-router-dom";
const Heading = lazy(() => import("../components/Heading"))
const SubHeading = lazy(() => import("../components/SubHeading"))
const InputBox = lazy(() => import("../components/InputBox"))
const Button = lazy(() => import("../components/Button"))
const BottomWarning = lazy(() => import("../components/BottomWarning"))

export default function Signin() {
    const navigate = useNavigate()
    return <div className="flex justify-center items-center min-h-screen bg-gray-300">
        <div className="m-2 p-6 border shadow-lg rounded bg-white lg:w-1/4">
            <Heading text="Sing In"></Heading>
            <SubHeading text="Enter details to Sign In"></SubHeading>
            <InputBox id="email" type="email" text="Email" placeholder="Enter your email address"></InputBox>
            <InputBox id="pass" type="password" text="Password" placeholder="Enter your password"></InputBox>
            <Button id="signin" text="Sign In" onClick={() => {navigate("/dashboard")}}></Button>
            <BottomWarning text="Do not have an account?" linkPlaceholder="Sing Up" linkTo="/signup"></BottomWarning>
        </div>
    </div>
}