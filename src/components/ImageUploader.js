<div className="upload-container">
  <div className="upload-area" onDragOver={handleDragOver} onDrop={handleDrop}>
    <div className="upload-content">
      <div className="upload-icon">📸</div>
      <div className="upload-text" style={{ fontFamily: "'This Cafe', sans-serif" }}>
        UPLOAD YOUR CAT'S PHOTO HERE
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="fileInput"
      />
      <label htmlFor="fileInput" className="upload-button" style={{ fontFamily: "'This Cafe', sans-serif" }}>
        Choose File
      </label>
    </div>
  </div>
</div> 