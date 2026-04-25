import { useState } from "react";
import { AppBar, Tabs, Tab, Box, Toolbar, Typography } from "@mui/material";
import { Arrivals } from "./components/Arrivals";
import { Departures } from "./components/Departures";
import { Dashboard } from "./components/DashBoard";

function App() {
  const [tab, setTab] = useState(0);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Flight Info</Typography>
        </Toolbar>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
          <Tab label="Saapuvat" />
          <Tab label="Lähtevät" />
          <Tab label="Dashboard" />
        </Tabs>
      </AppBar>

      <Box sx={{ p: 3 }}>
        {tab === 0 && <Arrivals />}
        {tab === 1 && <Departures />}
        {tab === 2 && <Dashboard />}
      </Box>
    </>
  );
}

export default App;
