import React, { useState } from 'react';
import { returnTextColor } from '../../utils/helpers';

function returnType (value: any): string {
  const type = typeof value
  if (type === "string" && (value as string).split(":").length > 1) {
    const enums = (value as string).split(":")
    if (enums.at(-1) === ".") enums.pop()
    return `enum -${enums.join(",")}`
  }
  if (type === "object" && Array.isArray(value)) {
    if (value[0]){
      const res = [] as any[]
      value.forEach(k => {
        const t = typeof k
        if (!res.includes(t)) res.push(t)
      })
      return `[]${res.join(" | ")}`
    }
    return "[]"
  } 
  if (type === "object" && value === null) {
    return "null"
  }
  return type.toLowerCase()
}

// Recursive component to render the data structure
const ExpandableValue = ({ value, keyName, innerElement }: {value: any, keyName: any, innerElement: boolean}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  // Get the type of the current value
  let valueType = returnType(value);
  // if (valueType === "Array"){
  //   valueType = getType(value[0])
  //   return (<div style={styles.item}>
  //      <div onClick={toggleExpansion} style={styles.toggleButton}>
  //       {expanded ? '[-]' : '[+]'} {keyName}
  //     </div>
  //     {expanded && (
  //       <div style={styles.nested}>
  //         {`[]`}
  //       </div>
  //     )}
  //   </div>)
  // }

  if (valueType !== 'object' && valueType !== 'Array' && !valueType.includes("[]") ) {
    return (
      <div style={styles.item}>
        <span style={styles.innerText}>{keyName ? `${keyName}: ` : ''} <span style={{color: returnTextColor(valueType)}}>{valueType}</span></span>
      </div>
    );
  }

  return (
    <div style={styles.item}>
      <div onClick={toggleExpansion} style={styles.toggleButton}>
        <span>{expanded ? '[-]' : '[+]'} {keyName} {innerElement && <span style={{color: returnTextColor(valueType)}}>{valueType}</span>}</span>
      </div>
      {expanded && (
        <div style={styles.nested}>
          {Object.entries(value).map(([nestedKey, nestedValue]) => (
            <ExpandableValue key={nestedKey} keyName={nestedKey} value={nestedValue} innerElement={true}/>
          ))}
        </div>
      )}
    </div>
  );
};

const ExpandableStructure = ({ data, keyName }:{data: any, keyName: string}) => {
  return (
    <div style={styles.container}>
      <ExpandableValue keyName={keyName} value={data} innerElement={false}/>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    color: 'white',
  },
  item: {
  },
  innerText: {
    fontWeight: "200"
  },
  toggleButton: {
    cursor: 'pointer',
  },
  nested: {
    paddingLeft: '20px',
    marginTop: '5px',
  },
};

export default ExpandableStructure;
