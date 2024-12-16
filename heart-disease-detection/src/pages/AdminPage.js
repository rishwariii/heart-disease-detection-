import React, { useEffect, useState } from "react";
import { getUsers, getPatients } from "../services/apiService";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, patientResponse] = await Promise.all([
          getUsers(),
          getPatients(),
        ]);
        setUsers(userResponse.data);
        setPatients(patientResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Paper elevation={3} style={{ marginBottom: "20px", padding: "20px" }}>
        <Typography variant="h5">Users</Typography>
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              <ListItemText primary={user.username} secondary={user.role} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5">Patients</Typography>
        <List>
          {patients.map((patient) => (
            <ListItem key={patient.id}>
              <ListItemText
                primary={`${patient.first_name} ${patient.last_name}`}
                secondary={`DOB: ${patient.date_of_birth}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default AdminPage;
