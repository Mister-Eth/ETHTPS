import { useEffect, useRef, useState } from 'react';
import debounce from 'lodash/debounce';

export const Circles = ({ data }) => {
  const [width, setWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    function updateWidth() {
      setWidth(containerRef.current.clientWidth / (data.length + 1));
    }
    const handleResize = debounce(updateWidth, 500);
    updateWidth();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [data.length]);

  return (
    <svg width="100%" height="350" ref={containerRef}>
      <g transform="translate(0, 100)">
        {data.map((d, i) => (
          <circle
            key={i}
            r={d}
            cx={width * (i + 1)}
            cy={Math.random() * 100}
            stroke={i % 2 === 0 ? '#f80' : '#aaf'}
            fill={i % 2 === 0 ? 'orange' : '#44f'}
          ></circle>
        ))}
      </g>
    </svg>
  );
};