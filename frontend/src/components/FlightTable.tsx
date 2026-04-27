import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer } from "@mui/material";

export interface FlightDto {
  flightNumber: string;
  scheduledTime: string;
  destination: string;
  destinationName: string;
  airline: string;
  type: string;
}

export function FlightTable({ flights }: { flights: FlightDto[] }) {
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table sx={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell>Flight</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Airline</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flights.map((f, i) => (
            <TableRow key={i}>
              <TableCell>{f.flightNumber}</TableCell>
              <TableCell>
                {new Date(f.scheduledTime).toLocaleTimeString("fi-FI", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell>
                {f.destination} — {f.destinationName}
              </TableCell>
              <TableCell>{f.airline}</TableCell>
              <TableCell>{f.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
