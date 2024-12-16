import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getProject } from "../../utils/localstorageFuncs";
import "./endpointDetails.css"


export default function EndpointDetails() {
  const selectedProjectName = useSelector(
    (state: RootState) => state.requestConfig.selectedProjectName
  );
  const project = getProject(selectedProjectName)
  const {paths: {endpoints}} = project
  console.log(endpoints[0])
  return <div className="endpointDetails">
    {endpoints[0].summary}
  </div>;
}
