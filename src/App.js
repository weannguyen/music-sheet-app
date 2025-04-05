import React, { useState } from 'react';
import axios from 'axios';
import MusicSheetViewer from './MusicSheetViewer';

function App() {
  const [musicXmlBlob, setMusicXmlBlob] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://music-ai-backend-demo-1.onrender.com/generate-sheet/",
        { responseType: "blob" }
      );
      setMusicXmlBlob(res.data);
    } catch (error) {
      console.error("Error generating sheet:", error);
      alert("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>AI Music Sheet Generator</h2>
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate & Preview Sheet"}
      </button>

      {musicXmlBlob && <MusicSheetViewer musicXmlBlob={musicXmlBlob} />}
    </div>
  );
}

export default App;