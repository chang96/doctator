import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getProject } from "../../utils/localstorageFuncs";
import "./referenceDetails.css"

function returnTextColor(text: string){
  if (text.toLowerCase().includes("get")) {
    return "yellow";
  } else if (text.toLowerCase().includes("post")) {
    return "orange";
  } else if (text.toLowerCase().includes("put")) {
    return "green";
  } else if (text.toLowerCase().includes("patch")) {
    return "brown";
  } else if (text.toLowerCase().includes("option")){
    return "pink"
  } else {
    return "yellow";
  }
}
function getEndpointsByTagName (tagName: string, endpointArray: RequestConfiguration[]){
    return endpointArray.filter((endpoint) => {
        return endpoint.tags.includes(tagName)
    })
}

export default function ReferenceDetails() {
  const selectedProjectName = useSelector(
    (state: RootState) => state.requestConfig.selectedProjectName
  );
  const project = getProject(selectedProjectName)
  const {config, paths: {endpoints}} = project
  const tags = config.tags as Tag[]

  return <div className="reference">
    <div className="tagoverflow">
      <div className="tagdetails">API Reference</div>
    {tags.map(({name}, i) => {
        return <div key={i}>
            <div className="tagspacing tagname">{name}</div>
            <div className="pointa">
                {getEndpointsByTagName(name, endpoints).map((endpoint, j) => {
                    return <div className="mt" key={j}>{<span className="methods" style={{color: returnTextColor(endpoint.method)}}>{endpoint.method.toUpperCase()}</span>} {<span className="pathname">{endpoint.path}</span>}</div>
                })}
            </div>
        </div>
    })}
    </div>
  </div>;
}

