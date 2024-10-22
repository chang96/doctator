import "../elements.css"
import { useState } from "react";
import { getProject } from "../../utils/localstorageFuncs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setBaseUrl } from "../../slices/request";

type Servers = { url: string };

function Url (){
    const {selectedProjectName: projectName} = useSelector((state: RootState) => state.requestConfig)

    const projectConfiguration = getProject(projectName)
    // const serverArr = [{url: "select base url"}, ...projectConfiguration.config.servers] as Servers[]
    const serverArr = [...projectConfiguration.config.servers] as Servers[]
    const selectedEndpoint = useSelector((state: RootState) => state.requestConfig.selectedEndpoint)
    const endpointsArr = useSelector((state: RootState) => state.requestConfig.endpoints)


    const [state] = useState<{servers: Servers[]}>({servers: serverArr})
    const dispatch: AppDispatch = useDispatch()
    const handleUrlChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        const {value} = e.target
        dispatch(setBaseUrl({baseUrl: value}))
    }
    return <select value={endpointsArr[selectedEndpoint].baseUrl || serverArr[0].url} onChange={handleUrlChange}>
        {state.servers.map(({url}, index) => {
            return <option value={url} key={index}>
                {url}
            </option>
        })}
    </select>
}


export default Url