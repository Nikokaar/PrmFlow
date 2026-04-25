import { useEffect, useState } from "react";
import { FlightTable, type FlightDto } from "./FlightTable";
import { Typography } from "@mui/material";

export function Departures() {
  const [flights, setFlights] = useState<FlightDto[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/flights?airport=HEL&type=departure")
      .then((res) => res.json())
      .then((data) => setFlights(data));
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>Lähtevät</Typography>
      <FlightTable flights={flights} />
    </>
  );
}
