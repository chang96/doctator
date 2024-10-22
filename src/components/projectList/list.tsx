import { useDispatch, useSelector } from "react-redux"
import styles from './styles.module.css'
import { RootState } from "../../store/store"
import { Dispatch } from "redux"
import { useState } from "react"
import { addProjectList, removeProjectFromList, setSelectedProjectName } from "../../slices/request"

export default function ProjectList(){
    const [state, setState] = useState({newProject: ""})
    const {projectList} = useSelector((state: RootState) => state.requestConfig)
    const dispatch: Dispatch = useDispatch()
    const handleNewProjectName: React.ChangeEventHandler<HTMLInputElement> = (e) =>{
        const {value} = e.target
        setState({...state, newProject: value})
    }
    const handleAddProject = () =>{
        dispatch(addProjectList({newProject: state.newProject}))
        setState({...state, newProject:""})
    }

    const handleRemoveProject = (index: number) => {
        dispatch(removeProjectFromList({index}))
    }

    const handleSelectProject = (projectName: string) => {
        dispatch(setSelectedProjectName({projectName}))
    }
    return <div className={styles.f}>
        <div><input value={state.newProject} onChange={handleNewProjectName} name="newProject" placeholder="new project" /></div>
        <button onClick={handleAddProject}>Add</button>
        
        {projectList.map((project, index) => (
            <div key={index} className="mt fr">
                <div onClick={()=> handleSelectProject(project)} className="pointa" key={project}>{project}</div>
                {index !== 0 ? <button onClick={()=> handleRemoveProject(index)} className="remove-button">X</button>: ""}
            </div>
        ))}
    </div>
}