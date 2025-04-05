import React, { useEffect, useRef } from 'react';

const MusicSheetViewer = ({ musicXmlBlob }) => {
  const containerRef = useRef();

  useEffect(() => {
    if (!musicXmlBlob) return;

    const waitForVerovio = () => {
      if (!window.verovio || !window.verovio.toolkit) {
        setTimeout(waitForVerovio, 100);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const xmlContent = reader.result;
        const tk = new window.verovio.toolkit();
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
    };

    waitForVerovio();
  }, [musicXmlBlob]);

  return (
    <div>
      <h3>Music Sheet Preview:</h3>
      <div ref={containerRef} style={{ overflowX: 'auto', background: '#fff' }} />
    </div>
  );
};

export default MusicSheetViewer;