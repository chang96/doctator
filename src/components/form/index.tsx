import Tag from "../../elements/tags";
import OpenApi from "../../elements/openapi";
import Info from "../../elements/info";
import SecuritySchemes from "../../elements/securitySchemes";
import Servers from "../../elements/servers";
import { useState } from "react";

function Form() {
  const [state, setState] = useState({ index: 0 });
  const sections = [
    <OpenApi />,
    <Info />,
    <Servers />,
    <SecuritySchemes />,
    <Tag />,
  ];

  const nextSection = () => {
    if (state.index < sections.length - 1)
      setState({ ...state, index: state.index + 1 });
  };
  const prevSection = () => {
    if (state.index > 0) setState({ ...state, index: state.index - 1 });
  };
  return (
    <div style={{ width:"", height: "100%" }}>
      <div style={{ height: "90%", overflow: "auto" }}>
        {sections[state.index]}
      </div>
      <div style={{display: "flex", flexDirection:"row", justifyContent: "space-between"}}>
        <div onClick={() => prevSection()} style={{ cursor: "pointer" }}>
          prev
        </div>
        <div onClick={() => nextSection()} style={{ cursor: "pointer" }}>
          next
        </div>
      </div>
    </div>
  );
}

export default Form;
