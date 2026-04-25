import { useEffect, useState } from "react";
import { FlightTable, type FlightDto } from "./FlightTable";
import { Typography } from "@mui/material";

export function Arrivals() {
  const [flights, setFlights] = useState<FlightDto[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/flights?airport=HEL&type=arrival")
      .then((res) => res.json())
      .then((data) => setFlights(data));
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>Saapuvat</Typography>
      <FlightTable flights={flights} />
    </>
  );
}
