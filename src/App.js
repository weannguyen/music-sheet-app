import React, { useState } from 'react';
import axios from 'axios';
import MusicSheetViewer from './MusicSheetViewer';

function App() {
  const [file, setFile] = useState(null);
  const [musicXmlBlob, setMusicXmlBlob] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(
      "https://music-ai-backend-zbvf.onrender.com/upload-audio/",
      formData,
      { responseType: "blob" }
    );

    setMusicXmlBlob(res.data);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>AI Music Sheet Generator</h2>
      <input type="file" accept=".mp3,.wav" onChange={e => setFile(e.target.files[0])} />
      <br /><br />
      <button onClick={handleUpload}>Generate & Preview Sheet</button>

      {musicXmlBlob && <MusicSheetViewer musicXmlBlob={musicXmlBlob} />}
    </div>
  );
}

export default App;
