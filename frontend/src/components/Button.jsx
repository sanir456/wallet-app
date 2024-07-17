export default function Button({id, text, onClick}) {
    return <div>
        <button id={id}  onClick={onClick} className="bg-black text-white font-medium w-full rounded-md text-xs p-2 my-2">{text}</button>
    </div>
}