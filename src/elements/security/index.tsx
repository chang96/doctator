import { useState } from "react";
import "../elements.css";
import {
  getProject,
  setProjectByProjectName,
} from "../../utils/localstorageFuncs";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
type SecurityType = Record<string, boolean | Array<any>>;
function Security() {
  const {selectedProjectName: projectName} = useSelector((state: RootState) => state.requestConfig)
  const projectConfiguration = getProject(projectName);
  const securityArr = projectConfiguration.config.security as SecurityType[];
  const securityComponents = projectConfiguration.config.components
    .securitySchemes as Record<string, any>;
  const securityArrKeys = Object.keys(securityComponents);
  const secTypes = {} as SecurityType;
  const reducedSecArr = securityArrKeys.reduce((acc, curr) => {
    acc[curr] = false;
    return acc;
  }, secTypes);

  const transformedSecurityArr = securityArr.map((sec) => {
    return { ...reducedSecArr, ...sec };
  });

  let secWithValArr = securityArr.map((sec, i) => {
    return projectConfiguration.config.securityWithValues ? projectConfiguration.config.securityWithValues[i] : sec
  })

  secWithValArr = secWithValArr.map((x: any) => {
    for (const k in x) {
      if (typeof x[k] !== 'string') {
        x[k] = ""
      }
    }
    return x;
  })

  const [state, setState] = useState<{ security: SecurityType[], secWithValArr: Record<string, any>[] }>({
    security: [...transformedSecurityArr],
    secWithValArr: secWithValArr
  });
  const addSecurity = () => {
    const newSecurity: SecurityType = reducedSecArr;
    setState({ ...state, security: [...state.security, newSecurity] });
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name } = e.target;
    const [field, , index] = name.split("**");

    if (!state.security[Number(index)][field]) {
      state.security[Number(index)][field] = [];
    } else if (state.security[Number(index)][field]) {
      state.security[Number(index)][field] = false;
    }
    setState({ ...state, security: [...state.security] });
    const stateCopy = JSON.parse(
      JSON.stringify(state.security)
    ) as SecurityType[];

    const delUnused = stateCopy.map((x) => {
      for (const k in x) {
        if (!x[k]) {
          delete x[k];
        }
      }

      return x;
    });
    projectConfiguration.config.security = delUnused;

    setProjectByProjectName(projectName, projectConfiguration);
  };

  const deleteSecurity = (index: number) => {
    const newSecurity = [...state.security];
    newSecurity.splice(index, 1);
    setState({ ...state, security: newSecurity });
    const stateCopy = JSON.parse(
      JSON.stringify(newSecurity)
    ) as SecurityType[];

    const delUnused = stateCopy.map((x) => {
      for (const k in x) {
        if (!x[k]) {
          delete x[k];
        }
      }

      return x;
    });
    projectConfiguration.config.security = delUnused;

    setProjectByProjectName(projectName, projectConfiguration);
  };

  const handleSetAuthenticationHeaderValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const {name, value} = e.target
    const [keyName, index] = name.split('**')
    const sec = projectConfiguration.config.security as SecurityType[]
    const secCopy = JSON.parse(JSON.stringify(sec))

    const secWithValArr = projectConfiguration.config.securityWithValues || secCopy
    if (!secWithValArr[Number(index)]) secWithValArr[Number(index)] ={}
    if (!secWithValArr[Number(index)][keyName]) secWithValArr[Number(index)][keyName] = ""
    secWithValArr[Number(index)][keyName] = value
    projectConfiguration.config.securityWithValues = secWithValArr
    setProjectByProjectName(projectName, projectConfiguration)
    setState({...state, secWithValArr: secWithValArr})
  }
  return (
    <div className="c">
      <div>
        <p>Security</p>
      </div>

      <div className="fc">
        {state.security.map((sec, index) => {
          const secArr = Object.entries(sec);
          return (
            <div style={{ margin: "5px" }} key={index}>
              <button
                className="remove-button"
                style={{ cursor: "pointer" }}
                onClick={() => deleteSecurity(index)}
              >
                X
              </button>
              {secArr.map(([k, v], j) => {
              

                return (
                  <div key={j} className="fr msmall">
                    <input
                      onChange={(e) => handleChange(e)}
                      defaultChecked={!!v}
                      type="checkbox"
                      name={`${k}**${j}**${index}`}
                    />
                    <div className="w100">{k}</div>
                    <input onChange={handleSetAuthenticationHeaderValue} value={state.secWithValArr[index] ? state.secWithValArr[index][k] : "" } name={`${k}**${index}`} type="text" placeholder="value" />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <button
        className="add-button"
        style={{ cursor: "pointer" }}
        onClick={() => addSecurity()}
      >
        +
      </button>
    </div>
  );
}

export default Security;
