import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  CircularProgress,
  Card,
  Typography,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import {
  getPatientById,
  createECGPrediction,
  getECGPredictionById,
  deleteECGPrediction,
} from "../services/apiService";

const PredictionPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [patientInfo, setPatientInfo] = useState(null);
  const [error, setError] = useState(null);
  const [predictionExists, setPredictionExists] = useState(false);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null); // For resetting file input

  const { patientId } = useParams();

  // Fetch patient details and prediction
  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await getPatientById(patientId);
        setPatientInfo(response.data);
      } catch (err) {
        console.error("Error fetching patient details:", err);
        setError("Failed to fetch patient details.");
      }
    };

    const fetchPrediction = async () => {
      try {
        const response = await getECGPredictionById(patientId);
        if (response.data) {
          setPredictionResult(response.data);
          setPredictionExists(true);
        }
      } catch (err) {
        if (err.response?.status === 404) {
          console.log("No existing prediction found.");
        } else {
          console.error("Error fetching prediction:", err);
        }
      }
    };

    fetchPatientInfo();
    fetchPrediction();
  }, [patientId]);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size < 20 * 1024) {
        setFileError("File size must be greater than 20KB.");
        setFile(null);
      } else {
        setFile(selectedFile);
        setFileError("");
      }
    }
  };

  // Discard the selected file
  const handleDiscard = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
  };

  // Handle the file upload and prediction request
  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
  
    const formData = new FormData();
    formData.append("patient", patientId); // Add patient ID as a form field
    formData.append("ecg_image", file); // Append the file directly to formData
  
    try {
      setLoading(true);
      const response = await createECGPrediction(formData); // Send formData directly
      setPredictionResult(response.data);
      setPredictionExists(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Prediction failed. Try again.");
    } finally {
      setLoading(false);
    }
  };
  
  

  // Handle deleting the prediction
  const handleDeletePrediction = async () => {
    try {
      await deleteECGPrediction(predictionResult.id);
      setPredictionResult(null);
      setPredictionExists(false);
      alert("Prediction deleted successfully.");
    } catch (error) {
      console.error("Error deleting prediction:", error);
      alert("Failed to delete the prediction.");
    }
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div style={{ textAlign: "center", margin: "20px auto", width: "65%" }}>
      {patientInfo && (
        <Card sx={{ marginBottom: 4, padding: 3 }}>
          <Typography variant="h5">Patient Information</Typography>
          <Typography variant="body1">
            Name: {patientInfo.first_name} {patientInfo.last_name}
          </Typography>
        </Card>
      )}

      {!predictionExists ? (
        <Box
          sx={{
            border: "2px dashed #ccc",
            padding: 3,
            borderRadius: 2,
            textAlign: "center",
            backgroundColor: "#f9f9f9",
            marginBottom: 3,
          }}
        >
          {file ? (
            <Box>
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: 200, marginBottom: 16 }}
              />
              <Box>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleDiscard}
                >
                  Discard Image
                </Button>
              </Box>
            </Box>
          ) : (
            <Typography>Select an image file for prediction</Typography>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: 16 }}
          />
          {fileError && (
            <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
              {fileError}
            </Typography>
          )}
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!file || loading}
            sx={{ marginTop: 2, backgroundColor: "#00796b", color: "#fff" }}
          >
            {loading ? <CircularProgress size={24} /> : "Upload & Predict"}
          </Button>
        </Box>
      ) : (
        <Card sx={{ marginTop: 4, padding: 3 }}>
          <Typography variant="h5">Prediction Results</Typography>
          <Typography variant="body1">
            Prediction Result: {predictionResult.prediction_result}
          </Typography>
          <Typography variant="body1">
            Confidence: {predictionResult.softmax_outputs?.confidence || "N/A"}%
          </Typography>
          <Divider sx={{ marginY: 2 }} />
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeletePrediction}
              startIcon={<DeleteIcon />}
            >
              Delete Prediction
            </Button>
          </Box>
        </Card>
      )}
    </div>
  );
};

export default PredictionPage;
