import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../services/apiService"; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Importing ArrowBackIcon

const AppBarComponent = ({ username }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  // Disable back button if the current page is login
  const disableBackButton = location.pathname === "/login";

  const handleLogout = async () => {
    try {
      await logout(); // Backend function to destroy session (e.g., clear cookies)
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleBack = () => {
    if (!disableBackButton) {
      navigate(-1); // This will navigate to the previous page in history
    }
  };

  // Open the logout confirmation dialog
  const openDialog = () => {
    setOpenLogoutDialog(true);
  };

  // Close the logout confirmation dialog
  const closeDialog = () => {
    setOpenLogoutDialog(false);
  };

  return (
    <>
      <AppBar position="static" color="primary" sx={{ boxShadow: 4, padding: '10px 20px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Back Button */}
          <IconButton edge="start" color="inherit" onClick={handleBack} sx={{ mr: 2 }} disabled={disableBackButton}>
            <ArrowBackIcon /> {/* Back icon */}
          </IconButton>

          {/* Title */}
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#ffffff' }}>
            Heart Disease Detection
          </Typography>

          {/* Username */}
          <Typography variant="body1" sx={{ marginRight: 2, fontWeight: 'medium', color: '#ffffff' }}>
            Welcome, {username}
          </Typography>

          {/* Logout Button */}
          <Button
            variant="outlined"
            color="secondary"
            onClick={openDialog} // Open logout confirmation dialog
            sx={{ borderRadius: 2, padding: '6px 16px', fontWeight: 'bold', boxShadow: 2 }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openLogoutDialog} onClose={closeDialog}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          Are you sure you want to logout?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="secondary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AppBarComponent;
