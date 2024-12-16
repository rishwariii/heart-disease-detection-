import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
  IconButton
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { motion } from "framer-motion";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { getPatients, createPatient, updatePatient, deletePatient } from "../services/apiService"; 
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const PatientsListPage = () => {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPatient, setNewPatient] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: null,
    email: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);  // State to handle loading
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editPatient, setEditPatient] = useState({
first_name: "",
  last_name: "",
date_of_birth: ""});


  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);  // Set loading to true while fetching
        const response = await getPatients();
        setPatients(response.data);
        setLoading(false);  // Set loading to false after fetching data
      } catch (err) {
        setLoading(false);  // Set loading to false in case of an error
        console.error("Error fetching patients:", err);
      }
    };
    fetchPatients();
  }, []);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleGetPrediction = (patientId) => {
    navigate(`/prediction/${patientId}`);
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewPatient({ first_name: "", last_name: "", date_of_birth: null, email: "" });
  };

  const handleOpenEditDialog = (patient) => {
    setSelectedPatient(patient);
    setEditDialog(true);
    setEditPatient({
      id: patient.id,
      first_name: patient.first_name,
      last_name: patient.last_name,
      date_of_birth: patient.date_of_birth,
    });
  };

  const handleCloseEditDialog = () => setEditDialog(false);

  const handleOpenDeleteDialog = (patient) => {
    setSelectedPatient(patient);
    setDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => setDeleteDialog(false);

  const handleDeletePatient = async () => {
    try {
      await deletePatient(selectedPatient.id);
      setSuccess(true);
      handleCloseDeleteDialog();
      const response = await getPatients();
      setPatients(response.data);
    } catch (err) {
      setError("Failed to delete patient. Please try again.");
      console.error(err);
    }
  };

  const handleInputChange = (field, value) => {
    setNewPatient((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdatePatient = async () => {
    const { id, first_name, last_name, date_of_birth } = editPatient;

    console.log("edit patient",editPatient);
  
    if (!first_name || !last_name || !date_of_birth) {
      setError("All fields are required.");
      return;
    }
  
    const payload = {
      first_name,
      last_name,
      date_of_birth: dayjs(date_of_birth).format("YYYY-MM-DD"),
    };
  
    try {
      // Use the updated updatePatient function with the id and payload
      await updatePatient(id, payload);
  
      setSuccess(true);
      handleCloseEditDialog();
  
      // Refresh the patients list
      const response = await getPatients();
      setPatients(response.data);
    } catch (err) {
      setError("Failed to update patient. Please try again.");
      console.error(err);
    }
  };
  
  
  
  

  const handleAddPatient = async () => {
    const { first_name, last_name, date_of_birth, email } = newPatient;

    if (!first_name || !last_name || !date_of_birth || !email) {
      setError("All fields are required.");
      return;
    }

    if (dayjs(date_of_birth).isAfter(dayjs())) {
      setError("Date of birth cannot be in the future.");
      return;
    }

    try {
      await createPatient({
        first_name,
        last_name,
        date_of_birth: dayjs(date_of_birth).format("YYYY-MM-DD"),
        email,
      });

      setSuccess(true);
      handleCloseDialog();

      const response = await getPatients();
      setPatients(response.data);
    } catch (err) {
      setError("Failed to add patient. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            margin: "20px auto",
            width: "65%",
            borderRadius: "10px", // Rounded edges
            boxShadow: 5, // Shadow effect
          }}
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Typography variant="h4" gutterBottom>
              Patients List
            </Typography>
          </motion.div>

          <Button
            variant="contained"
            color="primary"
            sx={{ marginBottom: 2 }}
            onClick={handleOpenDialog}
          >
            Add Patient
          </Button>

          <TableContainer component={Paper} sx={{ width: "100%", boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "15%" }}>First Name</TableCell>
                  <TableCell sx={{ width: "15%" }}>Last Name</TableCell>
                  <TableCell sx={{ width: "20%" }}>Date of Birth</TableCell>
                  <TableCell sx={{ width: "30%" }} align="right">Prediction</TableCell>
                  <TableCell sx={{ width: "20%" }} align="right">Actions</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : (
                  patients
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell>{patient.first_name}</TableCell>
                        <TableCell>{patient.last_name}</TableCell>
                        <TableCell>{dayjs(patient.date_of_birth).format("MM/DD/YYYY")}</TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleGetPrediction(patient.id)} // Pass the patient ID
                            >
                            Get Prediction
                          </Button>
                        </TableCell>

                        <TableCell align="right">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenEditDialog(patient)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleOpenDeleteDialog(patient)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                        
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={patients.length}
              page={page}
              onPageChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </TableContainer>
{/* Edit Patient Dialog */}
{/* Edit Patient Dialog */}
{/* Edit Patient Dialog */}
<Dialog open={editDialog} onClose={handleCloseEditDialog}>
  <DialogTitle>Edit Patient</DialogTitle>
  <DialogContent>
    <TextField
      label="First Name"
      fullWidth
      margin="normal"
      value={editPatient.first_name}
      onChange={(e) => setEditPatient({ ...editPatient, first_name: e.target.value })}
    />
    <TextField
      label="Last Name"
      fullWidth
      margin="normal"
      value={editPatient.last_name}
      onChange={(e) => setEditPatient({ ...editPatient, last_name: e.target.value })}
    />
 <DatePicker
  label="Date of Birth"
  value={editPatient.date_of_birth ? dayjs(editPatient.date_of_birth) : null} // Ensure valid date
  onChange={(newValue) => setEditPatient({ ...editPatient, date_of_birth: newValue })}
  maxDate={dayjs()} // Ensure no date beyond the current date
  renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
/>

  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseEditDialog} color="error">
      Cancel
    </Button>
    <Button variant="contained" color="primary" onClick={handleUpdatePatient}>
      Save
    </Button>
  </DialogActions>
</Dialog>



        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this patient?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeletePatient} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            sx={{
              '& .MuiDialog-paper': {
                borderRadius: 3,
                boxShadow: 5,
                // backgroundColor: '#424242', // Darker background
              },
            }}
          >
            <DialogTitle>Add New Patient</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                margin="normal"
                value={newPatient.first_name}
                onChange={(e) => handleInputChange("first_name", e.target.value)}
              />
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                margin="normal"
                value={newPatient.last_name}
                onChange={(e) => handleInputChange("last_name", e.target.value)}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                value={newPatient.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                type="email"
              />
              <DatePicker
                label="Date of Birth"
                value={newPatient.date_of_birth}
                onChange={(date) => handleInputChange("date_of_birth", date)}
                disableFuture
                renderInput={(props) => <TextField {...props} fullWidth margin="normal" />}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="error">
                Cancel
              </Button>
              <Button onClick={handleAddPatient} variant="contained" color="primary">
                Add Patient
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={!!error}
            autoHideDuration={4000}
            onClose={() => setError("")}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert severity="error">{error}</Alert>
          </Snackbar>

          <Snackbar
            open={success}
            autoHideDuration={4000}
            onClose={() => setSuccess(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert severity="success">Patient added successfully!</Alert>
          </Snackbar>
        </Paper>
      </LocalizationProvider>
    </>
  );
};

export default PatientsListPage;
