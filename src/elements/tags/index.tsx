import React, { useState } from "react";
import '../elements.css'
import { getProject, setProjectByProjectName } from "../../utils/localstorageFuncs";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

type Tag = { name: string; description: string };
function TagFunc() {
  const {selectedProjectName: projectName} = useSelector((state: RootState) => state.requestConfig)
  const projectConfiguration = getProject(projectName)
  const tagsArr = projectConfiguration.config.tags as Tag[]

  const [state, setState] = useState<{ tags: Tag[] }>({ tags: [...tagsArr] });
  const addTag = () => {
    const newTags = [...state.tags, { name: "", description: "" }];
    setState({ tags: newTags });
    projectConfiguration.config.tags = [...state.tags, { name: "", description: "" }]
    setProjectByProjectName(projectName, projectConfiguration)
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    const [field, index] = name.split('-');
    state.tags[Number(index)][field as 'description' | 'name'] = value
    setState({ tags: [...state.tags]})
    projectConfiguration.config.tags[index][field as 'description' | 'name'] = value
    setProjectByProjectName(projectName, projectConfiguration)
  };

  const deleteTag = (index: number) => {
    const newTags = [...state.tags];
    newTags.splice(index, 1);
    setState({ tags: newTags });
    projectConfiguration.config.tags = newTags
    setProjectByProjectName(projectName, projectConfiguration)
  };
  return (
    <div className="c">
      <div>
        <p>Tags:</p>
      </div>
      <div className="fc">
        {state.tags.map((tag, index) => {
          return (
            <div style={{margin:"5px"}} key={index}>
              <button className="remove-button" style={{cursor:"pointer"}} onClick={()=> deleteTag(index)}>X</button>
              <div>
                <div>name:</div>
                <input name={`name-${index}`} value={tag.name} onChange={(e) => handleChange(e)} />
              </div>
              <div>
                <div>description:</div>
                <input name={`description-${index}`} value={tag.description} onChange={(e) => handleChange(e)} />
              </div>
            </div>
          );
        })}
      </div>
      <button className="add-button" style={{  cursor: "pointer" }} onClick={() => addTag()}>
        +
      </button>
    </div>
  );
}

export default TagFunc;
