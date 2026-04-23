import { useEffect, useState } from "react";

// Määritellään FlightDto-tyyppi backendin JSON-rakenteen mukaan
interface FlightDto {
  flightNumber: string;
  scheduledTime: string;
  airport: string;
  airline: string;
  type: string;
}

function App() {
  const [flights, setFlights] = useState<FlightDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/flights?airport=HEL&type=arrival")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Backend returned an error");
        }
        return res.json();
      })
      .then((data: FlightDto[]) => {
        setFlights(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Ladataan...</p>;
  if (error) return <p>Virhe: {error}</p>;

  return (
    <div>
      <h1>Lennot</h1>
      <table>
        <thead>
          <tr>
            <th>Flight</th>
            <th>Time</th>
            <th>Airport</th>
            <th>Airline</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((f, i) => (
            <tr key={i}>
              <td>{f.flightNumber}</td>
              <td>{f.scheduledTime}</td>
              <td>{f.airport}</td>
              <td>{f.airline}</td>
              <td>{f.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
