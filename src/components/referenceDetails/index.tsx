import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getProject } from "../../utils/localstorageFuncs";
import "./referenceDetails.css"

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
    <div>
    {tags.map(({name}, i) => {
        return <div key={i}>
            <div>{name}</div>
            <div>
                {getEndpointsByTagName(name, endpoints).map((endpoint, j) => {
                    return <div key={j}>{endpoint.method} {endpoint.path}</div>
                })}
            </div>
        </div>
    })}
    </div>
  </div>;
}

