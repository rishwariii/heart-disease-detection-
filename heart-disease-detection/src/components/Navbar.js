import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  // const navigate = useNavigate();

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Heart Disease Detection
        </Typography>
        {/* <Button color="secondary" onClick={onLogout}>Logout</Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
