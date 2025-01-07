import { useState } from 'react';

const InfoTooltip = ({ description }: {description: string}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{ display: 'inline-block', position: 'relative' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        style={{
          fontSize: '11px',
          cursor: 'pointer',
          color: 'gray',
        }}
      >
        &#9432;
      </span>

      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            maxWidth: '250px',
            padding: '8px 12px',
            backgroundColor: '#333',
            color: '#fff', 
            borderRadius: '15px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            zIndex: 1,
            overflowX: 'auto', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
          }}
        >
          {description}
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;
