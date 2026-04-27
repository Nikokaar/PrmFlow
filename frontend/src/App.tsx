import { useState } from "react";
import { AppBar, Tabs, Tab, Box, Toolbar, Typography } from "@mui/material";
import { Arrivals } from "./components/Arrivals";
import { Departures } from "./components/Departures";
import { Dashboard } from "./components/Dashboard";

function App() {
  const [tab, setTab] = useState(0);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">PrmFlow</Typography>
        </Toolbar>

        <Tabs
          value={tab}
          onChange={(_, newValue) => setTab(newValue)}
          variant="fullWidth"
          textColor="inherit"
          indicatorColor="secondary"
          >
          <Tab label="Dashboard" />
          <Tab label="Arrivals" />
          <Tab label="Departures" />
        </Tabs>
      </AppBar>

      <Box sx={{ p: 3 }}>
        {tab === 0 && <Dashboard />}
        {tab === 1 && <Arrivals />}
        {tab === 2 && <Departures />}
      </Box>
    </>
  );
}

export default App;
