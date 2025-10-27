import React, { useState } from "react";
import { Upload, FileText, Loader2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./LocalPDFUpload.css";

const LocalPDFUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Please select a valid PDF file");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Create FormData to send the file
      const formData = new FormData();
      formData.append("pdf", file);

      // Upload the file to the backend
      const response = await fetch("http://localhost:5001/upload-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload PDF");
      }

      const result = await response.json();
      console.log("PDF upload successful:", result);
      
      // Navigate to PDF viewer
      navigate("/pdf-viewer");
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="local-pdf-upload">
      <div className="upload-container">
        <div className="upload-header">
          <FileText size={48} className="upload-icon" />
          <h2>Upload Local PDF</h2>
          <p>Select a PDF file from your computer to analyze</p>
        </div>

        <div className="upload-area">
          <input
            type="file"
            id="pdf-upload"
            accept=".pdf"
            onChange={handleFileChange}
            className="file-input"
          />
          <label htmlFor="pdf-upload" className="file-label">
            <Upload size={24} />
            <span>{file ? file.name : "Choose PDF File"}</span>
          </label>
        </div>

        {error && (
          <div className="error-message">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="upload-btn"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="spinning" />
              Uploading...
            </>
          ) : (
            "Upload and Analyze"
          )}
        </button>
      </div>
    </div>
  );
};

export default LocalPDFUpload;
