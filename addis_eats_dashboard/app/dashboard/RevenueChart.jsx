"use client";

import { useMemo } from "react";

const money = (value) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(value);

export default function RevenueChart({ data }) {
  const maxRevenue = useMemo(
    () => Math.max(1, ...data.map((item) => Number(item.revenue || 0))),
    [data]
  );

  if (!data.length) {
    return <p className="chart-empty" role="status">No revenue data to chart yet.</p>;
  }

  return (
    <div className="chart-frame">
      <svg
        viewBox={`0 0 560 ${Math.max(220, data.length * 48 + 32)}`}
        role="img"
        aria-labelledby="revenue-chart-title revenue-chart-desc"
      >
        <title id="revenue-chart-title">Revenue by neighbourhood</title>
        <desc id="revenue-chart-desc">
          Horizontal bars compare total revenue in Ethiopian birr for each neighbourhood.
        </desc>
        {data.map((item, index) => {
          const y = 18 + index * 48;
          const barWidth = (Number(item.revenue || 0) / maxRevenue) * 330;
          return (
            <g key={item.neighbourhood}>
              <text x="0" y={y + 17} className="bar-label">{item.neighbourhood}</text>
              <rect x="170" y={y} width="330" height="24" rx="4" className="bar-track" />
              <rect x="170" y={y} width={barWidth} height="24" rx="4" className="bar-fill" />
              <text x={Math.min(510, 178 + barWidth)} y={y + 17} className="bar-value">{money(item.revenue)}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
