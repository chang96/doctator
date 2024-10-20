import "../elements.css";
import { useState } from "react";
import { setQueries } from "../../slices/request";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";

function QueriesFunc() {
  const {
    requestQueries,
  } = useSelector((state: RootState) => state.requestConfig.endpoints[state.requestConfig.selectedEndpoint]);

  const [state, setState] = useState<{ queries: Queries[] }>({ queries: requestQueries || [] });
  const dispatch: AppDispatch = useDispatch();
  const addQuery = () => {
    setState((state) => ({
      queries: [...state.queries, { name: "", value: "", staticField: []}],
    }));
    dispatch(setQueries({ queries: [...state.queries, { name: "", value: "", staticField: []}] }));
  };
  const removeQuery = (index: number) => {
    const newQueries = [...state.queries];
    newQueries.splice(index, 1);
    setState({ queries: newQueries });

    dispatch(setQueries({ queries: [...newQueries] }));
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    const [field, index] = name.split("-");
    state.queries[Number(index)][field as K] = value;
    setState((state) => ({ queries: [...state.queries] }));
    
    dispatch(setQueries({ queries: [...state.queries] }));
  };

  return (
    <div className="c">
      <div className="fc">
        {(requestQueries || []).map((params, index) => {
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
                    name={`name-${index}`}
                    value={params.name}
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
