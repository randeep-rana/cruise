import React, { useState, useRef } from "react";
import Seat from "./Seat";
import Zone from "./Zone";
import Room from "./Room";
import { cn } from '@/lib/utils';

const SeatMap = ({ seats, zones, metadata, seatSize, gap, deck, ship, containerClass, handlePassengerSelect }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const containerRef = useRef();

  const handleSelect = (seatId) => {
    setSelectedSeat((prev) => (prev === seatId ? null : seatId));
  };

  // Find the selected seat object
  const selectedSeatObj = seats.find((s) => s.id === selectedSeat);

  // Calculate floating div position
  let infoBoxStyle = { display: "none" };

  if (selectedSeatObj) {
    const x = selectedSeatObj.col * (seatSize + gap) + 30;
    const y = selectedSeatObj.row * (seatSize + gap) + 30;

    infoBoxStyle = {
      position: "absolute",
      left: x,
      top: y,
      width: 200,
      height: 150,
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.06)",
      zIndex: 10,
      padding: '12px',
      display: "block",
      border: '1px solid #E6EAED',
      overflow:'auto'
    };
  }

  const totalWidth = metadata.totalCols * (seatSize + gap);
  const totalHeight = metadata.totalRows * (seatSize + gap);

  // Derive rooms from seats with roomNo (for deck 5)
  const roomGroups = {};
  seats.forEach(seat => {
    if (seat.roomNo !== undefined) {
      if (!roomGroups[seat.roomNo]) roomGroups[seat.roomNo] = [];
      roomGroups[seat.roomNo].push(seat);
    }
  });
  const rooms = Object.entries(roomGroups).map(([roomNo, roomSeats]) => {
    const rows = roomSeats.map(s => s.row);
    const cols = roomSeats.map(s => s.col);
    return {
      id: roomNo,
      startRow: Math.min(...rows),
      endRow: Math.max(...rows),
      startCol: Math.min(...cols),
      endCol: Math.max(...cols),
    };
  });

  return (
    <div
      style={{
        width: "100%",
        minWidth: "500px",
        position: "relative",
      }}
      className={cn(containerClass)}
      ref={containerRef}
    >
      <svg
        viewBox={`0 0 ${totalWidth} ${totalHeight + 40}`}
        width={totalWidth}
        height={totalHeight + 40}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Zones */}
        {zones?.map((zone) => (
          <Zone key={zone.id} zone={zone} seatSize={seatSize} gap={gap} />
        ))}

        {/* Seats */}
        {seats.map((seat) => (
          <Seat
            deck={deck}
            key={seat.id}
            seat={seat}
            isSelected={selectedSeat === seat.id}
            onSelect={handleSelect}
            seatSize={seatSize}
            gap={gap}
            ship={ship}
          />
        ))}

        {/* Rooms (derived from seats with roomNo) deck !== "first"  */}
        { deck !== "first" &&  rooms.map((room) => (
          <Room key={room.id} room={room} seatSize={seatSize} gap={gap} />
        ))}
      </svg>
      {selectedSeatObj && (
        <div style={infoBoxStyle}>
          <div style={{ display:'flex', justifyContent:'space-between', fontWeight: 500, fontSize: '16px', marginBottom: 8, color:'#00A7C5', borderBottom:'1px solid #E6EAED', paddingBottom:'8px' }}>
            <span>{selectedSeatObj?.roomNo} - {selectedSeatObj?.class} | {selectedSeatObj?.type}</span>
            <span style={{cursor:'pointer'}} onClick={() => setSelectedSeat(null)}>&#x2715;</span>
          </div>
          <div style={{fontSize:'16px', fontWeight:'600',color:'#004D5B'}}>
            <div>
              Passenger Name
            </div>
            <span style={{marginTop:'10px', display:'flex', alignItems:'center', gap:'10px', fontWeight:'500'}}>
              <input type="checkbox" onChange={() => handlePassengerSelect("Arrav", selectedSeat)} style={{width:'20px', height:'20px'}} />
              <span>Arrav Nair</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatMap; 