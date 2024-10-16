import { useState } from "react"
import "../elements.css"
import { setParams } from "../../slices/request"
import { AppDispatch } from "../../store/store"
import { useDispatch } from "react-redux"
type Params = {fieldName: string, value: string}
type K = keyof Params
function Params (){
    const [state, setState] = useState<{params: Params[]}>({params: []})
    const dispatch: AppDispatch = useDispatch()
    const addParam = () => {
        setState((state) => ({params: [...state.params, {fieldName: "", value: "" }]}));
    }
    const removeParams = (index: number) => {
        const newParams = [...state.params]
        newParams.splice(index, 1)
        setState({params: newParams})
        const p = "/" + [...newParams].map(x => x.value).join("/")
        dispatch(setParams({params: p}))
    }
    const handleChange : React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const {name, value} = e.target
        const [field, index] = name.split('-')
        state.params[Number(index)][field as K] = value
        setState((state) => ({params: [...state.params]}))
        if (field === "value" ) {
            const p = "/" + [...state.params].map(x => x.value).join("/")
            dispatch(setParams({params: p}))
        }
    }
    return <div className="c">
        <div className="fc">
        {state.params.map((params, index) => {
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

export default Params