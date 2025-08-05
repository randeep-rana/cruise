const Zone = ({ zone, seatSize, gap }) => {
  const x = zone.startCol * (seatSize + gap);
  const y = zone.startRow * (seatSize + gap);
  const width = (zone.endCol - zone.startCol + 1) * (seatSize + gap) - gap;
  const height = (zone.endRow - zone.startRow + 1) * (seatSize + gap) - gap;

  return (
    <g key={zone.id}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={zone.color}
        stroke={zone.borderColor}
        strokeWidth={1}
        rx="6"
        ry="6"
        style={{ opacity: 0.8 }}
      />
      <text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="12"
        fill="#fff"
        fontFamily="sans-serif"
      >
        {zone.label}
      </text>
    </g>
  );
};

export default Zone; 