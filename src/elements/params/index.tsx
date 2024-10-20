import { useState } from "react"
import "../elements.css"
import { setParams } from "../../slices/request"
import { AppDispatch, RootState } from "../../store/store"
import { useDispatch, useSelector } from "react-redux"

type Params = {fieldName: string, value: string}
type K = keyof Params
const makeReadableParams = (p?: string[]): Params[] => {
  if (!p) return []
  return p.map(x => {
    const [field, value] = x.split(".")
    return {fieldName: field, value: value}
  })
}
function ParamsFunc (){
  const {
    requestParams,
  } = useSelector((state: RootState) => state.requestConfig.endpoints[state.requestConfig.selectedEndpoint]);
  const readableParams = makeReadableParams(requestParams)
    const [state, setState] = useState<{params: Params[]}>({params:  readableParams})
    const dispatch: AppDispatch = useDispatch()
    const addParam = () => {
        setState((state) => ({params: [...state.params, {fieldName: "", value: "" }]}));
        const formedParams = [...state.params, {fieldName: "", value: "" }].map(x => x.fieldName+'.'+x.value)
        dispatch(setParams({params: formedParams}))
    }
    const removeParams = (index: number) => {
        const newParams = [...state.params]
        newParams.splice(index, 1)
        setState({params: newParams})
        const formedParams = [...newParams].map(x => x.fieldName+'.'+x.value)
        dispatch(setParams({params: formedParams}))
    }
    const handleChange : React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const {name, value} = e.target
        const [field, index] = name.split('-')
        state.params[Number(index)][field as K] = value
        setState((state) => ({params: [...state.params]}))
        // if (field === "value" ) {
            const formedParams = [...state.params].map(x => x.fieldName+'.'+x.value)
            dispatch(setParams({params: formedParams}))
        // }
    }
    return <div className="c">
        <div className="fc">
        {readableParams.map((params, index) => {
        return <div style={{margin: "5px"}} key ={index}>
              <button
                className="remove-button"
                style={{ cursor: "pointer" }}
                onClick={() => removeParams(index)}
              >
                X
              </button>
              <div>
                <div><input onChange={handleChange} name={`fieldName-${index}`} value={params.fieldName} type="text" /></div>
                <div><input onChange={handleChange} name={`value-${index}`} value={params.value} type="text" /></div>
              </div>
        </div>
       })}
        </div>
        <button
        className="add-button"
        style={{ cursor: "pointer" }}
        onClick={() => addParam()}
      >
        +
      </button>
    </div>
}

export default ParamsFunc