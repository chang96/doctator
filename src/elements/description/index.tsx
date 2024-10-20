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
  const [state, setState] = useState<DescriptionDetails>({name: "", description:"", summary:"", operationId:""})
  const dispatch: AppDispatch = useDispatch();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const {name, value} = e.target
    setState({ ...state, [name]: value })
    dispatch(setDescriptionDetails({...state, [name]: value}))
  }
  return (
    <div>
      <input value={name} onChange={handleChange} placeholder="Name" name="name" type="text" />
      <input value={description} onChange={handleChange} placeholder="Description" name="description" type="text" />
      <input value={summary} onChange={handleChange} placeholder="Summary" name="summary" type="text" />
      <input value={operationId} onChange={handleChange} placeholder="Operation Id" name="operationId" type="text" />
    </div>
  );
}

export default Description;
