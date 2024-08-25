import { AppDispatch } from '../../store/store';
import { generateJsonFile } from '../../utils/docRequests';
import Btn from '../button';
import styles from './styles.module.css';
import { useDispatch } from "react-redux";
import { genJson } from '../../slices/docsConfigSlices';

async function generateJson(d: AppDispatch){
    try {
        const p = window.localStorage.getItem("projects")
        if(p) {
            const o = JSON.parse(p)
            if(o.defaultProject.set){
                let x = await generateJsonFile(o.defaultProject.config, o.defaultProject.paths)
                d(genJson({generatedJson: x}))
            }
        }
    } catch (error) {
        
    }
}
export default function SideBarFooter(): JSX.Element{
    const dispatch: AppDispatch = useDispatch();

    return <div className={styles.f} >
        <Btn styles={{width: '85%', height:"5vh"}} name='Generate Json' func={()=> generateJson(dispatch)} />
    </div>
}