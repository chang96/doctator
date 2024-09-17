import React, { useState } from "react";
import "../elements.css";
type Sec = { schemeName: string; type: string; in: string; name: string };
type F = keyof Sec;
function SecuritySchemes() {
  const [state, setState] = useState<{ securityScheme: Sec[] }>({
    securityScheme: [],
  });
  const addSecurityScheme = () => {
    const newSec = { schemeName: "", type: "", in: "", name: "" };
    setState({ securityScheme: [...state.securityScheme, newSec] });
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    const [field, index] = name.split("-");
    state.securityScheme[Number(index)][field as F] = value;
    setState({ securityScheme: [...state.securityScheme] });
  };
  const deleteSecurityScheme = (index: number) => {
    const newSec = [...state.securityScheme];
    console.log(newSec);
    newSec.splice(index, 1);
    console.log(newSec); // Check if the deletion is working properly. If it's not, add a console.log statement here.
    setState({ securityScheme: newSec });
  };

  return (
    <div className="c">
      <div>
        <p>Security Scheme:</p>
      </div>

      <div>
        {state.securityScheme.map((sec, index) => {
          return (
            <div style={{ margin: "5px" }} key={index}>
              <button
                className="remove-button"
                onClick={() => deleteSecurityScheme(index)}
              >
                X
              </button>
              <div>
                <div>scheme name:</div>
                <input
                  name={`schemeName-${index}`}
                  value={sec.schemeName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div>type:</div>
                <input
                  name={`type-${index}`}
                  value={sec.type}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div>in:</div>
                <input name={`in-${index}`} value={"header"} readOnly />
              </div>
              <div>
                <div>name:</div>
                <input
                  name={`name-${index}`}
                  value={sec.name}
                  onChange={handleChange}
                />
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="add-button"
        style={{ cursor: "pointer" }}
        onClick={() => addSecurityScheme()}
      >
        +
      </button>
    </div>
  );
}

export default SecuritySchemes;
