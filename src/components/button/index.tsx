
const defaultStyle: React.CSSProperties = {
    "borderRadius": "10px",
    "border": "none",
    "fontWeight": 300,
    "color": "rgb(5, 5, 5)",
    "fontSize": "0.8rem",   
    "letterSpacing": "1.1px",
    "lineHeight": "1.7",
    "textTransform": "capitalize"
}

export default function Btn({ styles, name, func }: { styles: React.CSSProperties, name: string, func: (...args: any[])=> void } ): JSX.Element{
    return <button style={{...defaultStyle, ...styles}} onClick={()=>func()} >{name}</button>
    
}