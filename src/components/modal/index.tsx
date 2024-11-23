import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
// import { getSampleTemplates } from "../../utils/docRequests";
// import { useEffect, useState } from "react";
// import { setProject } from "../../utils/localstorageFuncs";
// import TextArea from "../textarea";
import { useCallback, useEffect, useState } from "react";
import { closeModal } from "../../slices/modalSlices";
import Form from "../config";
import Paths from "../paths";
import styles from './styles.module.css'


let mql = window.matchMedia('(max-width: 900px)')

export default function Modal(): JSX.Element{
    const {displayModal: mod, selected } = useSelector((state: RootState) => state.modal)
    const [state, setState] = useState({selectedForm: selected})

    const dispatch: AppDispatch = useDispatch();
    
    const escFunction = useCallback((event: any) => {
        if (event.key === "Escape") {
          if (mod) {
            dispatch(closeModal())
          }
        }
      }, [dispatch, mod]);

      useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
        document.removeEventListener("keydown", escFunction, false);
        };
      }, [escFunction]);

      useEffect(() => {
        setState({selectedForm: selected})
      }, [selected]);

    return <div className={styles.m} style={{
        width: mql.matches ? "100%" : "55%",
        display: mod ? "flex" : "none",
    }}>
        {state.selectedForm ? state.selectedForm === 'config' ? <Form /> : <Paths />  : "" }
    </div>
}