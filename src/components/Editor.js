{selectedLayer && (
  <div className="controls">
    <div className="slidecontainer">
      <div className="slider-label">
        <span>Boyut</span>
        <span className="slider-value">{Math.round(selectedLayer.scaleX * 100)}%</span>
      </div>
      <input
        type="range"
        min="10"
        max="200"
        value={selectedLayer.scaleX * 100}
        onChange={(e) => {
          const scale = e.target.value / 100;
          selectedLayer.scaleX(scale);
          selectedLayer.scaleY(scale);
          layer.batchDraw();
        }}
        className="slider"
      />
    </div>

    <div className="slidecontainer">
      <div className="slider-label">
        <span>Rotasyon</span>
        <span className="slider-value">{Math.round(selectedLayer.rotation)}°</span>
      </div>
      <input
        type="range"
        min="0"
        max="360"
        value={selectedLayer.rotation}
        onChange={(e) => {
          selectedLayer.rotation(e.target.value);
          layer.batchDraw();
        }}
        className="slider"
      />
    </div>
  </div>
)}

<div className="button-group">
  <button onClick={handleReset} className="reset-button">
    Reset All
  </button>
  <div style={{
    position: "absolute",
    top: 24,
    left: 0,
    width: "100%",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pointerEvents: "none"
  }}>
    <div style={{
      fontFamily: "'This Cafe', 'Arial', sans-serif",
      fontSize: "1.2em",
      color: "#39FF14",
      textAlign: "center",
      fontWeight: "400",
      textShadow: "0 0 10px rgba(57, 255, 20, 0.5)",
      pointerEvents: "auto"
    }}>
      Contract: 7bY6WtXPgNjNMpsURCKeRgYXSXUsssB3T5cuFp2jpump
    </div>
    <div style={{
      fontFamily: "'This Cafe', 'Arial', sans-serif",
      fontSize: "2em",
      color: "#39FF14",
      marginTop: "8px",
      textAlign: "center",
      fontWeight: "400",
      textShadow: "0 0 10px rgba(57, 255, 20, 0.5)",
      pointerEvents: "auto"
    }}>
      7bY6WtXPgNjNMpsURCKeRgYXSXUsssB3T5cuFp2jpump
    </div>
  </div>
</div> 