import "../elements.css"
import { useState } from "react";
import { setHeaders } from "../../slices/request";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
type Headers = { fieldName: string; value: string };
const makeReadableHeaders = (header?: Record<string, string>) => {
    const result = [] as Headers[];
    if(!header) return result
    for (const key in header) {
      result.push({fieldName: key, value: header[key]})
    }
    return result
}

type K = keyof Headers;
function HeadersFunc (){
  const {
    headers,
  } = useSelector((state: RootState) => state.requestConfig.endpoints[state.requestConfig.selectedEndpoint]);
  const readableHeader = makeReadableHeaders(headers)
    const [state, setState] = useState<{ headers: Headers[] }>({ headers: readableHeader });
    const dispatch: AppDispatch = useDispatch();
    const addHeaders = () => {
        setState((state) => ({
            headers: [...state.headers, { fieldName: "", value: "" }],
        }))

        const h = [...state.headers, { fieldName: "", value: "" }].reduce((acc, curr) => {
          acc[curr.fieldName] = curr.value
          return acc
      }, {} as Record<string, string>)

      dispatch(setHeaders({ headers: h }))
    }
    const removeHeaders = (index: number) => {
        const newHeaders = [...state.headers]
        newHeaders.splice(index, 1)
        setState({headers: newHeaders})
        const h = [...newHeaders].reduce((acc, curr) => {
            acc[curr.fieldName] = curr.value
            return acc
        }, {} as Record<string, string>)

        dispatch(setHeaders({ headers: h }))
    }
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const {name, value} = e.target
        const [field, index] = name.split('-')
        state.headers[Number(index)][field as K] = value
        setState((state) => ({headers: [...state.headers]}))
        // if(field === "value"){
            const h = [...state.headers].reduce((acc, curr) => {
                acc[curr.fieldName] = curr.value
                return acc
            }, {} as Record<string, string>)
    
            dispatch(setHeaders({ headers: h }))
        // }
    }
    return <div className="c">
    <div className="fc">
    {readableHeader.map((header, index) => {
    return <div style={{margin: "5px"}} key ={index}>
          <button
            className="remove-button"
            style={{ cursor: "pointer" }}
            onClick={() => removeHeaders(index)}
          >
            X
          </button>
          <div>
            <div><input onChange={handleChange} name={`fieldName-${index}`} value={header.fieldName} type="text" /></div>
            <div><input onChange={handleChange} name={`value-${index}`} value={header.value} type="text" /></div>
          </div>
    </div>
   })}
    </div>
    <button
    className="add-button"
    style={{ cursor: "pointer" }}
    onClick={() => addHeaders()}
  >
    +
  </button>
</div>
}

export default HeadersFunc