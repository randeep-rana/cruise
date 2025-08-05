// import WomanImg from "../assets/woman.svg";

const Seat = ({ seat, isSelected, onSelect, seatSize, gap, ship, deck }) => {
  const x = seat.col * (seatSize + gap);
  const y = seat.row * (seatSize + gap);
  
  const rectWidth = seatSize - 6;
  const rectHeight = (seatSize) - 6;

  const seatColor = !seat.available
    ? "#ccc"
    : isSelected
    ? "#00A7C5"
    : "#fff";  

  return (
    <g
      onClick={() => seat.available && onSelect(seat.id)}
      style={{ cursor: seat.available ? "pointer" : "not-allowed" }}
    >
      <rect
        x={x + 3}
        y={y + 3}
        width={rectWidth}
        height={rectHeight}
        rx="6"
        fill={seatColor}
        strokeWidth={1}
        stroke={'#00A7C5'}
      />
     
      <text
        x={x + seatSize / 2}
        y={y + seatSize / 2 + 4}
        textAnchor="middle"
        fontSize="9"
        fill="#000"
        fontFamily="sans-serif"
      >
        {/* <tspan x={x + seatSize / 2} dy="0">{seat?.roomNo}I </tspan> */}
        {ship === "mvKavaratti" && deck == "first"  ? <tspan>{seat?.type == "L" ? "" : "Upper"}</tspan> : seat?.type?.includes("U") ? 'Upper' : null}
      </text>
    </g>
  );
};

export default Seat;