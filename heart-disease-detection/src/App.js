import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';  // Should be default import
import LoginPage from './pages/LoginPage';  // Should be default import

const theme = createTheme({
  palette: {
    primary: {
      main: "#00796b", // Teal color for the medical theme
    },
    secondary: {
      main: "#ffb74d", // Light orange accent
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  </ThemeProvider>
);

export default App;
