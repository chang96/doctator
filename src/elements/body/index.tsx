import { useEffect, useState } from "react"
import { setBody } from "../../slices/request"
import { useDispatch, useSelector } from "react-redux"
import "../elements.css"
import { AppDispatch, RootState } from "../../store/store"
function Body (){ 
    const {
        requestBody: body
      } = useSelector((state: RootState) => state.requestConfig.endpoints[state.requestConfig.selectedEndpoint]);
    const stringifiedBody = JSON.stringify(body, null, "   ")
    const [state, setState] = useState<{jsonValue: string}>({jsonValue: stringifiedBody})
    const dispatch: AppDispatch = useDispatch()
    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        const {value} = (e.target)

        try {
            const parsed = JSON.parse(value)

            const stringified = JSON.stringify(parsed, null, "   ")
            setState({...state, jsonValue: stringified})
            dispatch(setBody({body: parsed}))
        } catch (error) {
            setState({jsonValue: value})
            dispatch(setBody({body: value}))

        }

    }

    useEffect(()=> {
        setState({jsonValue: stringifiedBody})
    }, [stringifiedBody])
    return <div className="fh fw">
        <textarea value={state.jsonValue} onChange={handleChange} className="fw fh" name="body">

        </textarea>
    </div>
}

export default Body