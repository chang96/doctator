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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  setMethod,
  setNewEnpoint,
  setSelectedEndpoint,
  deleteEndpoint,
  setSelectedProjectName,
  setResponses,
} from "../../slices/request";
import { extractParams, extractQueries } from "../../utils/helpers";
import { getProject } from "../../utils/localstorageFuncs";
import { makeRequest } from "../../utils/makeRequest";
function reWriteHeader(h: Record<string, string>): Record<string, string> {
  const res = {} as Record<string, string>;
  for (let key in h) {
    res[String(key)] = h[key];
  }
  return res;
}

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
  const {
    baseUrl: selectedUrl,
    method,
    path,
    requestParams: params,
    requestQueries: queries,
    headers,
    requestBody: body,
    description,
    summary,
    name,
    operationId,
    tags,
    authd,
    responses,
  } = useSelector(
    (state: RootState) =>
      state.requestConfig.endpoints[state.requestConfig.selectedEndpoint]
  );

  const endpointsArr = useSelector(
    (state: RootState) => state.requestConfig.endpoints
  );
  const selectedProjectName = useSelector(
    (state: RootState) => state.requestConfig.selectedProjectName
  );

  const endpoints = endpointsArr.map((x: any) =>
    `${x.method} ${x.path}`.toLowerCase()
  );

  const [state, setState] = useState<{
    active: PathElementsKey;
    baseUrl: string;
    selectedResponseIndex: number;
  }>({ active: "url", baseUrl: "", selectedResponseIndex: 0 });

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
  const handleResponseCodeSelection = (index: number) => {
    setState({ ...state, selectedResponseIndex: Number(index) });
  };
  const handleResponseDescription: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    const { value } = e.target;
    const responseCopy = JSON.parse(JSON.stringify(responses));
    responseCopy[state.selectedResponseIndex].description = value;
    dispatch(setResponses({ responses: responseCopy }));
  };
  const sendRequest = async () => {
    const project = getProject(selectedProjectName);
    const m = method;
    const u =
      selectedUrl + path + extractParams(params) + extractQueries(queries);
    const s = authd.use
      ? project.config.securityWithValues[authd.position-1]
      : {};
      console.log({s})
    const h = { ...s, ...headers };
    let b = body ? JSON.stringify(body) : null;
    if (m.toUpperCase() === "GET" || m.toUpperCase() === "DELETE") {
      b = null;
    }

    console.log(
      method,
      selectedUrl + path + extractParams(params) + extractQueries(queries),
      reWriteHeader(h),
      body,
      { name, summary, operationId, description },
      tags,
      authd
    );
    const r = await makeRequest({
      baseUrl: u,
      method: m,
      payload: b,
      headers: reWriteHeader(h),
    });
    console.log(r);
    let { status, data, statusText } = r;

    const responseCopy = JSON.parse(JSON.stringify(responses));
    console.log(responseCopy, status, data, statusText);
    const codeFound = responseCopy
      .map((x: any) => String(x.code))
      .includes(String(status));
    if (codeFound) {
      responseCopy.forEach((response: any) => {
        if (response.code === String(status)) {
          console.log("a");
          response.res = data;
        }
      });
      dispatch(setResponses({ responses: responseCopy }));
    }

    if (status && !codeFound) {
      responseCopy.push({
        code: String(status),
        res: data,
        description: "",
      });
      dispatch(setResponses({ responses: responseCopy }));
    }
  };

  const handleEndpointSelection: React.MouseEventHandler<HTMLDivElement> = (
    e
  ) => {
    setState({ ...state, selectedResponseIndex: 0 });
    const { id } = e.currentTarget;
    dispatch(setSelectedEndpoint({ index: Number(id) }));
  };

  const addNewEndpoint = () => {
    const newEndpoint: RequestConfiguration = {
      baseUrl: selectedUrl,
      headers: {},
      requestQueries: [],
      requestParams: [],
      authd: {} as Authd,
      method: "get",
      path: "",
      requestBody: {},
      description: "",
      tags: [],
      summary: "",
      operationId: "",
      name: "",
      responses: [],
    };

    dispatch(setNewEnpoint({ endpoint: newEndpoint }));
  };

  const removeEndpoint = (index: number) => {
    dispatch(deleteEndpoint({ index }));
  };

  useEffect(() => {
    dispatch(setSelectedProjectName({ projectName: selectedProjectName }));
  }, [dispatch, selectedProjectName]);
  return (
    <div>
      <div className="fr2 ov">
        <div className="flex15">
          <select value={method} onChange={handleMethodChange}>
            <option value={"get"}>GET</option>
            <option value={"post"}>POST</option>
            <option value={"put"}>PUT</option>
            <option value={"patch"}>PATCH</option>
            <option value={"delete"}>DELETE</option>
          </select>
        </div>
        <div className="flex70">
          <input
            value={
              selectedUrl +
              path +
              extractParams(params) +
              extractQueries(queries)
            }
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

      <div className="elementContainer ov">
        <div className="fr">
          {responses.map((response, index) => {
            return (
              <div
                onClick={() => handleResponseCodeSelection(index)}
                className="ml pointa"
                key={index}
              >
                {response.code}
              </div>
            );
          })}
        </div>
        <div>
          <input
            onChange={handleResponseDescription}
            value={responses[state.selectedResponseIndex]?.description || ""}
            placeholder="description"
          />
        </div>
        <textarea
          className="responseTextArea txtarea"
          readOnly
          value={JSON.stringify(
            responses[state.selectedResponseIndex]?.res || {},
            null,
            "  "
          )}
        ></textarea>
      </div>

      <div className="frpath mt">
        <div className="ov fr1">
          {endpoints.map((endpoint: any, i: number) => (
            <div key={i} className="frpath">
              <button
                onClick={() => removeEndpoint(i)}
                className="remove-button"
              >
                X
              </button>
              <div
                className="pointa"
                key={i}
                id={`${i}`}
                onClick={handleEndpointSelection}
              >
                {endpoint}
              </div>
            </div>
          ))}
        </div>
        <div onClick={addNewEndpoint} className="pointa add-button">
          +
        </div>
      </div>
    </div>
  );
}

export default Paths;
