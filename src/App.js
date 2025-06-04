import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import OverlaySelector from "./OverlaySelector";
import ImageUploader from "./ImageUploader";
import ControlPanel from "./ControlPanel";

const THEMES = {
  light: {
    background: '#b2b2b2',
    panel: '#fff',
    panelShadow: '#b2b2b2',
    label: '#222',
  },
  dark: {
    background: '#23272e',
    panel: '#2d323b',
    panelShadow: '#111',
    label: '#fff',
  }
};

function App() {
  const [userImage, setUserImage] = useState(null);
  const [overlay, setOverlay] = useState(null);
  const [selected, setSelected] = useState(null);
  const [userProps, setUserProps] = useState(null);
  const [overlayProps, setOverlayProps] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Seçili item'ın props ve setProps'unu belirle
  let controlPanelProps = { props: { scaleX: 1, rotation: 0 }, setProps: () => {}, disabled: true };
  if (selected === 'user' && userProps) {
    controlPanelProps = { props: userProps, setProps: setUserProps, disabled: false };
  } else if (selected === 'overlay' && overlayProps) {
    controlPanelProps = { props: overlayProps, setProps: setOverlayProps, disabled: false };
  }

  const t = THEMES[theme];

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="app-container">
        <div className="left-panel">
          <ImageUploader setUserImage={setUserImage} />
          <OverlaySelector setOverlay={setOverlay} color={t.label} bg={theme === 'dark' ? '#23272e' : '#eee'} />
          <div style={{ marginTop: 24 }}>
            <ControlPanel {...controlPanelProps} />
          </div>
        </div>
        <div className="right-panel">
          <Editor
            userImage={userImage}
            overlay={overlay}
            selected={selected}
            setSelected={setSelected}
            userProps={userProps}
            setUserProps={setUserProps}
            overlayProps={overlayProps}
            setOverlayProps={setOverlayProps}
            isMobile={isMobile}
          />
        </div>
      </div>
      <button 
        className="theme-toggle"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );
}

export default App; 