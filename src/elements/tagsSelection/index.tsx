import { getProject } from "../../utils/localstorageFuncs"
type Tag = { name: string; description: string };

function TagsSelection () {
    const projectName = 'defaultProject'
    const projectConfiguration = getProject(projectName)
    const tagsArr = projectConfiguration.config.tags as Tag[]
    return <div>
        {tagsArr.map((tag, index) => {
            return <div key={index}>{tag.name} ({tag.description})</div>
        })}
    </div>
}

export default TagsSelection