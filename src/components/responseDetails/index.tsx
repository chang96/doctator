import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getProject } from "../../utils/localstorageFuncs";
import "./responseDetails.css"


export default function ResponseDetails() {
  const selectedProjectName = useSelector(
    (state: RootState) => state.requestConfig.selectedProjectName
  );
  const project = getProject(selectedProjectName)
  const {paths: {endpoints}} = project

  return <div className="">
    {endpoints[0].responses[0].code}
  </div>;
}
