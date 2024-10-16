import "../elements.css";
import { useState } from "react";
import { setQueries } from "../../slices/request";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
type Queries = { fieldName: string; value: string };
type K = keyof Queries;

function QueriesFunc() {
  const [state, setState] = useState<{ queries: Queries[] }>({ queries: [] });
  const dispatch: AppDispatch = useDispatch();
  const addQuery = () => {
    setState((state) => ({
      queries: [...state.queries, { fieldName: "", value: "" }],
    }));
  };
  const removeQuery = (index: number) => {
    const newQueries = [...state.queries];
    newQueries.splice(index, 1);
    setState({ queries: newQueries });
    const q =
      "?" + [...newQueries].map((x) => x.fieldName + "=" + x.value).join("&");
    dispatch(setQueries({ queries: q }));
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    const [field, index] = name.split("-");
    state.queries[Number(index)][field as K] = value;
    setState((state) => ({ queries: [...state.queries] }));
    const q =
      "?" +
      [...state.queries].map((x) => x.fieldName + "=" + x.value).join("&");
    dispatch(setQueries({ queries: q }));
  };

  return (
    <div className="c">
      <div className="fc">
        {state.queries.map((params, index) => {
          return (
            <div style={{ margin: "5px" }} key={index}>
              <button
                className="remove-button"
                style={{ cursor: "pointer" }}
                onClick={() => removeQuery(index)}
              >
                X
              </button>
              <div>
                <div>
                  <input
                    onChange={handleChange}
                    name={`fieldName-${index}`}
                    value={params.fieldName}
                    type="text"
                  />
                </div>
                <div>
                  <input
                    onChange={handleChange}
                    name={`value-${index}`}
                    value={params.value}
                    type="text"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="add-button"
        style={{ cursor: "pointer" }}
        onClick={() => addQuery()}
      >
        +
      </button>
    </div>
  );
}

export default QueriesFunc;
