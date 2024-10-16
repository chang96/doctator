import { useState } from "react"
import { setBody } from "../../slices/request"
import { useDispatch } from "react-redux"
import "../elements.css"
import { AppDispatch } from "../../store/store"
function Body (){ 
    const [state, setState] = useState<{jsonValue: string}>({jsonValue: ""})
    const dispatch: AppDispatch = useDispatch()
    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        const {value} = (e.target)

        try {
            const parsed = JSON.parse(value)

            const stringified = JSON.stringify(parsed, null, "   ")
            setState({jsonValue: stringified})
            dispatch(setBody({body: parsed}))
        } catch (error) {
            setState({jsonValue: value})
        }

    }
    return <div className="fh fw">
        <textarea value={state.jsonValue} onChange={handleChange} className="fw fh" name="body">

        </textarea>
    </div>
}

export default Body