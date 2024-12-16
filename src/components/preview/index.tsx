import { useEffect, useState } from 'react';
import { RootState } from '../../store/store';
import styles from './styles.module.css';
import { useSelector } from 'react-redux';

export default function Preview(): JSX.Element{
    const json = useSelector((state: RootState) => state.config.generatedJson);
    const [state, setState] = useState({value: json})
    useEffect(()=> {
        setState({value: json});
    }, [json])
    return <div className={styles.f} >
        <textarea onChange={()=>''} value={JSON.stringify(state.value, null, "   ")} style={{width: "100%", height: "95%", border:"0.001px solid black", borderRadius: "10px"}}></textarea>
        <button>Preview</button>
    </div>
} 