import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  Box,
  Grid,
  Snackbar,
  Alert,
  Card,
  CardMedia,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion"; // Importing framer-motion for animation
import ClearIcon from "@mui/icons-material/Clear"; // For discard button
import FavoriteIcon from "@mui/icons-material/Favorite"; // Heart icon
import UploadIcon from "@mui/icons-material/Upload"; // Upload icon

// Create a custom theme with more calming colors for a medical app
const theme = createTheme({
  palette: {
    primary: {
      main: "#00796b", // Teal - medical/calm color
    },
    secondary: {
      main: "#ffb74d", // Light orange accent color
    },
    background: {
      default: "#f2e8cf", // Updated background color
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif", // Clean font
  },
});

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile.size < 20480) {
      setError("The image is not suitable as it is low quality.");
      setOpenError(true);
      setFile(null);
      setPreview("");
      return;
    }
    setError("");
    setFile(uploadedFile);
    setPreview(URL.createObjectURL(uploadedFile));
  };

  const handleDiscardImage = () => {
    setFile(null);
    setPreview("");
  };

  const handlePrediction = () => {
    if (!file) {
      setError("Please upload a valid file.");
      setOpenError(true);
      return;
    }
    setError("");
    // Mock prediction
    setPrediction("Predicted Result: High Confidence");
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
    // Implement actual logout logic if needed
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  return (
    <ThemeProvider theme={theme}>
  <AppBar position="static" color="primary" sx={{ boxShadow: 4, padding: '10px 20px' }}>
  <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography 
      variant="h5" 
      sx={{ 
        flexGrow: 1, 
        fontWeight: 'bold', 
        color: '#ffffff' 
      }}
    >
      Heart Disease Detection
    </Typography>
    
    <Typography 
      variant="body1" 
      sx={{ 
        marginRight: 2, 
        fontWeight: 'medium', 
        color: '#ffffff',
      }}
    >
      Welcome, User
    </Typography>

    <Button 
      variant="outlined" 
      color="secondary" 
      onClick={handleLogout} 
      sx={{
        borderRadius: 2,
        padding: '6px 16px',
        fontWeight: 'bold',
        boxShadow: 2,
        '&:hover': {
          boxShadow: 4,
        },
      }}
    >
      Logout
    </Button>
  </Toolbar>
</AppBar>


      <Box
        sx={{
          background: "#f2e8cf", // Updated background color
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="md" sx={{ zIndex: 1, position: "relative" }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Paper
              elevation={10} // Increased shadow for prominence
              sx={{
                padding: 4,
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)", // Stronger shadow
                borderRadius: "12px", // Rounded corners
                backgroundColor: "#ffffff",
                border: "2px solid #00796b", // Border for prominence
              }}
            >
              <Typography variant="h4" color="primary" gutterBottom>
                Upload Your Image <FavoriteIcon sx={{ color: "#ffb74d" }} />
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Upload an image to get a prediction result. Ensure the file size is
                greater than 20KB.
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    fullWidth
                    startIcon={<UploadIcon />} // Adding an upload icon
                  >
                    Choose a File
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                </Grid>

                {preview && (
                  <Grid item xs={12}>
                    <Card sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={preview}
                        alt="Uploaded preview"
                      />
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                        onClick={handleDiscardImage}
                      >
                        <ClearIcon sx={{ color: "white" }} />
                      </IconButton>
                    </Card>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handlePrediction}
                  >
                    Get Prediction
                  </Button>
                </Grid>

                {prediction && (
                  <Grid item xs={12}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                    >
                      <Paper elevation={2} sx={{ padding: 2, textAlign: "center" }}>
                        <Typography variant="h6" color="secondary">
                          {prediction}
                        </Typography>
                      </Paper>
                    </motion.div>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </motion.div>
        </Container>
      </Box>

      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default HomePage;
