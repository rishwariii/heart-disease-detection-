import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Container, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Create a custom theme for the login page
const theme = createTheme({
  palette: {
    primary: {
      main: '#00796b', // Teal color
    },
    secondary: {
      main: '#ffb74d', // Light orange accent color
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif", // Clean and modern font
  },
});

const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Simple email format validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Simple authentication check (you can replace this with actual backend logic)
    setIsAuthenticated(true);
    navigate('/'); // Navigate to home page after successful login
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundImage: 'url("https://media.licdn.com/dms/image/v2/D5612AQHe7vRE3UNj0w/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1693010842632?e=2147483647&v=beta&t=m5xNrVPUQ2bP2N2fKTNe69R2EDxTFs-syAr2i0JuwTE")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay to improve readability
          }}
        />
        <Container maxWidth="xs" sx={{ zIndex: 1, position: 'relative' }}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h4" color="primary" gutterBottom align="center">
              Login
            </Typography>

            {/* Display error message if validation fails */}
            {error && (
              <Typography variant="body2" color="error" sx={{ mb: 2 }} align="center">
                {error}
              </Typography>
            )}

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              sx={{ mb: 2 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Login
            </Button>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
