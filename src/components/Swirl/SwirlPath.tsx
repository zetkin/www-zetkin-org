'use client';

import { FC, useEffect, useRef, useState } from 'react';

type Point = [number, number];
type Curve = [Point, Point, Point, Point, Point];

type Props = {
  color: string;
  mouseX: number;
  mouseY: number;
  timeOffset?: number;
  width: number;
  height: number;
};

function spring(current: number, velocity: number, target: number, dt: number) {
  const stiffness = 0.007; // how “strong” the pull is
  const damping = 0.45; // how quickly it settles
  const force = (target - current) * stiffness;
  const accel = force - velocity * damping;
  const v2 = velocity + accel * dt;
  const x2 = current + v2 * dt;
  return { x: x2, v: v2 };
}

const SwirlPath: FC<Props> = ({
  color,
  mouseX,
  mouseY,
  timeOffset = 0,
  width,
  height,
}) => {
  const centerX = width / 2;
  const centerY = height / 2;

  const mouseRef = useRef({ x: 0, y: 0 });
  const startRef = useRef(new Date().getTime() + timeOffset);
  const offsetRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const opacityRef = useRef(1);
  const [points, setPoints] = useState<Curve>([
    [width, 0],
    [centerX * 1.2, height * 0.2],
    [centerX, height * 0.5],
    [centerX * 0.8, height * 0.8],
    [0, height],
  ]);

  useEffect(() => {
    mouseRef.current.x = mouseX;
    mouseRef.current.y = mouseY;
  }, [mouseX]);

  useEffect(() => {
    let handle = 0;

    function update() {
      const now = new Date();
      const runtime = now.getTime() - startRef.current;

      const mouseOffsetX = mouseRef.current.x - centerX;
      const mouseOffsetY = mouseRef.current.y - centerY;

      const distance = Math.sqrt(mouseOffsetX ** 2 + mouseOffsetY ** 2); // 🆕 calculate distance from center
      const maxReactDistance = 400; // 🆕 maximum distance within which the swirl reacts

      const isActive = distance < maxReactDistance; // 🆕 should it react?

      const targetX = isActive ? mouseOffsetX : 0; // 🆕 limit target movement if out of range
      const targetY = isActive ? mouseOffsetY : 0;

      const dt = 1;

      const springX = spring(
        offsetRef.current.x,
        offsetRef.current.vx,
        targetX,
        dt,
      ); // 🆕 updated to use clamped target
      offsetRef.current.x = springX.x;
      offsetRef.current.vx = springX.v;

      const springY = spring(
        offsetRef.current.y,
        offsetRef.current.vy,
        targetY,
        dt,
      ); // 🆕 updated to use clamped target
      offsetRef.current.y = springY.x;
      offsetRef.current.vy = springY.v;

      const swirlDistX = 60;
      const swirlDistY = 30;

      const noiseX = Math.sin(runtime / 300 + timeOffset) * 5;
      const noiseY = Math.sin(runtime / 500 + 123 + timeOffset) * 5;

      const newPoints: Curve = [
        points[0],
        points[1],
        [
          centerX * 1.1 -
            swirlDistX / 2 +
            Math.sin(runtime / 1000) * swirlDistX +
            offsetRef.current.x +
            noiseX,
          centerY * 0.75 -
            swirlDistY / 2 +
            Math.sin(runtime / 1400 + 100) * swirlDistY +
            offsetRef.current.y +
            noiseY,
        ],
        points[3],
        points[4],
      ];

      setPoints(newPoints);

      const fadeCycle = 21000;
      const visibleRatio = 0.9;

      const cyclePos = (runtime % fadeCycle) / fadeCycle;
      const raw = Math.sin(cyclePos * Math.PI * 2);

      let opacity = (raw + 1) / 2;
      opacity = Math.max(0, (opacity - (1 - visibleRatio)) / visibleRatio);

      opacityRef.current = opacity;

      handle = requestAnimationFrame(update);
    }

    handle = requestAnimationFrame(update);

    return () => cancelAnimationFrame(handle);
  }, []);

  return (
    <path
      d={`M ${points[0][0]} ${points[0][1]} S ${points[1][0]} ${points[1][1]} ${points[2][0]} ${points[2][1]} S ${points[3][0]} ${points[3][1]} ${points[4][0]} ${points[4][1]}`}
      style={{
        fill: 'none',
        stroke: color,
        strokeWidth: 125,
        strokeOpacity: opacityRef.current,
      }}
    />
  );
};

export default SwirlPath;
