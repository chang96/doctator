import { useState } from "react"
import { getProject, setProjectByProjectName } from "../../utils/localstorageFuncs"
import "../elements.css"

function Info() {
    const projectName = 'defaultProject'
    const projectConfiguration = getProject(projectName)
    const {title, version} = projectConfiguration.config.info
    const [state, setState] = useState({title, version })
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const {name, value} = e.target
        setState((state)  => {
            return {...state, [name]: value }
        })
        projectConfiguration.config.info[name] = value
        setProjectByProjectName(projectName, projectConfiguration)
    }
    return <div className="c">
        <div><p>Info</p></div>
        
        <div><p>title:</p></div>
        <div><input onChange={handleChange} value={state.title} name="title" /></div>

        <div><p>version:</p></div>
        <div><input onChange={handleChange} value={state.version} name="version" /></div>
    </div>
}

export default Info