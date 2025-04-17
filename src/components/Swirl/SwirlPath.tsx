'use client';

import { FC, useEffect, useRef, useState } from 'react';

type Point = [number, number];
type Curve = [Point, Point, Point, Point, Point];

type Props = {
  color: string;
  mouseX: number;
  mouseY: number;
  timeOffset?: number;
};

const SwirlPath: FC<Props> = ({ color, mouseX, mouseY, timeOffset = 0 }) => {
  // TODO: These should be flexible
  const width = 600;
  const height = 400;
  const centerX = width / 2;
  const centerY = height / 2;

  const mouseRef = useRef({ x: 0, y: 0 });
  const startRef = useRef(new Date().getTime() + timeOffset);
  const offsetRef = useRef({ x: 0, y: 0 });
  const [points, setPoints] = useState<Curve>([
    [0, 0],
    [centerX, 0],
    [centerX, height / 3],
    [centerX, (height / 3) * 2],
    [width, height],
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

      if (Math.abs(mouseOffsetX) < 150) {
        // When the mouse is close on x axis, move towards mouse
        const deltaOffset = mouseOffsetX - offsetRef.current.x;
        offsetRef.current.x += deltaOffset * 0.1; // Constant control speed
      } else {
        // Move back towards normal position (offset goes towards zero)
        offsetRef.current.x *= 0.99;
      }

      if (Math.abs(mouseOffsetY) < 100) {
        // When the mouse is close on Y axis, move towars mouse
        const deltaOffset = mouseOffsetY - offsetRef.current.y;
        offsetRef.current.y += deltaOffset * 0.1; // Constant controls speed
      } else {
        // Move back towards normal position (offset goes towards zero)
        offsetRef.current.y *= 0.99;
      }

      // Control how much the "swirl" motion is allowed to move
      const swirlDistX = 60;
      const swirlDistY = 30;

      const newPoints: Curve = [
        points[0],
        points[1],
        [
          // "Swirl" the middle point of the path back and forth over time.
          // The X and Y positions swirl on different periods, so that the
          // movement looks more random.
          centerX + Math.sin(runtime / 1000) * swirlDistX + offsetRef.current.x,
          centerY +
            Math.sin(runtime / 1400 + 100) * swirlDistY +
            offsetRef.current.y,
        ],
        points[3],
        points[4],
      ];

      setPoints(newPoints);

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
        strokeWidth: 50,
      }}
    />
  );
};

export default SwirlPath;
