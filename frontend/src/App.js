import './App.css';
import React, { useState, useRef } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [response, setResponse] = useState("");
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setResponse("❌ Bitte zuerst ein Bild auswählen.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/upload/", formData);
      const filename = res.data.filename;
      const uploadedUrl = `http://localhost:8000/uploads/${filename}`;
      setResponse(`✅ Upload erfolgreich: ${filename}`);
      setPreviewUrl(uploadedUrl); // Zeige jetzt das Bild vom Backend!
    } catch (err) {
      console.error(err);
      setResponse("❌ Upload fehlgeschlagen");
    }
  };

  return (
    <div className='App-header'>
      <h1>Test</h1>
      <p>Here you can upload your picture</p>

      {previewUrl && (
        <div style={{ marginTop: '20px' }}>
          <img
            src={previewUrl}
            alt="Preview"
            style={{ maxWidth: '300px', borderRadius: '8px' }}
          />
        </div>
      )}

      <button onClick={handleClick} style={{ marginTop: '20px' }}>
        Bild auswählen
      </button>

      <button onClick={handleUpload} disabled={!file} style={{ marginTop: '10px' }}>
        Hochladen
      </button>

      <p>{response}</p>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default App;
