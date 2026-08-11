import React, { useState } from "react";

// Helper: Calculate path coordinates for Area/Line Charts
const getPathD = (data, width, height, padding = 40) => {
  if (!data || data.length === 0) return "";
  const xStep = (width - padding * 2) / (data.length - 1);
  const maxVal = Math.max(...data.map((d) => d.value), 10);
  const yRatio = (height - padding * 2) / maxVal;

  return data
    .map((d, i) => {
      const x = padding + i * xStep;
      const y = height - padding - d.value * yRatio;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
};

// Helper: Calculate area coordinates for Area Charts
const getAreaPathD = (data, width, height, padding = 40) => {
  if (!data || data.length === 0) return "";
  const linePath = getPathD(data, width, height, padding);
  const xStep = (width - padding * 2) / (data.length - 1);
  const startX = padding;
  const endX = padding + (data.length - 1) * xStep;
  const baseY = height - padding;

  return `${linePath} L ${endX} ${baseY} L ${startX} ${baseY} Z`;
};

// 1. Line/Area Chart Component
export function ExecutiveLineChart({ data = [], title = "Metrics Trend", color = "#00C6FF" }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const width = 500;
  const height = 220;
  const padding = 35;

  const maxVal = Math.max(...data.map((d) => d.value), 10);
  const yRatio = (height - padding * 2) / maxVal;
  const xStep = (width - padding * 2) / (data.length - 1);

  const points = data.map((d, i) => ({
    x: padding + i * xStep,
    y: height - padding - d.value * yRatio,
    label: d.name,
    value: d.value,
  }));

  return (
    <div style={{ background: "var(--bg-secondary)", padding: "20px", borderRadius: "16px", border: "1px solid var(--border-color)", boxSizing: "border-box" }}>
      <h4 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "16px", color: "var(--text-primary)" }}>{title}</h4>
      <div style={{ position: "relative", width: "100%", height: `${height}px` }}>
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%">
          {/* Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = padding + (height - padding * 2) * ratio;
            return (
              <line
                key={i}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="var(--border-color)"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            );
          })}

          {/* Area Fill */}
          <path
            d={getAreaPathD(data, width, height, padding)}
            fill={`url(#areaGrad-${color.replace("#", "")})`}
            opacity="0.15"
          />

          {/* Main Line */}
          <path
            d={getPathD(data, width, height, padding)}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Points */}
          {points.map((pt, idx) => (
            <g key={idx}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredIndex === idx ? "7" : "4"}
                fill={color}
                stroke="#ffffff"
                strokeWidth="2"
                style={{ cursor: "pointer", transition: "all 0.15s ease" }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            </g>
          ))}

          {/* X Axis Labels */}
          {points.map((pt, idx) => (
            <text
              key={idx}
              x={pt.x}
              y={height - 10}
              textAnchor="middle"
              fill="var(--text-secondary)"
              fontSize="10"
              fontWeight="600"
            >
              {pt.label}
            </text>
          ))}

          {/* Definitions for Gradients */}
          <defs>
            <linearGradient id={`areaGrad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={color} stopOpacity="0.0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredIndex !== null && (
          <div
            style={{
              position: "absolute",
              left: `${(points[hoveredIndex].x / width) * 100}%`,
              top: `${(points[hoveredIndex].y / height) * 100 - 25}%`,
              transform: "translateX(-50%)",
              background: "#111827",
              color: "#ffffff",
              padding: "4px 8px",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: "700",
              border: `1px solid ${color}`,
              pointerEvents: "none",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              whiteSpace: "nowrap",
            }}
          >
            {points[hoveredIndex].label}: {points[hoveredIndex].value}
          </div>
        )}
      </div>
    </div>
  );
}

// 2. Bar Chart Component
export function ExecutiveBarChart({ data = [], title = "Breakdown Analysis", color = "#0072FF" }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const width = 500;
  const height = 220;
  const padding = 35;

  const maxVal = Math.max(...data.map((d) => d.value), 10);
  const yRatio = (height - padding * 2) / maxVal;
  const xStep = (width - padding * 2) / data.length;
  const barWidth = Math.max(15, xStep * 0.5);

  return (
    <div style={{ background: "var(--bg-secondary)", padding: "20px", borderRadius: "16px", border: "1px solid var(--border-color)", boxSizing: "border-box" }}>
      <h4 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "16px", color: "var(--text-primary)" }}>{title}</h4>
      <div style={{ position: "relative", width: "100%", height: `${height}px` }}>
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%">
          {/* Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = padding + (height - padding * 2) * ratio;
            return (
              <line
                key={i}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="var(--border-color)"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            );
          })}

          {/* Bars */}
          {data.map((d, idx) => {
            const x = padding + idx * xStep + (xStep - barWidth) / 2;
            const barHeight = d.value * yRatio;
            const y = height - padding - barHeight;

            return (
              <g key={idx}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx="4"
                  fill={hoveredIndex === idx ? color : `${color}dd`}
                  style={{ cursor: "pointer", transition: "fill 0.2s ease" }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                {/* Labels */}
                <text
                  x={x + barWidth / 2}
                  y={height - 10}
                  textAnchor="middle"
                  fill="var(--text-secondary)"
                  fontSize="10"
                  fontWeight="600"
                >
                  {d.name.length > 8 ? d.name.substring(0, 7) + ".." : d.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredIndex !== null && (
          <div
            style={{
              position: "absolute",
              left: `${((padding + hoveredIndex * xStep + xStep / 2) / width) * 100}%`,
              top: `${((height - padding - data[hoveredIndex].value * yRatio) / height) * 100 - 25}%`,
              transform: "translateX(-50%)",
              background: "#111827",
              color: "#ffffff",
              padding: "4px 8px",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: "700",
              border: `1px solid ${color}`,
              pointerEvents: "none",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              whiteSpace: "nowrap",
            }}
          >
            {data[hoveredIndex].name}: {data[hoveredIndex].value}
          </div>
        )}
      </div>
    </div>
  );
}

// 3. Donut / Pie Chart Component
export function ExecutiveDonutChart({ data = [], title = "Distribution Share" }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const total = data.reduce((sum, d) => sum + d.value, 0);

  const colors = ["#00C6FF", "#0072FF", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6"];

  return (
    <div style={{ background: "var(--bg-secondary)", padding: "20px", borderRadius: "16px", border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
      <h4 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "16px", color: "var(--text-primary)" }}>{title}</h4>
      <div style={{ display: "flex", alignItems: "center", gap: "20px", flex: 1 }}>
        {/* Simple visual progress donuts instead of complex trig segments */}
        <div style={{ position: "relative", width: "120px", height: "120px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="100%" height="100%" viewBox="0 0 42 42">
            <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--border-color)" strokeWidth="4" />
            
            {/* Draw layered concentric dash offset bars to simulate pie segments */}
            {(() => {
              let accumulatedPercent = 0;
              return data.map((d, idx) => {
                const percent = (d.value / total) * 100;
                const strokeDash = `${percent} ${100 - percent}`;
                const strokeOffset = 100 - accumulatedPercent + 25;
                accumulatedPercent += percent;

                return (
                  <circle
                    key={idx}
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke={colors[idx % colors.length]}
                    strokeWidth={hoveredIndex === idx ? "5" : "4"}
                    strokeDasharray={strokeDash}
                    strokeDashoffset={strokeOffset}
                    style={{ transition: "stroke-width 0.15s ease" }}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                );
              });
            })()}
          </svg>
          <div style={{ position: "absolute", textAlign: "center" }}>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)", display: "block" }}>Total</span>
            <strong style={{ fontSize: "18px", color: "var(--text-primary)" }}>{Math.round(total)}</strong>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
          {data.map((d, idx) => {
            const pct = total > 0 ? Math.round((d.value / total) * 100) : 0;
            const isHovered = hoveredIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  color: isHovered ? "var(--text-primary)" : "var(--text-secondary)",
                  fontWeight: isHovered ? "bold" : "normal",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: colors[idx % colors.length] }} />
                  <span>{d.name}</span>
                </div>
                <strong>{pct}% ({d.value})</strong>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
