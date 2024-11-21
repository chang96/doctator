import { useDispatch, useSelector } from "react-redux"
import styles from './styles.module.css'
import { RootState } from "../../store/store"
import { Dispatch } from "redux"
import { useState } from "react"
import { addProjectList, removeProjectFromList, setSelectedProjectName } from "../../slices/request"

export default function ProjectList(){
    const [state, setState] = useState({newProject: "", selectedProjectIndex: 0})
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

    const handleSelectProject = (projectName: string, index: number) => {
        dispatch(setSelectedProjectName({projectName}))
        setState({...state, selectedProjectIndex: index})
    }
    return <div className={styles.f}>
        <div><input value={state.newProject} onChange={handleNewProjectName} name="newProject" placeholder="new project" /></div>
        <button onClick={handleAddProject}>Add</button>
        
        {projectList.map((project, index) => (
            <div key={index} className="mt fr">
                <div onClick={()=> handleSelectProject(project, index)} className="pointa" key={project}>{index!==state.selectedProjectIndex || "*"}{project}</div>
                {index !== 0 ? <button onClick={()=> handleRemoveProject(index)} className="remove-button">X</button>: ""}
            </div>
        ))}
    </div>
}