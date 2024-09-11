import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getSampleTemplates } from "../../utils/docRequests";
import { useEffect, useState } from "react";
import { setProject } from "../../utils/localstorageFuncs";

function stringifire(j: Record<string ,any>, delimiter: string = "  "): string {
    return JSON.stringify(j, null, delimiter)
}
export default function Modal(): JSX.Element{
    const {displayModal: mod, selected } = useSelector((state: RootState) => state.modal)

    const [state, setState] = useState({fieldName: '', value: ""})
    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e)=> {
        const {name, value} = e.target
        const parsed = JSON.parse(value)
        const stringified = stringifire(parsed)
        setState({fieldName: name, value: stringified})
        setProject("defaultProject", parsed, name)
    }

    useEffect(()=>{
        const r = async () =>{
            let p = (window.localStorage.getItem("projects"))
            if(p) {
                const o = JSON.parse(p)
                if(!o.defaultProject.set){
                    const c = await getSampleTemplates("/sampleconfig")
                    const p = await getSampleTemplates("/samplepath")
                    o.defaultProject.set = true
                    o.defaultProject.config = c
                    o.defaultProject.paths = p
                    window.localStorage.setItem("projects", JSON.stringify(o))
                    if(selected){
                        if(selected === "paths") setState({fieldName: "paths", value: stringifire(p)})
                        if(selected === "config") setState({fieldName:"config", value: stringifire(c)})
                    }
                } else {
                    if(selected === "paths") setState({fieldName: "paths", value: stringifire(o.defaultProject.paths)}) //JSON.stringify(state.value, null, "   ")
                    if(selected === "config") setState({fieldName:"config", value: stringifire(o.defaultProject.config)})
                }
            }
        }
        r()
    }, [selected])
    return <div style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        height: "50%",
        backgroundColor: "rgba(255, 255, 255, 1)",
        display: mod ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        zIndex: "100",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
    }}>
        <textarea name={state.fieldName} onChange={(e)=> handleChange(e)} value={state.value} style={{width:"100%", height: "100%", outline:"none", border:"none", whiteSpace:"pre-wrap"}}></textarea>

    </div>
}