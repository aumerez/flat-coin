"use client";

import { Treemap, ResponsiveContainer } from "recharts";

interface TreemapData {
  name: string;
  size?: number;
  children?: TreemapData[];
  [key: string]: unknown;
}

interface TreemapRoot {
  children?: TreemapData[];
}

interface CustomContentProps {
  root?: TreemapRoot;
  depth?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  index?: number;
  name?: string;
  value?: number;
}

const COLORS = ["#74ACDF", "#5A8FB8", "#A8D5F2", "#8DC77B", "#F6B40E", "#F8C12D"];

const CustomizedContent = (props: CustomContentProps) => {
  const { root, depth = 0, x = 0, y = 0, width = 0, height = 0, index = 0, name, value } = props;

  if (!root?.children || !Array.isArray(root.children)) return null;

  const formatValue = (val?: number) => {
    if (!val) return '';
    return `$${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill:
            depth < 2
              ? COLORS[Math.floor((index / root.children.length) * COLORS.length)]
              : "#ffffff00",
          stroke: "#fff",
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth === 1 && width > 80 && height > 50 ? (
        <>
          <text x={x + width / 2} y={y + height / 2 - 5} textAnchor="middle" fill="#fff" fontSize={16} fontWeight="600">
            {name}
          </text>
          <text x={x + width / 2} y={y + height / 2 + 15} textAnchor="middle" fill="#fff" fontSize={14}>
            {formatValue(value)}
          </text>
        </>
      ) : null}
    </g>
  );
};

interface CollateralTreemapProps {
  data: TreemapData[];
}

export default function CollateralTreemap({ data }: CollateralTreemapProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <Treemap
        data={data}
        dataKey="size"
        stroke="#fff"
        fill="#74ACDF"
        content={<CustomizedContent />}
      />
    </ResponsiveContainer>
  );
}
