import "../elements.css"
import { useState } from "react";
import { getProject } from "../../utils/localstorageFuncs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setBaseUrl } from "../../slices/request";

type Servers = { url: string };

function Url (){
    const projectName = "defaultProject";
    const projectConfiguration = getProject(projectName)
    // const serverArr = [{url: "select base url"}, ...projectConfiguration.config.servers] as Servers[]
    const serverArr = [...projectConfiguration.config.servers] as Servers[]


    const [state] = useState<{servers: Servers[]}>({servers: serverArr})
    const dispatch: AppDispatch = useDispatch()
    const handleUrlChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        const {value} = e.target
        dispatch(setBaseUrl({baseUrl: value}))
    }
    return <select onChange={handleUrlChange}>
        {state.servers.map(({url}, index) => {
            return <option key={index}>
                {url}
            </option>
        })}
    </select>
}


export default Url