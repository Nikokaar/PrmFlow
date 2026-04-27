import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

export function Dashboard() {
  const [employees, setEmployees] = useState([]);

  // Avustettavien ssr-koodit, joita käytetään lentojen erityisavustustarpeiden merkitsemiseen
  const ssrCodes = [
    "WCHR",
    "WCHS",
    "WCHC",
    "BLND",
    "DEAF",
    "DPNA"
  ];

  // Lentojen tilat
  const [arrivalFlights, setArrivalFlights] = useState([]);
  const [departureFlights, setDepartureFlights] = useState([]);

  // Dialogien tilat
  const [openArrivalDialog, setOpenArrivalDialog] = useState(false);
  const [openDepartureDialog, setOpenDepartureDialog] = useState(false);
  const [arrivalSSR, setArrivalSSR] = useState("");
  const [departureSSR, setDepartureSSR] = useState("");

  // Lomakekenttien tilat
  const [arrivalFlight, setArrivalFlight] = useState("");
  const [arrivalName, setArrivalName] = useState("");

  const [departureFlight, setDepartureFlight] = useState("");
  const [departureName, setDepartureName] = useState("");

  const [arrivalAssists, setArrivalAssists] = useState([]);
  const [departureAssists, setDepartureAssists] = useState([]);

  // Haetaan saapuvat ja lähtevät lennot backendistä, kun dialogit avataan
  useEffect(() => {
    if (openArrivalDialog) {
      fetch("http://localhost:8080/api/flights?airport=HEL&type=arrival")
        .then(res => res.json())
        .then(data => setArrivalFlights(data));
    }
  }, [openArrivalDialog]);

  useEffect(() => {
    if (openDepartureDialog) {
      fetch("http://localhost:8080/api/flights?airport=HEL&type=departure")
        .then(res => res.json())
        .then(data => setDepartureFlights(data));
    }
  }, [openDepartureDialog]);
  // Haetaan työntekijät backendistä
  useEffect(() => {
    fetch("http://localhost:8080/api/employees/on-duty")
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);

  // Lisää saapuva avustettava
  const handleAddArrival = () => {
    const newItem = {
      id: crypto.randomUUID(),
      flightNumber: arrivalFlight,
      passengerName: arrivalName,
      ssr: arrivalSSR
    };

    setArrivalAssists(prev => [...prev, newItem]);

    setOpenArrivalDialog(false);
    setArrivalFlight("");
    setArrivalName("");
  };

  // Lisää lähtevä avustettava
  const handleAddDeparture = () => {
    const newItem = {
      id: crypto.randomUUID(),
      flightNumber: departureFlight,
      passengerName: departureName,
      ssr: departureSSR
    };

    setDepartureAssists(prev => [...prev, newItem]);

    setOpenDepartureDialog(false);
    setDepartureFlight("");
    setDepartureName("");
  };

  return (
    <Grid container spacing={3}>

      {/* Vuorossa olevat työntekijät */}
      <Grid item xs={12} md={4} sx={{ display: "flex" }}>
        <Card sx={{ flex: 1, minHeight: 250 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Vuorossa olevat työntekijät
            </Typography>

            <List>
              {employees.map(emp => (
                <ListItem key={emp.id}>
                  {emp.name} — {emp.role}
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>

      {/* Saapuvat avustettavat */}
      <Grid item xs={12} md={4} sx={{ display: "flex" }}>
        <Card sx={{ flex: 1, minHeight: 250 }}>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              Saapuvat avustettavat
              <IconButton color="primary" onClick={() => setOpenArrivalDialog(true)}>
                <AddIcon />
              </IconButton>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              <List>
                {arrivalAssists.map(item => (
                  <ListItem key={item.id}>
                    {item.flightNumber} — {item.passengerName} ({item.ssr} - Gate {item.gate})
                  </ListItem>
                ))}
              </List>
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Lähtevät avustettavat */}
      <Grid item xs={12} md={4} sx={{ display: "flex" }}>
        <Card sx={{ flex: 1, minHeight: 250 }}>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              Lähtevät avustettavat
              <IconButton color="primary" onClick={() => setOpenDepartureDialog(true)}>
                <AddIcon />
              </IconButton>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              <List>
                {departureAssists.map(item => (
                  <ListItem key={item.id}>
                    {item.flightNumber} — {item.passengerName} ({item.ssr} - Gate {item.gate})
                  </ListItem>
                ))}
              </List>
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Saapuvat dialogi */}
      <Dialog open={openArrivalDialog} onClose={() => setOpenArrivalDialog(false)}>
        <DialogTitle>Lisää saapuva avustettava lento</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Lennon numero</InputLabel>
            <Select
              value={arrivalFlight}
              label="Lennon numero"
              onChange={(e) => setArrivalFlight(e.target.value)}
            >
              {arrivalFlights.map(f => (
                <MenuItem key={f.flightNumber} value={f.flightNumber}>
                  {f.flightNumber} — {f.destinationName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Avustettavan nimi"
            fullWidth
            value={arrivalName}
            onChange={e => setArrivalName(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>SSR-koodi</InputLabel>
            <Select
              value={arrivalSSR}
              label="SSR-koodi"
              onChange={(e) => setArrivalSSR(e.target.value)}
            >
              {ssrCodes.map(code => (
                <MenuItem key={code} value={code}>{code}</MenuItem>
              ))}
            </Select>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenArrivalDialog(false)}>Peruuta</Button>
          <Button variant="contained" onClick={handleAddArrival}>Lisää</Button>
        </DialogActions>
      </Dialog>

      {/* Lähtevät dialogi */}
      <Dialog open={openDepartureDialog} onClose={() => setOpenDepartureDialog(false)}>
        <DialogTitle>Lisää lähtevä avustettava lento</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Lennon numero</InputLabel>
            <Select
              value={departureFlight}
              label="Lennon numero"
              onChange={(e) => setDepartureFlight(e.target.value)}
            >
              {departureFlights.map(f => (
                <MenuItem key={f.flightNumber} value={f.flightNumber}>
                  {f.flightNumber} — {f.destinationName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Avustettavan nimi"
            fullWidth
            value={departureName}
            onChange={e => setDepartureName(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>SSR-koodi</InputLabel>
            <Select
              value={departureSSR}
              label="SSR-koodi"
              onChange={(e) => setDepartureSSR(e.target.value)}
            >
              {ssrCodes.map(code => (
                <MenuItem key={code} value={code}>{code}</MenuItem>
              ))}
            </Select>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDepartureDialog(false)}>Peruuta</Button>
          <Button variant="contained" onClick={handleAddDeparture}>Lisää</Button>
        </DialogActions>
      </Dialog>

    </Grid>
  );
}
