import React, { useState } from 'react';
import axios from 'axios';
import { Button, CircularProgress } from '@mui/material';

const FileUpload = ({ onResult }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');
    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/predict', formData);
      onResult(response.data); // Pass results to parent
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Prediction failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <Button variant="contained" onClick={handleUpload} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Upload & Predict'}
      </Button>
    </div>
  );
};

export default FileUpload;
