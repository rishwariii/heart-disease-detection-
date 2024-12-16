import React from "react";
import { Typography, Button, Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#00796b", // Teal
    },
    secondary: {
      main: "#ffb74d", // Light orange
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

const HeroLandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundImage:
            'url("https://www.nm.org/-/media/northwestern/healthbeat/images/health%20library/nm-ten-signs-cardiologist_feature.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Overlay for improved text visibility */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay
            zIndex: 1,
          }}
        />

        <Container
          maxWidth="md"
          sx={{
            zIndex: 2,
            color: "white",
            textShadow: "0px 4px 6px rgba(0, 0, 0, 0.8)",
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Welcome to HealthEase
          </Typography>
          <Typography variant="h5" gutterBottom>
            Your trusted companion for smarter, healthier living.
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Explore expert resources, track your medical insights, and connect
            with professionals to take control of your health.
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1rem",
              ":hover": {
                backgroundColor: "#ffa726", // Slightly darker orange
              },
            }}
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default HeroLandingPage;
