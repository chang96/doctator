import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
// import { getSampleTemplates } from "../../utils/docRequests";
// import { useEffect, useState } from "react";
// import { setProject } from "../../utils/localstorageFuncs";
// import TextArea from "../textarea";
import { useCallback, useEffect, useState } from "react";
import { closeModal, openModal } from "../../slices/modalSlices";
import Form from "../config";
import Paths from "../paths";
import styles from './styles.module.css'
import { PATH_SELECTED } from "../../actions/actions";
import { getById } from "../../utils/makeRequest";



export default function Modal(): JSX.Element{
    const documentId = new URLSearchParams(window.location.search).get("id"); 
    const {displayModal: mod, selected } = useSelector((state: RootState) => state.modal)
    const [state, setState] = useState({documentId, selectedForm: selected, renderComponent: <div>loading...</div>, isDisplaying: documentId ? "block":"none"})

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
        if (documentId) {
          dispatch(openModal({type: PATH_SELECTED}))
          console.log(documentId);

          (async function fetchapireference(){
            const res = await getById(documentId)
            const projects = {
              defaultProject: {
                config: {},
                paths: {},
                set: false,
              },
            };
            let p = window.localStorage.getItem("projects") || JSON.stringify(projects)
            const o = JSON.parse(p);

            o.defaultProject.set = true
            o.defaultProject.config = res.config
            o.defaultProject.paths = {"endpoints": res.paths}
            window.localStorage.setItem("projects", JSON.stringify(o))
            setState((state) => {
              return {...state, renderComponent: <Paths />, selectedForm:"paths", isDisplaying: "block" }
            })
          })()
       
        } else if(selected === "config"){
          setState((state) => {
            return {...state, selectedForm: selected, isDisplaying:"block", renderComponent: <Form />}
          })
        } else {
          setState((state) => {
            return {...state, selectedForm: selected, renderComponent: <Paths />, isDisplaying:"block"}
          })
        }
        return
      }, [selected, documentId, dispatch]);

      // if (state.selectedForm === "config"){
      //   setState({...state, renderComponent: <Form />})
      // } else if (state.selectedForm === "paths") {
      //   setState({...state, renderComponent: <Paths />})
      // } else if (documentId) {
      //   setState({...state,selectedForm: "paths", renderComponent: <div>loading...</div>})
      // }
      

    return <div className={styles.m} style={{
        width: "100%",
        display: state.isDisplaying,
        padding: "1%",
        backgroundColor: state.selectedForm === 'paths' ? "rgb(20, 20, 20)" : "white"
    }}>
        {state.renderComponent }
    </div>
}