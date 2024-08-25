
const defaultStyle: React.CSSProperties = {
    "borderRadius": "10px",
    "border": "none"
}

export default function Btn({ styles, name, func }: { styles: React.CSSProperties, name: string, func: (...args: any[])=> void } ): JSX.Element{
    return <button style={{...defaultStyle, ...styles}} onClick={()=>func()} >{name}</button>
    
}