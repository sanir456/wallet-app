import { Link } from "react-router-dom";

export default function({text,linkPlaceholder, linkTo}) {
    return <div className="flex gap-2 text-xs justify-center">
        <div>
            <p>{text}</p>
        </div>
        <Link className="pointer cursor-pointer underline" to={linkTo}>{linkPlaceholder}</Link>
    </div>
}