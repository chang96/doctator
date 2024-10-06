import { getProject } from "../../utils/localstorageFuncs";
import "../elements.css"
type SecurityType = Record<string, boolean | Array<any>>;

function AuthSelection (){
    const projectName = "defaultProject";
    const projectConfiguration = getProject(projectName);
    const securityArr = projectConfiguration.config.security as SecurityType[];
    console.log(securityArr)

    return <div className="ov">
        {securityArr.map((sec, index) => {
            return <div className="m2" key={index}>
                {Object.entries(sec).map(([k, _v], i) => {
                    return <div key={i}>{k}</div>
                })}
            </div>
        })}
    </div>
}

export default AuthSelection