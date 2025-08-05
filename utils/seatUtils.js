const seatSize = 25
const gap = 15

export const markAvailability = (seats, bookedSeatIds) => {
  const bookedSet = new Set(bookedSeatIds)
  console.log("bookedSet", bookedSet)
  console.log("scbc", !bookedSet.has("seat-1-8"))
  return seats.map((seat) => ({
    ...seat,
    available: !bookedSet.has(seat.id),
  }))
}

export const generateSeatsFromConfig = (layoutConfig) => {
  const seats = []

  layoutConfig.seats.forEach((seat) => {
    // All seats are now individual seat objects with row and col properties
    seats.push({
      id: seat.id || `seat-${seat.row}-${seat.col}`,
      row: seat.row,
      col: seat.col,
      type: seat?.type,
      roomNo: seat?.roomNo,
      class: seat?.class,
    })
  })

  return seats
}

export const getZonesFromConfig = (layoutConfig) => layoutConfig.zones || []

export const getRoomsFromConfig = (layoutConfig) => layoutConfig?.rooms || []

export { seatSize, gap }
