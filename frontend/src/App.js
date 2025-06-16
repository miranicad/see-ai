import './App.css';
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [response, setResponse] = useState("");

  return (
    <div className='App-header'>
        <h1>Test</h1>
        <p>Here you can upload your picture</p>
        <button>
          <label htmlFor="file-upload" className="custom-file-upload">
            Upload Picture
          </label>
          <input id="file-upload" type="file" accept="image/*" style={{ display: 'none' }} />
        </button>

    </div>
  );
}

export default App;
