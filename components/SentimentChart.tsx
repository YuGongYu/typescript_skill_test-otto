import { ChartDatapoint } from "../models.js";

interface ChartProps {
  datapoints: Array<ChartDatapoint>;
  width: number;
  height: number;
}

const chartColor = "#0078FF";

export default function SentimentChart({
  datapoints,
  width,
  height,
}: ChartProps) {
  const maxValue = 100;
  const hPerValue = height / maxValue;
  const w = width / datapoints.length;

  return (
    <div className="sentiment-chart">
      <svg width={width} height={height}>
        {datapoints.map((dp: ChartDatapoint, index) => (
          <g key={dp.start.valueOf()} data-timestamp={dp.start.toISOString()}>
            {dp.value > 0 ? (
              <rect
                width={w}
                x={index * w}
                y={Math.max(0, height - hPerValue * dp.value)}
                height={hPerValue * dp.value}
                fill={chartColor}
                data-value={dp.value}
              />
            ) : undefined}
          </g>
        ))}
      </svg>
    </div>
  );
}
