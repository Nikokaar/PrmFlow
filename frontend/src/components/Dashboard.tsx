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
  TextField
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

export function Dashboard() {
  const [employees, setEmployees] = useState([]);

  // Dialogien tilat
  const [openArrivalDialog, setOpenArrivalDialog] = useState(false);
  const [openDepartureDialog, setOpenDepartureDialog] = useState(false);

  // Lomakekenttien tilat
  const [arrivalFlight, setArrivalFlight] = useState("");
  const [arrivalName, setArrivalName] = useState("");

  const [departureFlight, setDepartureFlight] = useState("");
  const [departureName, setDepartureName] = useState("");

  const [arrivalAssists, setArrivalAssists] = useState([]);
  const [departureAssists, setDepartureAssists] = useState([]);

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
      passengerName: arrivalName
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
      passengerName: departureName
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
                    {item.flightNumber} — {item.passengerName}
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
                    {item.flightNumber} — {item.passengerName}
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
          <TextField
            label="Lennon numero"
            fullWidth
            value={arrivalFlight}
            onChange={e => setArrivalFlight(e.target.value)}
          />
          <TextField
            label="Avustettavan nimi"
            fullWidth
            value={arrivalName}
            onChange={e => setArrivalName(e.target.value)}
          />
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
          <TextField
            label="Lennon numero"
            fullWidth
            value={departureFlight}
            onChange={e => setDepartureFlight(e.target.value)}
          />
          <TextField
            label="Avustettavan nimi"
            fullWidth
            value={departureName}
            onChange={e => setDepartureName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDepartureDialog(false)}>Peruuta</Button>
          <Button variant="contained" onClick={handleAddDeparture}>Lisää</Button>
        </DialogActions>
      </Dialog>

    </Grid>
  );
}
