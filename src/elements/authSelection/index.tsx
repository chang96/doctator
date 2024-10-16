import { useSelector, useDispatch } from "react-redux";
import { getProject } from "../../utils/localstorageFuncs";
import { setHeaders } from "../../slices/request";
import "../elements.css"
import { AppDispatch, RootState } from "../../store/store";
type SecurityType = Record<string, boolean | Array<any>>;

function AuthSelection (){
    const projectName = "defaultProject";
    const projectConfiguration = getProject(projectName);
    const securityArr = projectConfiguration.config.security as SecurityType[];
    let {headers} = useSelector((state: RootState) => state.requestConfig)
    const dispatch: AppDispatch = useDispatch()
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const {value} = e.target
        const sec = securityArr[Number(value)]
        const newSec = {} as Record<string, string>
        for (const k in sec) {
            newSec[k] = ""
        }
        headers = {...newSec, ...headers}
        dispatch(setHeaders({headers}))
    }

    return <div className="ov">
        {securityArr.map((sec, index) => {
            return <div className="m2 fr" key={index} >
                <div>
                    <input name="securitySelection" type="radio" onChange={handleChange} value={index} />
                </div>
                <div>
                    {Object.entries(sec).map(([k, _v], i) => {
                        return <div key={i}>{k}</div>
                    })}
                </div>
            </div>
        })}
    </div>
}

export default AuthSelection