import "./paths.css";

import AuthSelection from "../../elements/authSelection";
// import Description from "../../elements/description";
// import Body from "../../elements/body";
// import Headers from "../../elements/headers";
// import Params from "../../elements/params";
// import PathText from "../../elements/paths";
// import Queries from "../../elements/queries";
// import Url from "../../elements/url";
// import TagsSelection from "../../elements/tagsSelection";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  // setMethod,
  // setNewEnpoint,
  setSelectedEndpoint,
  // deleteEndpoint,
  setSelectedProjectName,
  setResponses,
} from "../../slices/request";
import {
  extractParams,
  extractQueries,
  formBodyV2,
  getDescription,
  getEnum,
  getRequired,
  returnTextColor,
  returnType,
} from "../../utils/helpers";
import { getProject } from "../../utils/localstorageFuncs";
import { makeProxyRequest, makeRequest } from "../../utils/makeRequest";
import ExpandableStructure from "../../elements/expandable/expandable";
import InfoTooltip from "../../elements/desc";
function reWriteHeader(h: Record<string, string>): Record<string, string> {
  const res = {} as Record<string, string>;
  for (let key in h) {
    res[String(key)] = h[key];
  }
  return res;
}

function getEndpointsByTagName(
  tagName: string,
  endpointArray: RequestConfiguration[]
) {
  if (tagName === "default"){
    return endpointArray.filter((endpoint) => {
      return endpoint.tags.length === 0 || !endpoint.tags;
    });
  }
  return endpointArray.filter((endpoint) => {
    return endpoint.tags.includes(tagName);
  });
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

// const pathElements = {
//   description: <Description />,
//   auth: <AuthSelection />,
//   url: <Url />,
//   path: <PathText />,
//   queries: <Queries />,
//   headers: <Headers />,
//   params: <Params />,
//   body: <Body />,
//   tags: <TagsSelection />,
// };

// const pathElementsArray = [
//   { name: "Url", id: "url" },
//   { name: "Path", id: "path" },
//   { name: "Params", id: "params" },
//   { name: "Queries", id: "queries" },
//   { name: "Headers", id: "headers" },
//   { name: "Auth", id: "auth" },
//   { name: "Body", id: "body" },
//   { name: "Description", id: "description" },
//   { name: "Tags", id: "tags" },
// ];

function Paths() {
  const {
    baseUrl: selectedUrl,
    method,
    path,
    requestParams: params,
    requestQueries: queries,
    headers,
    requestBodyDetails,
    description,
    summary,
    // name,
    // operationId,
    // tags,
    authd,
    responses,
  } = useSelector(
    (state: RootState) =>
      state.requestConfig.endpoints[state.requestConfig.selectedEndpoint]
  );
  const endpointsFullArr = useSelector(
    (state: RootState) => state.requestConfig.endpoints
  );
  const endpointsArr = endpointsFullArr.map((x, i) => {
    return {...x, mid: i}
  })
  const selectedProjectName = useSelector(
    (state: RootState) => state.requestConfig.selectedProjectName
  );
  const body = formBodyV2(requestBodyDetails)
  // const endpoints = endpointsArr.map((x: any) =>
  //   `${x.method} ${x.path}`.toLowerCase()
  // );

  const [state, setState] = useState<{
    active: PathElementsKey;
    baseUrl: string;
    selectedResponseIndex: number;
    responses: ResponseData[];
    selectedEndpoint: number;
    selectedTag: number;
  }>({
    active: "url",
    baseUrl: "",
    selectedResponseIndex: 0,
    responses,
    selectedEndpoint: 0,
    selectedTag: 0,
  });

  const dispatch: AppDispatch = useDispatch();

  // const handleActiveElement = (e: React.MouseEvent<HTMLDivElement>) => {
  //   setState({ ...state, active: e.currentTarget.id as PathElementsKey });
  // };
  // const handleMethodChange: React.ChangeEventHandler<HTMLSelectElement> = (
  //   e
  // ) => {
  //   const { value } = e.target;
  //   dispatch(setMethod({ method: value }));
  // };
  const handleResponseCodeSelection = (index: number) => {
    setState({ ...state, selectedResponseIndex: Number(index) });
  };
  // const handleResponseDescription: React.ChangeEventHandler<
  //   HTMLInputElement
  // > = (e) => {
  //   const { value } = e.target;
  //   const responseCopy = JSON.parse(JSON.stringify(responses));
  //   responseCopy[state.selectedResponseIndex].description = value;
  //   setState({ ...state, responses: responseCopy });
  //   dispatch(setResponses({ responses: responseCopy }));
  // };

  // const handleAddNewResponseManually = () => {
  //   setState({
  //     ...state,
  //     responses: [...responses, { code: 0, description: "", res: {} }],
  //     selectedResponseIndex: Number([...responses].length),
  //   });
  //   dispatch(
  //     setResponses({
  //       responses: [...responses, { code: 0, description: "", res: {} }],
  //     })
  //   );
  // };

  // const removeResponse = (index: number) => {
  //   const responseCopy = JSON.parse(JSON.stringify(responses));
  //   responseCopy.splice(index, 1);
  //   setState({ ...state, responses: responseCopy, selectedResponseIndex: 0 });
  //   dispatch(setResponses({ responses: responseCopy }));
  // };
  // const handleResponseCodeManually: React.ChangeEventHandler<
  //   HTMLInputElement
  // > = (e) => {
  //   const { name, value } = e.target;
  //   const responseCopy = JSON.parse(JSON.stringify(responses));
  //   const newResponse = responseCopy[Number(name)];
  //   newResponse.code = Number(value);

  //   responseCopy[Number(name)] = newResponse;

  //   setState({ ...state, responses: responseCopy });
  //   dispatch(setResponses({ responses: responseCopy }));
  // };
  // const manuallyAddRes: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
  //   const { value } = e.target;
  //   const responseCopy = JSON.parse(JSON.stringify(responses));
  //   try {
  //     const parsed = JSON.parse(value);
  //     responseCopy[state.selectedResponseIndex].res = parsed;
  //     dispatch(setResponses({ responses: responseCopy }));
  //   } catch (error) {
  //     responseCopy[state.selectedResponseIndex].res = value;
  //   }

  //   setState({ ...state, responses: responseCopy });
  // };
  const sendRequest = async () => {
    const project = getProject(selectedProjectName);
    const m = method;
    const u =
      selectedUrl + path + extractParams(params) + extractQueries(queries);
    const s = authd.use && project.config.securityWithValues && (project.config.securityWithValues as Array<Record<string, string>>).length > 0
      ? project.config.securityWithValues[authd.position - 1]
      : {};
    const h = { ...s, ...headers };
    let b = body ? JSON.stringify(body) : null;
    if (m.toUpperCase() === "GET" || m.toUpperCase() === "DELETE") {
      b = null;
    }

    if (b) b = JSON.parse(b);

    // console.log(
    //   method,
    //   selectedUrl + path + extractParams(params) + extractQueries(queries),
    //   reWriteHeader(h),
    //   body,
    //   { name, summary, operationId, description },
    //   tags,
    //   authd
    // );
    let r1;
    const rgxlcl = new RegExp(/^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/);
    const rewrittenHeaders = reWriteHeader(h)

    if (u.match(rgxlcl)) {
      r1 = await makeRequest({
        baseUrl: u,
        method: m.toUpperCase(),
        payload: b,
        headers: rewrittenHeaders,
      });
    } else {
      r1 = await makeProxyRequest({
        baseUrl: u,
        method: m.toUpperCase(),
        payload: b,
        headers: rewrittenHeaders,
      });
    }

    const codeRgx = new RegExp(/\d+/);
    const dataString = atob(r1.data.responseBody).trim();
    const status1 = (r1.data.responseBodyCode as string).match(codeRgx)?.[0];
    const status = Number(status1);
    let data: any;
    try {
      data = JSON.parse(dataString);
    } catch (e) {
      data = dataString;
    }
    const responseCopy = JSON.parse(JSON.stringify(responses));
    const codeFound = responseCopy
      .map((x: any) => String(x.code))
      .includes(String(status));
    if (codeFound) {
      responseCopy.forEach((response: any) => {
        if (response.code === String(status)) {
          response.res = data;
        }
      });
      dispatch(setResponses({ responses: responseCopy }));
      setState({ ...state, responses: responseCopy });
    }

    if (status && !codeFound) {
      responseCopy.push({
        code: String(status),
        res: data,
        description: "",
      });
      dispatch(setResponses({ responses: responseCopy }));
      setState({ ...state, responses: responseCopy });
    }
  };

  const handleEndpointSelection: React.MouseEventHandler<HTMLDivElement> = (
    e
  ) => {
    const { id } = e.currentTarget;
    const tag = e.currentTarget.dataset.tag;

    setState({
      ...state,
      selectedResponseIndex: 0,
      selectedEndpoint: Number(id),
      selectedTag: Number(tag),
    });

    dispatch(setSelectedEndpoint({ index: Number(id) }));
  };

  // const addNewEndpoint = () => {
  //   const newEndpoint: RequestConfiguration = {
  //     baseUrl: selectedUrl,
  //     headers: {},
  //     requestQueries: [],
  //     requestParams: [],
  //     authd: {} as Authd,
  //     method: "get",
  //     path: "",
  //     requestBody: {},
  //     description: "",
  //     tags: [],
  //     summary: "",
  //     operationId: "",
  //     name: "",
  //     responses: [{ res: {}, code: 0, description: "" }],
  //   };

  //   dispatch(setNewEnpoint({ endpoint: newEndpoint }));
  //   setState({
  //     ...state,
  //     responses: newEndpoint.responses,
  //     selectedEndpoint: endpointsArr.length,
  //     selectedResponseIndex: 0,
  //   });
  // };

  // const removeEndpoint = (index: number) => {
  //   dispatch(deleteEndpoint({ index }));
  //   setState({ ...state, selectedEndpoint: 0, selectedResponseIndex: 0 });
  // };

  useEffect(() => {
    dispatch(setSelectedProjectName({ projectName: selectedProjectName }));
  }, [dispatch, selectedProjectName]);

  const { config } = getProject(selectedProjectName);
  const tagsArr = [...config.tags, {name:"default", description:"untagged endpoints"}] as Tag[];
  const isOk = [...responses].sort((a,b) => a.code - b.code)[0] || {res: {}}
  const project = getProject(selectedProjectName);
  const s = authd.use && project.config.securityWithValues && (project.config.securityWithValues as Array<Record<string, string>>).length > 0
  ? project.config.securityWithValues[authd.position - 1]
  : {};
const h = { ...s, ...headers };
const rewrittenHeaders = reWriteHeader(h)
  return (
    <div style={{ height: "98%" }}>
      <div className="darkbackground" style={{ color:"whitesmoke", width:"98%", height: "10%", fontSize:"19px", fontWeight:"bold", borderBottom:"1px solid rgb(37, 36, 36)", borderRadius:"15px"}}>{project.config.info.title} ({project.config.info.version && <span>{project.config.info.version}</span>})</div>
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <div
          style={{ width: "20%", height: "88%" }}
          className="ovy darkbackground"
        >
          <div
            style={{
              display: "flex",
              marginLeft: "30%",
              flexDirection: "column",
              justifyContent: "space-around",
              maxHeight: "90%",
            }}
            className="ovy"
          >
            {tagsArr.map(({ name }, i) => {
              const sortedTags = getEndpointsByTagName(name, endpointsArr)
              return (
                <div key={i}>
                  <div className="mt tagname">-{name}</div>
                  <div>
                    {sortedTags.map(
                      (endpoint, j: number) => (
                        <div key={i + j} className="">
                          {/* <button
                onClick={() => removeEndpoint(i)}
                className="remove-button"
              >
                X
              </button> */}
                          <div
                            className="pointa"
                            key={i + j}
                            id={`${endpoint.mid}`}
                            data-tag={`${i}`}
                            onClick={handleEndpointSelection}
                            style={{marginBottom: "4%"}}
                          >
                            <span className="pathandmethod">
                              <span
                                style={{
                                  color: returnTextColor(endpoint.method),
                                  textTransform:"uppercase"
                                }}
                              >
                                {endpoint.method}
                              </span>{" "}
                              <span>{endpoint.path}</span>
                              {!(
                                endpoint.mid ===
                                  state.selectedEndpoint 
                              ) || "*"}
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {/* <div onClick={addNewEndpoint} className="pointa add-button">
          +
        </div> */}
        </div>

        <div
          style={{ width: "50%", height: "88%" }}
          className="ovy darkbackground"
        >
          <div className="summary mt">{summary}</div>
          <div className="desc">{description}</div>
          <div></div>
          <div className="pathandmethodandsend">
            <div style={{width:"15%", color: returnTextColor(method) }} className="method">
              {/* <select
            className="txt"
            value={method}
            style={{ height: "21px" }}
            onChange={handleMethodChange}
          >
            <option value={"get"}>GET</option>
            <option value={"post"}>POST</option>
            <option value={"put"}>PUT</option>
            <option value={"patch"}>PATCH</option>
            <option value={"delete"}>DELETE</option>
          </select> */}
              {method}
            </div>
            {/* <input
            value={
              // selectedUrl +
              path +
              extractParams(params) +
              extractQueries(queries)
            }
            readOnly
            className="fw"
          /> */}
            <div className="pathonly ovy">
              {path + extractParams(params) + extractQueries(queries)}
            </div>
            <div style={{width: "15%", display: "flex", flexDirection: "row", justifyContent:"space-around"}}>
              <button
                className="sendbtn"
                style={{ width: "70%", backgroundColor: returnTextColor(method, true) }}
                onClick={sendRequest}
              >
                send
              </button>
            </div>
          </div>
          <div style={{color:"white"}}></div>
          
          {authd.use && <hr></hr>}

          {authd.use && <div className="authorization">
            <div className="titles">Authorization</div>
            <div>
              <AuthSelection />
            </div>
          </div>}
          
          {body && <hr></hr>}
          {
            body && <div className="requestbody">
            <div className="titles">Body</div>
            <div>
              { Object.keys(body).map((k, j) => {
                let bodyType = returnType(body[k])
                const e = getEnum(requestBodyDetails, k)
                const req = getRequired(requestBodyDetails, k)
                const desc = getDescription(requestBodyDetails, k)
                if (bodyType === "string" && e.length > 0){
                  bodyType = "enum"
                }
                const enumOptions = e.length  > 0 ? `-${e.join(" ")}` : ""
                const objectOrArray = typeof body[k] === "object"
                return (
                  <div key={j} style={{display: "flex", flexDirection:"row"}}>
                    <div style={{textTransform: "none", width:"50%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <div style={{marginBottom:"3%"}}> {objectOrArray?<ExpandableStructure keyName={k} data={body[k]} /> : k } <span>{desc!==""&& <InfoTooltip description={desc}/>}</span> <span style={{color:"red"}}>{req&&"*"}</span> </div>
                    <div> <span style={{color: returnTextColor(bodyType)}}>{bodyType}</span></div>
                  </div>
                  <div style={{textTransform: "none"}}>
                    {(enumOptions)}
                  </div>
                  </div>
                )
              }) }
            </div>
            </div>
    
          }
          {queries && queries.length > 0 && <hr></hr>}
          {
            queries && queries.length > 0 && 
            <div style={{textTransform:"none"}} className="queries">
            <div className="titles">Query</div>
            <div>
              {queries.map((q, i) => {
                const enumOrstring = q?.staticFields?.length === 0 || !q.staticFields ? "string" : "enum"
                const enumm= q?.staticFields && q?.staticFields?.length > 0 ? q.staticFields.join(" ") : "" 
                return (
                  <div key={i}>
                    <span>{q.name}</span><span style={{color:"red"}}>{q.required && "*"}</span> | <span style={{color: returnTextColor(enumOrstring)}}>{enumOrstring}</span> {enumm !== "" && <span> | {enumm}</span> } 
                  </div>
                )
              })}
            </div>
            </div>
    
          }

          {params && params.length > 0 && <hr></hr>}
          {
            params && params.length > 0 && <div className="params">
            <div className="titles">Param</div>
            <div>
              {params.map((p, i) => {
                const [name, ] = p.split(".")
                const enumOrstring = "string"
                return (
                  <div key={i}>
                    <span>{name}</span> | <span style={{color: returnTextColor(enumOrstring)}}>{enumOrstring}</span>
                  </div>
                )
              })}
            </div>
            </div>
    
          }

          {responses && responses.length > 0 && <hr></hr>}
          {
            responses && responses.length > 0 && <div className="responses">
            <div className="titles">Response</div>
            <div>
            { Object.keys(isOk["res"]).map((k, i) => {
                const bodyType = returnType(isOk["res"][k])
                const rgx = new RegExp(/\.|:/g)
                const enumOptions = bodyType === "enum" ? `-${isOk["res"][k].replace(rgx, " ")}` : ""
                const objectOrArray = typeof isOk["res"][k] === "object"
                return (
                  <div key={i} style={{display: "flex", flexDirection:"row"}}>
                    <div style={{textTransform: "none", width:"50%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <div style={{marginBottom:"3%"}}> {objectOrArray?<ExpandableStructure keyName={k} data={isOk["res"][k]} /> : k } </div>
                    <div> <span style={{color: returnTextColor(bodyType)}}>{bodyType}</span></div>
                  </div>
                  <div style={{textTransform: "none"}}>
                    {(enumOptions)}
                  </div>
                  </div>
                )
              }) }
            </div>
            </div>
    
          }

        </div>
        <div style={{ width: "28%", height: "88%" }} className="ovy darkbackground reqrescontainer">
          <div className="mt makerequestcommands">
            <div><span style={{color:"violet"}}>curl</span> <span>--request</span> <span style={{textTransform:"uppercase", color: returnTextColor(method.toLowerCase())}}>{method}</span> \</div> 
            <div style={{textWrap:"nowrap"}}>--url <span style={{color:"#cc8f77"}}>{(selectedUrl+path+extractParams(params)+extractQueries(queries))}</span> \ </div>
            
            {Object.entries(rewrittenHeaders).map(([k, v]: Array<string>, i) => {
              return <div key={i} style={{color:"whitesmoke"}}> --header <span style={{color:"#cc8f77"}}>'{k}: {v}'</span> \</div>
            })}
            {/* {body && <div style={{width:"120%",display:"flex", flexDirection: "row", justifyContent:"space-between"}} ><div style={{}}>--data </div> <div><pre style={{backgroundColor:"",marginLeft:"-1%", marginTop:"-0.01%"}}><code>{JSON.stringify(body, null, " ")}</code></pre></div></div>} */}
            {body && <div style={{display: "flex", width: "120%"}}><span style={{}}>--data  </span> <pre style={{marginTop:"-0.1%", marginLeft:"1%", color:"#cc8f77", textTransform:"none"}}><code>{JSON.stringify(body, null, " ")}</code></pre></div> }

          </div>

          <div className="respreview">

        <div className="fr">
          {responses.map((response, index) => {
            const selectedRes = state.selectedResponseIndex === index
            return (
              <div key={index} className="fr ml">
                {/* <button
                  onClick={() => removeResponse(index)}
                  className="remove-button"
                >
                  X
                </button> */}
                <div
                  onClick={() => handleResponseCodeSelection(index)}
                  className="pointa"
                  key={index}
                  style={{padding: "3%", borderRadius:"4px",  marginTop:"2px", color: selectedRes? "rgb(6, 247, 118)" : "rgb(6, 247, 118)", backgroundColor: selectedProjectName ? "": ""}}
                >
                  {/* <input
                    onChange={handleResponseCodeManually}
                    name={`${index}`}
                    style={{ width: "25px" }}
                    value={response.code}
                  /> */}
                  {response.code}
                  
                </div>
              </div>
            );
          })}
          {/* <div
            onClick={() => handleAddNewResponseManually()}
            className="pointa add-button"
          >
            +
          </div> */}
        </div>
        <div>
          {/* <input
            onChange={handleResponseDescription}
            value={
              responses[state.selectedResponseIndex]?.description || ""
            }
            placeholder="description"
          /> */}
        </div>
        {/* <textarea
          className="responseTextArea txtarea"
          onChange={manuallyAddRes}
          value={
            typeof responses[state.selectedResponseIndex]?.res ===
            "object"
              ? JSON.stringify(
                  responses[state.selectedResponseIndex]?.res,
                  null,
                  " "
                )
              : responses[state.selectedResponseIndex]?.res
          }
        ></textarea> */}
        <hr></hr>
        <pre><code style={{textTransform:"none"}}>{typeof responses[state.selectedResponseIndex]?.res ===
            "object"
              ? JSON.stringify(
                  responses[state.selectedResponseIndex]?.res,
                  null,
                  " "
                )
              : responses[state.selectedResponseIndex]?.res}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paths;
