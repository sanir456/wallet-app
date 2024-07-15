import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

export default function Signup(){
    return <div className="flex justify-center items-center min-h-screen bg-gray-400">
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