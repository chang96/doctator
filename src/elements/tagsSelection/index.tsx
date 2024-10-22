import "../elements.css"

import { getProject } from "../../utils/localstorageFuncs"
import { setTag } from "../../slices/request";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
type Tag = { name: string; description: string };

function TagsSelection () {
    const {selectedProjectName: projectName} = useSelector((state: RootState) => state.requestConfig)

    const projectConfiguration = getProject(projectName)
    const tagsArr = projectConfiguration.config.tags as Tag[]

    const {
        tags
      } = useSelector((state: RootState) => state.requestConfig.endpoints[state.requestConfig.selectedEndpoint]);
      const selectedTag = tags[0]
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
                    <input checked={tag.name === selectedTag ? true : false} onChange={handleChange} name="tagSelection" type="radio" value={index} />
                </div>
                 <div key={index}>{tag.name} ({tag.description})</div>
            </div>
        })}
    </div>
}

export default TagsSelection