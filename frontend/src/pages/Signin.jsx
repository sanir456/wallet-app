import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

export default function Signin() {
    return <div className="flex justify-center items-center min-h-screen bg-gray-400">
        <div className="m-2 p-6 border shadow-lg rounded bg-white">
            <Heading text="Sing In"></Heading>
            <SubHeading text="Enter details to Sign In"></SubHeading>
            <InputBox id="email" type="email" text="Email" placeholder="Enter your email address"></InputBox>
            <InputBox id="pass" type="password" text="Password" placeholder="Enter your password"></InputBox>
            <Button id="signin" text="Sign In"></Button>
            <BottomWarning text="Do not have an account?" linkPlaceholder="Sing Up" linkTo="/signup"></BottomWarning>
        </div>
    </div>
}