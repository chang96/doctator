import { useState } from "react";
import { setDescriptionDetails } from "../../slices/request";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";

type DescriptionDetails = {
  name: string;
  description: string;
  summary: string;
  operationId: string;
}
function Description() {
  const {
    name,
    description,
    summary,
    operationId,
  } = useSelector((state: RootState) => state.requestConfig.endpoints[state.requestConfig.selectedEndpoint]);
  const [state, setState] = useState<DescriptionDetails>({name: name || "", description: description ||"", summary: summary || "", operationId: operationId||""})
  const dispatch: AppDispatch = useDispatch();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const {name, value} = e.target
    setState({ ...state, [name]: value })
    dispatch(setDescriptionDetails({...state, [name]: value}))
  }
  return (
    <div style={{display: "flex", flexDirection:"row", flexWrap:"wrap"}}>
      <div style={{width:"50%"}}><div>name:</div><div><input value={name} onChange={handleChange} placeholder="Name" name="name" type="text" /></div></div>
      <div style={{width:"50%"}}><div>description:</div><div><input value={description} onChange={handleChange} placeholder="Description" name="description" type="text" /></div></div>
      <div style={{width:"50%"}}><div>summary:</div><div> <input value={summary} onChange={handleChange} placeholder="Summary" name="summary" type="text" /></div></div>
      <div style={{width:"50%"}}><div>operation id</div><div><input value={operationId} onChange={handleChange} placeholder="Operation Id" name="operationId" type="text" /></div></div>
    </div>
  );
}

export default Description;
