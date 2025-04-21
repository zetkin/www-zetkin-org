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
    [centerX + centerX / 4, 0],
    [centerX, height / 3],
    [centerX - centerX / 4, (height / 3) * 2],
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

      // Limit how far the attraction effect should apply
      const maxXRange = 400;
      const maxYRange = 200;

      const dx = mouseOffsetX - offsetRef.current.x;
      const dy = mouseOffsetY - offsetRef.current.y;

      const easeInOut = (t: number) => t * t * (3 - 2 * t);

      const easeX = easeInOut(Math.min(Math.abs(dx) / maxXRange, 1));
      const easeY = easeInOut(Math.min(Math.abs(dy) / maxYRange, 1));

      if (
        Math.abs(mouseOffsetX) < maxXRange ||
        Math.abs(mouseOffsetX) < maxXRange * -1
      ) {
        // Smooth attraction within X range
        offsetRef.current.vx =
          (offsetRef.current.vx || 0) * 0.9 + dx * 0.0008 * easeX;
        offsetRef.current.x += offsetRef.current.vx;
      } else {
        // Decay X offset when mouse is out of range
        const decayX = easeInOut(
          Math.min(Math.abs(offsetRef.current.x) / maxXRange, 1),
        );
        offsetRef.current.vx *= 0.5; // inertia
        offsetRef.current.vx -= offsetRef.current.x * 0.01 * decayX; // Ease back to center
        offsetRef.current.x += offsetRef.current.vx;
      }

      if (
        Math.abs(mouseOffsetY) < maxYRange ||
        Math.abs(mouseOffsetY) < maxYRange * -1
      ) {
        // Smooth attraction within Y range
        offsetRef.current.vy =
          (offsetRef.current.vy || 0) * 0.9 + dy * 0.0008 * easeY;
        offsetRef.current.y += offsetRef.current.vy;
      } else {
        // Decay Y offset when mouse is out of range
        const decayY = easeInOut(
          Math.min(Math.abs(offsetRef.current.y) / maxYRange, 1),
        );
        offsetRef.current.vy *= 0.5; // inertia
        offsetRef.current.vy -= offsetRef.current.y * 0.01 * decayY;
        offsetRef.current.y += offsetRef.current.vy;
      }

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
          centerX -
            swirlDistX / 2 +
            Math.sin(runtime / 1000) * swirlDistX +
            offsetRef.current.x +
            noiseX,
          centerY -
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
