import "../elements.css"

import { getProject } from "../../utils/localstorageFuncs"
import { setTag } from "../../slices/request";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
type Tag = { name: string; description: string };

function TagsSelection () {
    const projectName = 'defaultProject'
    const projectConfiguration = getProject(projectName)
    const tagsArr = projectConfiguration.config.tags as Tag[]
    const dispatch: AppDispatch = useDispatch()
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const {value} = e.target
        const t = tagsArr[Number(value)].name
        dispatch(setTag({tags: [t]}))
    }
    return <div>
        {tagsArr.map((tag, index) => {
            return <div className="m2 fr" key={index}>
                <div>
                    <input onChange={handleChange} name="tagSelection" type="radio" value={index} />
                </div>
                 <div key={index}>{tag.name} ({tag.description})</div>
            </div>
        })}
    </div>
}

export default TagsSelection