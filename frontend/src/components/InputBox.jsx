export default function({id,name, type, text, placeholder, onChange}) {
    return <div className="pb-2">
        <div className="p-1 text-md font-medium">
            {text}
        </div>
        <div className="text-xs">
           <input id={id} name={name} placeholder={placeholder} type={type} onChange={onChange} className="p-2 border border-gray-300 rounded w-full "></input>
        </div>
    </div>
}