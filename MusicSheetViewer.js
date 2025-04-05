import React, { useEffect, useRef } from 'react';
import verovioToolkit from 'verovio';

const MusicSheetViewer = ({ musicXmlBlob }) => {
  const containerRef = useRef();

  useEffect(() => {
    if (!musicXmlBlob) return;

    const reader = new FileReader();
    reader.onload = () => {
      const xmlContent = reader.result;
      const tk = new verovioToolkit();
      tk.setOptions({
        pageHeight: 1000,
        pageWidth: 1200,
        scale: 50
      });
      tk.loadData(xmlContent);
      const svg = tk.renderToSVG(1, {});
      containerRef.current.innerHTML = svg;
    };

    reader.readAsText(musicXmlBlob);
  }, [musicXmlBlob]);

  return (
    <div>
      <h3>Music Sheet Preview:</h3>
      <div ref={containerRef} style={{ overflowX: 'auto', background: '#fff' }} />
    </div>
  );
};

export default MusicSheetViewer;