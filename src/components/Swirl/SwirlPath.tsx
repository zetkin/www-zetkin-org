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

function cubicBezier(
  t: number,
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
): Point {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  const x = uuu * p0[0] + 3 * uu * t * p1[0] + 3 * u * tt * p2[0] + ttt * p3[0];
  const y = uuu * p0[1] + 3 * uu * t * p1[1] + 3 * u * tt * p2[1] + ttt * p3[1];
  return [x, y];
}

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

      const mouse = { x: mouseRef.current.x, y: mouseRef.current.y };
      const samples = 20;

      let minDist = Infinity;

      for (let i = 0; i <= samples; i++) {
        const t = i / samples;
        const [x, y] = cubicBezier(
          t,
          points[0],
          points[1],
          points[2],
          points[3],
        );

        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          minDist = dist;
        }
      }

      const interactionRadius = 300;
      const withinRange = minDist < interactionRadius;

      const mouseOffsetX = withinRange ? mouseRef.current.x - centerX : 0;
      const mouseOffsetY = withinRange ? mouseRef.current.y - centerY : 0;

      const dt = 1; // frame‐time delta (you can swap for real delta if you want)

      // spring(current, velocity, target, dt)
      // ↳ stiffness=0.01, damping=0.1 baked into spring()
      const springX = spring(
        offsetRef.current.x, // current position
        offsetRef.current.vx, // current velocity
        mouseOffsetX, // target
        dt,
      );
      offsetRef.current.x = springX.x; // 📌 updated position
      offsetRef.current.vx = springX.v; // 📌 updated velocity

      const springY = spring(
        offsetRef.current.y,
        offsetRef.current.vy,
        mouseOffsetY,
        dt,
      );
      offsetRef.current.y = springY.x;
      offsetRef.current.vy = springY.v;

      // Control how much the "swirl" motion is allowed to move
      const swirlDistX = 60;
      const swirlDistY = 30;

      const noiseX = Math.sin(runtime / 300 + timeOffset) * 5;
      const noiseY = Math.sin(runtime / 500 + 123 + timeOffset) * 5;

      const newPoints: Curve = [
        points[0],
        points[1],
        [
          // "Swirl" the middle point of the path back and forth over time.
          // The X and Y positions swirl on different periods, so that the
          // movement looks more random.
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

      const fadeCycle = 21000; // Total cycle time in ms
      const visibleRatio = 0.9; // Ratio of the cycle that is visible

      const cyclePos = (runtime % fadeCycle) / fadeCycle; // 0 to 1
      const raw = Math.sin(cyclePos * Math.PI * 2); // -1 to 1

      // Shift and scale sine so it's mostly 1, briefly dips near 0
      let opacity = (raw + 1) / 2; // 0 to 1

      // Result oscillates between 0 and 1
      opacity = Math.max(0, (opacity - (1 - visibleRatio)) / visibleRatio); // Clamp fade-in/out duration

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
