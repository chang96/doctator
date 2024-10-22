import SideBar from '../../components/sidebar';
import styles from './styles.module.css';
import Preview from '../../components/preview';
import ProjectList from '../../components/projectList/list';


export default function GenDocs(): JSX.Element{
    return <div className={styles.f} >
        <SideBar />
        <Preview />
        <ProjectList />
    </div>
}