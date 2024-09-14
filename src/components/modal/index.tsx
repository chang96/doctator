import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
// import { getSampleTemplates } from "../../utils/docRequests";
// import { useEffect, useState } from "react";
// import { setProject } from "../../utils/localstorageFuncs";
import TextArea from "../textarea";
import { useCallback, useEffect } from "react";
import { closeModal } from "../../slices/modalSlices";

export default function Modal(): JSX.Element{
    const {displayModal: mod } = useSelector((state: RootState) => state.modal)
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

    return <div style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        height: "50%",
        backgroundColor: "rgba(255, 255, 255, 1)",
        display: mod ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        zIndex: "100",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
    }}>
        <TextArea />
    </div>
}