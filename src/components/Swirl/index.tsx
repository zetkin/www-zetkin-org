'use client';

import { FC, useState } from 'react';

import SwirlPath from './SwirlPath';

const Swirl: FC = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  return (
    <div
      onMouseMove={(ev) => {
        setMouseX(ev.clientX);
        setMouseY(ev.clientY);
      }}
      style={{
        //filter: 'blur(30px) hue-rotate(270deg)',
        filter: 'blur(30px)',
      }}
    >
      <svg height="400" width="600">
        <g>
          <SwirlPath
            color="rgba(0, 0, 250, 0.5)"
            mouseX={mouseX}
            mouseY={mouseY}
            timeOffset={1300}
          />
          <SwirlPath
            color="rgba(200, 0, 0, 0.5)"
            mouseX={mouseX}
            mouseY={mouseY}
          />
          <SwirlPath
            color="rgba(0, 200, 100, 0.5)"
            mouseX={mouseX}
            mouseY={mouseY}
            timeOffset={1800}
          />
        </g>
      </svg>
    </div>
  );
};

export default Swirl;
