export default function({id,type, text, placeholder}) {
    return <div className="pb-2">
        <div className="p-1 text-xs font-medium">
            {text}
        </div>
        <div className="text-xs">
            <input id={id} placeholder={placeholder} type={type} className="p-1 border border-gray-350 rounded"></input>
        </div>
    </div>
}