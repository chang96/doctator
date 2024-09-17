import React, { useState } from "react";
import '../elements.css'

type Tag = { name: string; description: string };
function TagFunc() {
  const [state, setState] = useState<{ tags: Tag[] }>({ tags: [] });
  const addTag = () => {
    const newTags = [...state.tags, { name: "", description: "" }];
    setState({ tags: newTags });
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    const [field, index] = name.split('-');
    state.tags[Number(index)][field as 'description' | 'name'] = value
    setState({ tags: [...state.tags]})
  };

  const deleteTag = (index: number) => {
    const newTags = [...state.tags];
    newTags.splice(index, 1);
    setState({ tags: newTags });
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
