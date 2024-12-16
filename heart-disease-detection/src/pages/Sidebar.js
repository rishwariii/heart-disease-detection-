import React from "react";
import { Drawer, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 

const SidebarComponent = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <IconButton edge="start" color="inherit" onClick={handleBack} sx={{ padding: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <List>
        <ListItem button>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Dashboard" />
        </ListItem>
        {/* Add more items as needed */}
      </List>
    </Drawer>
  );
};

export default SidebarComponent;
