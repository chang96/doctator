import "./paths.css";

import AuthSelection from "../../elements/authSelection";
import Description from "../../elements/description";
import Body from "../../elements/body";
import Headers from "../../elements/headers";
import Params from "../../elements/params";
import PathText from "../../elements/paths";
import Queries from "../../elements/queries";
import Url from "../../elements/url";
import TagsSelection from "../../elements/tagsSelection";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setMethod } from "../../slices/request";
import { getProject } from "../../utils/localstorageFuncs";

type PathElements = {
  description: JSX.Element;
  auth: JSX.Element;
  url: JSX.Element;
  path: JSX.Element;
  queries: JSX.Element;
  headers: JSX.Element;
  params: JSX.Element;
  body: JSX.Element;
  tags: JSX.Element;
};

type PathElementsKey = keyof PathElements;

const pathElements = {
  description: <Description />,
  auth: <AuthSelection />,
  url: <Url />,
  path: <PathText />,
  queries: <Queries />,
  headers: <Headers />,
  params: <Params />,
  body: <Body />,
  tags: <TagsSelection />,
};


function Paths() {
  const projectName = 'defaultProject'
  const projectConfiguration = getProject(projectName)
  const endpoints = projectConfiguration.paths.endpoints.map((x: any) => `${x.method} ${x.path}`)
  
  const {
    baseUrl: selectedUrl,
    method,
    paths,
    params,
    queries,
    headers,
    body,
    description,
    summary,
    name,
    operationId,
    tags,
  } = useSelector((state: RootState) => state.requestConfig);

  const [state, setState] = useState<{
    active: PathElementsKey;
    baseUrl: string;
  }>({ active: "url", baseUrl: "" });

  const dispatch: AppDispatch = useDispatch();

  const handleActiveElement = (e: React.MouseEvent<HTMLDivElement>) => {
    setState({ ...state, active: e.currentTarget.id as PathElementsKey });
  };
  const handleMethodChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    const { value } = e.target;
    dispatch(setMethod({ method: value }));
  };
  const sendRequest = () => {
    console.log(
      method,
      selectedUrl + paths + params + queries,
      headers,
      body,
      { name, summary, operationId, description },
      tags
    );
  };
  return (
    <div>
      <div className="fr2 ov">
        <div className="flex15">
          <select onChange={handleMethodChange}>
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>PATCH</option>
            <option>DELETE</option>
          </select>
        </div>
        <div className="flex70">
          <input
            value={selectedUrl + paths + params + queries}
            readOnly
            className="fw"
          />
        </div>
        <div className="flex15">
          <button onClick={sendRequest} className="fw">
            send
          </button>
        </div>
      </div>

      <div className="fr1 ov">
        <div onClick={handleActiveElement} className="pointa" id="url">
          Url
        </div>
        <div onClick={handleActiveElement} className="pointa" id="path">
          Path
        </div>
        <div onClick={handleActiveElement} className="pointa" id="params">
          Params
        </div>
        <div onClick={handleActiveElement} className="pointa" id="queries">
          Queries
        </div>
        <div onClick={handleActiveElement} className="pointa" id="headers">
          Headers
        </div>
        <div onClick={handleActiveElement} className="pointa" id="auth">
          Auth
        </div>
        <div onClick={handleActiveElement} className="pointa" id="body">
          Body
        </div>
        <div onClick={handleActiveElement} className="pointa" id="description">
          Description
        </div>
        <div onClick={handleActiveElement} className="pointa" id="tags">
          Tags
        </div>
      </div>

      <div className="elementContainer ov">{pathElements[state.active]}</div>

      <div className="elementContainer ov"></div>
      <div className="ov fr1 mt">
            {endpoints.map((endpoint: any) => <div>{endpoint}</div>)}
      </div>
    </div>
  );
}

export default Paths;
