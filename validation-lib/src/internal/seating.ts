export type SeatType = "window" | "aisle" | "middle" | "jump" ;
export function assertNever(value:never): never {
    throw new Error(`Unhandled case ${JSON.stringify(value)} `)
}
export const getSeatCost = (seat: SeatType) => {
  switch (seat) {
    case "aisle":
      return 100.23;
    case "middle":
      return 85.43;
    case "window":
      return 105.23;
    case "jump": 
        return 50;
    default:
       assertNever(seat);
  }
};
