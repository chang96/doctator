import { useSelector, useDispatch } from "react-redux";
import { getProject } from "../../utils/localstorageFuncs";
import { setHeaders, setAuthd } from "../../slices/request";
import "../elements.css";
import { AppDispatch, RootState } from "../../store/store";
type SecurityType = Record<string, boolean | Array<any>>;

function AuthSelection() {
  const {selectedProjectName: projectName} = useSelector((state: RootState) => state.requestConfig)
  const projectConfiguration = getProject(projectName);
  const securityArr = projectConfiguration.config.security as SecurityType[];
  const securityWithValues = projectConfiguration.config.securityWithValues as Record<string, string>[]
  let { authd } = useSelector(
    (state: RootState) =>
      state.requestConfig.endpoints[state.requestConfig.selectedEndpoint]
  );
  let { headers } = useSelector(
    (state: RootState) =>
      state.requestConfig.endpoints[state.requestConfig.selectedEndpoint]
  );
  const dispatch: AppDispatch = useDispatch();
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // const { value } = e.target;
    // dispatch(setAuthd({ authd: { use: !authd.use, position: !authd.use ? Number(value)+1 : Infinity  } }));

    // const sec = securityArr[Number(value)];
    // const newSec = {} as Record<string, string>;
    // for (const k in sec) {
    //   newSec[k] = "";
    // }
    // headers = { ...newSec, ...headers };
    // dispatch(setHeaders({ headers }));
  };

  const handleClick: React.MouseEventHandler<HTMLInputElement> = (e) =>{
    const {value} = e.currentTarget
    let [index, isChecked] = value.split('-') 
    const newSec = {} as Record<string, string>;
    const secWithValue = securityWithValues[Number(index)];

    const isCheckedBool = isChecked === "true" ? true : false
    if(!isCheckedBool) {
      dispatch(setAuthd({ authd: { use: true, position: Number(index)+1  } }));

      const sec = securityArr[Number(index)];
      for (const k in sec) {
        newSec[k] = secWithValue[k];
      }
      headers = { ...newSec, ...headers };
      dispatch(setHeaders({ headers }));
    } else {
      dispatch(setAuthd({ authd: { use: false, position: Infinity  } }));

      const sec = securityArr[Number(index)];
      for (const k in sec) {
        newSec[k] = secWithValue[k];
      }
      const newHeaders = {...headers} as Record<string, string>;
      for (const k in sec) {
        if(newSec[k] === newHeaders[k]){
          delete newHeaders[k]
        };
      }
      dispatch(setHeaders({ headers: newHeaders }));
    }
}

  return (
    <div className="ov">
      {securityArr.map((sec, index) => {
        return (
          <div className="m2 fr" key={index}>
            <div>
              <input
                checked={
                  authd?.use && authd?.position - 1 === index ? true : false
                }
                name="securitySelection"
                type="radio"
                onChange={handleChange}
                onClick={handleClick}
                value={`${index}-${authd?.use && authd?.position - 1 === index}`}
              />
            </div>
            <div>
              {Object.entries(sec).map(([k, _v], i) => {
                return <div key={i}>{k}</div>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AuthSelection;
