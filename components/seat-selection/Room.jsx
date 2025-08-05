const Room = ({ room, seatSize, gap }) => {
  const x = room.startCol * (seatSize + gap);
  const y = room.startRow * (seatSize + gap);
  const width = (room.endCol - room.startCol + 1) * (seatSize + gap) - gap;
  const height = (room.endRow - room.startRow + 1) * (seatSize + gap) - gap;

  return (
    <g
      onClick={() =>
        room.interactive && alert(`Clicked on room: ${room.label}`)
      }
      style={{ cursor: room.interactive ? "pointer" : "default", padding:'4px' }}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        strokeWidth={1}
        fill="none"
        stroke="#8AA0AB"
        rx={6}
        ry={6}
      />
      <text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        fontSize="12"
        fill="none"
        fontFamily="sans-serif"
      >
        {room.label}
      </text>
    </g>
  );
};

export default Room; 