interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
}

// Tiny inline-SVG sparkline (no chart library). Normalizes the series to the
// given box and colours the line by its own start→end trend (the real 7d gain).
export function Sparkline({ data, width = 72, height = 26, className = '' }: SparklineProps) {
  if (data.length < 2) return null;

  const first = data[0]!;
  const last = data[data.length - 1]!;
  const positive = last >= first;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');

  const stroke = positive ? '#34c759' : '#ff3b30';

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
