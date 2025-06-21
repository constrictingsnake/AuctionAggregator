import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Footer from "./components/Footer";
import { Box } from "@mui/material";

const App = () => {
  return (
    <Router>
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box component="main" flexGrow={1} p={2}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
    </Router>
  );
}

export default App;