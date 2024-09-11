export {}
// import { getSampleTemplates } from "../../utils/docRequests"

// const r = async () =>{
//     let p = (window.localStorage.getItem("projects"))
//     if(p) {
//         const o = JSON.parse(p)
//         if(!o.defaultProject.set){
//             const c = await getSampleTemplates("/sampleconfig")
//             const p = await getSampleTemplates("/samplepath")
//             o.defaultProject.set = true
//             o.defaultProject.config = c
//             o.defaultProject.paths = p
//             window.localStorage.setItem("projects", JSON.stringify(o))
//             if(selected){
//                 if(selected === "Paths") setState({value: p})
//                 if(selected === "Configs") setState({value: c})
//             }
//         } else {
//             if(selected === "Paths") setState({value: o.defaultProject.paths})
//             if(selected === "Configs") setState({value: o.defaultProject.config})
//         }
//     }
// }