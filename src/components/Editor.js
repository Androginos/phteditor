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