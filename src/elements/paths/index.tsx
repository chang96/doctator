import { AppDispatch } from "../../store/store"
import { useDispatch} from "react-redux"
import { setPaths } from "../../slices/request"
function PathText (){
    const dispatch: AppDispatch = useDispatch()

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const {value} = e.target
        dispatch(setPaths({paths: value}))
    }
    return <div>
        <input onChange={handleChange} type="text" />
    </div>
}

export default PathText