'use client';

import { FC, useState } from 'react';

import SwirlPath from './SwirlPath';

const Swirl: FC = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const width = 1600;
  const height = 1200;

  return (
    <div
      onMouseMove={(ev) => {
        setMouseX(ev.clientX);
        setMouseY(ev.clientY);
      }}
      style={{
        filter: 'blur(45px)',
      }}
    >
      <svg height={height} width={width}>
        <g>
          <SwirlPath
            color="rgba(15, 170, 150, 0.6)"
            height={height}
            mouseX={mouseX}
            mouseY={mouseY}
            timeOffset={14000}
            width={width}
          />
          <SwirlPath
            color="rgba(120, 1, 221, 0.6)"
            height={height}
            mouseX={mouseX}
            mouseY={mouseY}
            timeOffset={7000}
            width={width}
          />
          <SwirlPath
            color="rgba(254, 43, 90, 0.6)"
            height={height}
            mouseX={mouseX}
            mouseY={mouseY}
            width={width}
          />
        </g>
      </svg>
    </div>
  );
};

export default Swirl;
