import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getProject } from "../../utils/localstorageFuncs";
import "./endpointDetails.css"
import { returnTextColor } from "../../utils/helpers";

function AuthorizationComponent ({pathDetails, config}: {config: any, pathDetails: RequestConfiguration}){
  console.log(pathDetails.authd, config)
  const sec = config.security[pathDetails.authd.position -1]
  return <div>
      <div><h3 className="authorizationheader">Authorization</h3></div>
      <div>
        
      </div>
  </div>
}
function BodyComponent() {

}

function QueryComponent() {

}
export default function EndpointDetails() {
  const selectedProjectName = useSelector(
    (state: RootState) => state.requestConfig.selectedProjectName
  );
  const project = getProject(selectedProjectName)
  const {config, paths: {endpoints}} = project as {config: any, paths: Record<string, RequestConfiguration[]>}
  return <div className="endpointDetails">
    <div className="endpointdetailstitle">{endpoints[0].tags[0]}</div>
    <div className="endpointSummary">{endpoints[0].summary}</div>
    <div className="endpointDescription">{endpoints[0].description}</div>
    <div className="endpointMethodAndPath">
        <div className="innerEndpointMethodAndPath">
          <span style={{color: returnTextColor(endpoints[0].method)}} className="endpointMethod">{endpoints[0].method.toUpperCase()} </span> 
          <span className="endpointPath"> - {endpoints[0].path}</span>
          <span><button className="sendbtn" style={{backgroundColor:returnTextColor(endpoints[0].method)}}>Send</button></span>
        </div>
    </div>
    <div><hr></hr></div>
    <div>
        {endpoints[2].authd.use? <AuthorizationComponent config={config} pathDetails={endpoints[2]} /> : <div></div>}
    </div>
  </div>;
}
