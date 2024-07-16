import { lazy } from "react";
const Heading = lazy(() => import("../components/Heading"))
const SubHeading = lazy(() => import("../components/SubHeading"))
const InputBox = lazy(() => import("../components/InputBox"))
const Button = lazy(() => import("../components/Button"))
const BottomWarning = lazy(() => import("../components/BottomWarning"))

export default function Signup(){
    return <div className="flex justify-center items-center min-h-screen bg-gray-300">
        <div className="m-2 p-6 border shadow-lg rounded bg-white">
            <Heading text="Sing Up"></Heading>
            <SubHeading text="Enter details to create account"></SubHeading>
            <InputBox id="fn" type="text" text="First name" placeholder="Enter your first name"></InputBox>
            <InputBox id="ls" type="text" text="Last name" placeholder="Enter your last name"></InputBox>
            <InputBox id="email" type="email" text="Email" placeholder="Enter your email address"></InputBox>
            <InputBox id="pass" type="password" text="Password" placeholder="Enter your password"></InputBox>
            <Button id="signup" text="Sign Up"></Button>
            <BottomWarning text="Already have an account?" linkPlaceholder="Sing in" linkTo="/signin"></BottomWarning>
        </div>
    </div>
}