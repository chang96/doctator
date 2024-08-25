import Modal from '../modal';
import SideBarBody from '../sidebarBody';
import SideBarFooter from '../sidebarFooter';
import styles from './styles.module.css';

export default function SideBar(): JSX.Element{
    // const [state, setState] = useState({displayModal: false})
    return <div className={styles.f} >
        <SideBarBody />
        <SideBarFooter />
        <Modal />
    </div>
} 