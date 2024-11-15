import { AppDispatch, RootState } from '../../store/store';
import { generateJsonFile } from '../../utils/docRequests';
import Btn from '../button';
import styles from './styles.module.css';
import { useDispatch, useSelector } from "react-redux";
import { genJson } from '../../slices/docsConfigSlices';

async function generateJson(d: AppDispatch, selectedProject: string){
    try {
        const p = window.localStorage.getItem("projects")
        if(p) {
            const o = JSON.parse(p)
            if(o[selectedProject].set){
                let x = await generateJsonFile(o[selectedProject].config, o[selectedProject].paths)
                d(genJson({generatedJson: x}))
            }
        }
    } catch (error) {
        
    }
}
export default function SideBarFooter(): JSX.Element{
    const dispatch: AppDispatch = useDispatch();
    const selectedProjectName = useSelector(
        (state: RootState) => state.requestConfig.selectedProjectName
      );
    return <div className={styles.f} >
        <Btn styles={{width: '85%', height:"5vh"}} name='Generate Json' func={()=> generateJson(dispatch, selectedProjectName)} />
    </div>
}