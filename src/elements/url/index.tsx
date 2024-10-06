import "../elements.css"
import { useState } from "react";
import { getProject } from "../../utils/localstorageFuncs";
type Servers = { url: string };

function Url (){
    const projectName = "defaultProject";
    const projectConfiguration = getProject(projectName)
    const serverArr = projectConfiguration.config.servers as Servers[]

    const [state] = useState<{servers: Servers[]}>({servers: serverArr})
    return <select>
        {state.servers.map(({url}, index) => {
            return <option key={index}>
                {url}
            </option>
        })}
    </select>
}


export default Url