import "../elements.css"

import { getProject } from "../../utils/localstorageFuncs"
import { setTag } from "../../slices/request";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";

function TagsSelection () {
    const {selectedProjectName: projectName} = useSelector((state: RootState) => state.requestConfig)

    const projectConfiguration = getProject(projectName)
    const tagsArr = projectConfiguration.config.tags as Tag[]

    const {
        tags
      } = useSelector((state: RootState) => state.requestConfig.endpoints[state.requestConfig.selectedEndpoint]);
      const selectedTag = tags[0]
    const dispatch: AppDispatch = useDispatch()
 
    const handleClick: React.MouseEventHandler<HTMLInputElement> = (e) =>{
        const {value} = e.currentTarget
        let [index, isChecked] = value.split('-') 
        const isCheckedBool = isChecked === "true" ? true : false
        if(!isCheckedBool){
            const t = tagsArr[Number(index)].name
            dispatch(setTag({tags: [t]}))
        } else {
            dispatch(setTag({tags: []}))
        }
    }
    return <div>
        {tagsArr.map((tag, index) => {
            return <div className="m2 fr" key={index}>
                <div>
                    <input onClick={handleClick} onChange={()=>''} checked={tag.name === selectedTag} name="tagSelection" type="radio" value={`${index}-${tag.name === selectedTag}`} />
                </div>
                 <div key={index}>{tag.name} ({tag.description})</div>
            </div>
        })}
    </div>
}

export default TagsSelection