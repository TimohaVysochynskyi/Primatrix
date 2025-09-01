import { useEffect, useState } from "react";

interface AuthSVGProps {
  className?: string;
}

export default function AuthSVG({ className }: AuthSVGProps) {
  const [viewBoxHeight, setViewBoxHeight] = useState(466);

  useEffect(() => {
    const updateViewBox = () => {
      const width = window.innerWidth;
      if (width <= 350) {
        setViewBoxHeight(680);
      } else if (width <= 375) {
        setViewBoxHeight(650);
      } else if (width <= 425) {
        setViewBoxHeight(620);
      } else if (width <= 560) {
        setViewBoxHeight(580);
      } else {
        setViewBoxHeight(466);
      }
    };

    updateViewBox();
    window.addEventListener("resize", updateViewBox);

    return () => window.removeEventListener("resize", updateViewBox);
  }, []);

  // Розраховуємо нові координати для збільшеної висоти
  const bottomY = viewBoxHeight - 1; // Нижня межа SVG
  const bottomControlY = bottomY - 55; // Контрольна точка для нижньої частини

  return (
    <svg
      viewBox={`0 0 735 ${viewBoxHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d={`M733 ${bottomY - 1}L730.996 ${bottomY - 5}L56.4961 ${
          bottomY - 2.367
        }L55.668 ${bottomY - 2.369}L55.084 ${
          bottomY - 2.955
        }L2.58398 ${bottomControlY}L2 ${
          bottomControlY - 0.586
        }V49.2637L2.4375 48.7168L39.1426 2.75195L39.7432 2H278.962L279.562 2.75195L315.668 47.9648H660.378L660.963 48.5498L732.414 119.995L733 120.581V${
          bottomY - 1
        }Z`}
        fill="url(#paint0_linear_250_9)"
        stroke="#410FD3"
        strokeWidth="4"
      />
      <g transform="translate(672,47)">
        <path
          d="M61 2V58.1719L4.82812 2L61 2Z"
          fill="#12043F"
          stroke="#410FD3"
          strokeWidth="4"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_250_9"
          x1="277.312"
          y1="4"
          x2="277.312"
          y2={viewBoxHeight + 319} // Збільшуємо кінцеву точку градієнта
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#141220" />
          <stop offset="1" stopColor="#280887" />
        </linearGradient>
      </defs>
    </svg>
  );
}
