import { useState } from "react";
import { setDescriptionDetails } from "../../slices/request";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

type DescriptionDetails = {
  name: string;
  description: string;
  summary: string;
  operationId: string;
}
function Description() {
  const [state, setState] = useState<DescriptionDetails>({name: "", description:"", summary:"", operationId:""})
  const dispatch: AppDispatch = useDispatch();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const {name, value} = e.target
    setState({ ...state, [name]: value })
    dispatch(setDescriptionDetails({...state, [name]: value}))
  }
  return (
    <div>
      <input onChange={handleChange} placeholder="Name" name="name" type="text" />
      <input onChange={handleChange} placeholder="Description" name="description" type="text" />
      <input onChange={handleChange} placeholder="Summary" name="summary" type="text" />
      <input onChange={handleChange} placeholder="Operation Id" name="operationId" type="text" />
    </div>
  );
}

export default Description;
