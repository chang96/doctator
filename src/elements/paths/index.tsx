import { AppDispatch, RootState } from "../../store/store"
import { useDispatch, useSelector} from "react-redux"
import { setPaths } from "../../slices/request"
import { useState } from "react"
type Path = {
    path: string;
}
function PathText (){
    const {
        path,
      } = useSelector((state: RootState) => state.requestConfig.endpoints[state.requestConfig.selectedEndpoint]);
    const [state, setState] = useState<Path>({path: path || ""})
    const dispatch: AppDispatch = useDispatch()

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const {value} = e.target
        setState({...state, path: value})
        dispatch(setPaths({path: value}))
    }
    // useEffect(()=> {
    //     setState({...state, path: state.path})
    // }, [state])
    return <div>
        <input value={path} onChange={handleChange} type="text" />
    </div>
}

export default PathText