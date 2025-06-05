import React, { useState } from "react";
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

// BG görselleri için dizi
const bgImages = [
  // Sol üst köşe
  { src: process.env.PUBLIC_URL + '/bg/1.png', top: -100, left: -60, rotate: -12, scale: 0.7 },
  // Sol kenar üst
  { src: process.env.PUBLIC_URL + '/bg/2.png', top: 150, left: 50, rotate: 45, scale: 0.8 },
  // Sol kenar orta
  { src: process.env.PUBLIC_URL + '/bg/3.png', top: 500, left: -50, rotate: -60, scale: 0.7 },
  // Sol kenar alt
  { src: process.env.PUBLIC_URL + '/bg/4.png', top: 450, left: 180, rotate: 18, scale: 0.8 },
  // Sol alt köşe
  { src: process.env.PUBLIC_URL + '/bg/5.png', top: 550, left: 430, rotate: -33, scale: 0.7 },
  // Sağ üst köşe
  { src: process.env.PUBLIC_URL + '/bg/6.png', top: -120, left: 1600, rotate: 22, scale: 0.7 },
  // Sağ kenar üst
  { src: process.env.PUBLIC_URL + '/bg/7.png', top: 120, left: 1600, rotate: 57, scale: 0.8 },
  // Sağ kenar orta
  { src: process.env.PUBLIC_URL + '/bg/8.png', top: 350, left: 1600, rotate: -57, scale: 0.7 },
  // Sağ kenar alt
  { src: process.env.PUBLIC_URL + '/bg/9.png', top: 550, left: 1400, rotate: 33, scale: 0.8 },
  // Sağ alt köşe
  { src: process.env.PUBLIC_URL + '/bg/10.png', top: 1000, left: 1500, rotate: -18, scale: 0.7 },
  // Üst kenar sol
  { src: process.env.PUBLIC_URL + '/bg/11.png', top: -160, left: 280, rotate: -50, scale: 0.7 },
  // Üst kenar orta
  { src: process.env.PUBLIC_URL + '/bg/12.png', top: -160, left: 800, rotate: 30, scale: 0.8 },
  // Üst kenar sağ
  { src: process.env.PUBLIC_URL + '/bg/13.png', top: -150, left: 1300, rotate: -22, scale: 0.7 },
  // Alt kenar sol
  { src: process.env.PUBLIC_URL + '/bg/14.png', top: -200, left: 460, rotate: 18, scale: 0.8 },
  // Alt kenar orta
  { src: process.env.PUBLIC_URL + '/bg/15.png', top: 1100, left: 800, rotate: -45, scale: 0.7 },
  // Alt kenar sağ
  { src: process.env.PUBLIC_URL + '/bg/16.png', top: 1050, left: 1400, rotate: 8, scale: 0.8 },
  // Editor çevresi (sağ üst)
  { src: process.env.PUBLIC_URL + '/bg/17.png', top: 200, left: 1200, rotate: -33, scale: 0.7 },
  // Editor çevresi (sol alt)
  { src: process.env.PUBLIC_URL + '/bg/18.png', top: 800, left: 300, rotate: 22, scale: 0.8 },
  // Editor çevresi (sağ alt)
  { src: process.env.PUBLIC_URL + '/bg/19.png', top: 500, left: 1100, rotate: -12, scale: 0.7 },
  // Editor çevresi (sol üst)
  { src: process.env.PUBLIC_URL + '/bg/20.png', top: 550, left: 800, rotate: 27, scale: 0.8 },
];

function App() {
  const [userImage, setUserImage] = useState(null);
  const [overlay, setOverlay] = useState(null);
  const [selected, setSelected] = useState(null);
  const [userProps, setUserProps] = useState(null);
  const [overlayProps, setOverlayProps] = useState(null);
  const [theme, setTheme] = useState('dark');

  // Seçili item'ın props ve setProps'unu belirle
  let controlPanelProps = { props: { scaleX: 1, rotation: 0 }, setProps: () => {}, disabled: true };
  if (selected === 'user' && userProps) {
    controlPanelProps = { props: userProps, setProps: setUserProps, disabled: false };
  } else if (selected === 'overlay' && overlayProps) {
    controlPanelProps = { props: overlayProps, setProps: setOverlayProps, disabled: false };
  }

  const t = THEMES[theme];

  return (
    <div style={{ minHeight: "100vh", background: t.background, display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'background 0.3s', position: 'relative', overflow: 'hidden' }}>
      {/* BG görselleri */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
        {bgImages.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={"bg" + (i+1)}
            style={{
              position: 'absolute',
              top: img.top,
              left: img.left,
              transform: `rotate(${img.rotate}deg) scale(${img.scale})`,
              opacity: 0.7,
              zIndex: 0,
              pointerEvents: 'none',
              userSelect: 'none',
              filter: 'drop-shadow(0 2px 12px #0002)'
            }}
          />
        ))}
      </div>
      <div style={{ position: 'absolute', top: 24, right: 32, zIndex: 10, display: 'flex', gap: 12 }}>
        <button onClick={() => setTheme('light')} style={{ padding: '6px 18px', borderRadius: 8, border: theme==='light' ? '2px solid #5fa8ff' : '2px solid #bbb', background: '#fff', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}>Light</button>
        <button onClick={() => setTheme('dark')} style={{ padding: '6px 18px', borderRadius: 8, border: theme==='dark' ? '2px solid #5fa8ff' : '2px solid #bbb', background: '#23272e', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Dark</button>
      </div>
      {/* DEX LOGO ve linki - tema butonlarının hemen altında */}
      <div style={{ position: 'absolute', top: 74, right: 32, zIndex: 10, width: 120, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <a
          href="https://dexscreener.com/solana/7uyyetee9zhuyl9jiyjjhpune2qkpyqsbvmxd9daj2db"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <img
            src={process.env.PUBLIC_URL + "/dexlogo.png"}
            alt="Dex Logo"
            style={{ height: 100, width: 100, borderRadius: "50%", opacity: 0.98, cursor: "pointer", boxShadow: "0 0 24px #39FF1488", border: "3px solid #39FF14", background: "#fff" }}
          />
        </a>
        <a
          href="https://swap.pump.fun/?input=So11111111111111111111111111111111111111112&output=8aSSFe17Mdsvipt2DF8xDsaiAeNvkj4JpY42vUBLpump"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 18 }}
        >
          <img
            src={process.env.PUBLIC_URL + "/pumplogo.png"}
            alt="Pump Logo"
            style={{ height: 100, width: 100, borderRadius: "50%", opacity: 0.98, cursor: "pointer", boxShadow: "0 0 24px #39FF1488", border: "3px solid #39FF14", background: "#fff" }}
          />
        </a>
        <a
          href="https://x.com/i/communities/1930397900393095176/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 18 }}
        >
          <img
            src={process.env.PUBLIC_URL + "/xlogo.png"}
            alt="X Logo"
            style={{ height: 100, width: 100, borderRadius: "50%", opacity: 0.98, cursor: "pointer", boxShadow: "0 0 24px #39FF1488", border: "3px solid #39FF14", background: "#fff" }}
          />
        </a>
      </div>
      <div style={{ display: 'flex', background: t.panel, borderRadius: 24, boxShadow: `8px 8px 0 ${t.panelShadow}`, padding: 32, gap: 40, transition: 'background 0.3s', zIndex: 1 }}>
        {/* Left panel */}
        <div style={{ minWidth: 260, display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'flex-start', zIndex: 1 }}>
          <h1 style={{ fontFamily: 'This Cafe', margin: '30px 0 16px 0', fontSize: 28, letterSpacing: 1, color: t.label }}>TinFoilCatHat Photo Editor</h1>
          <ImageUploader setUserImage={setUserImage} />
          <OverlaySelector setOverlay={setOverlay} color={t.label} bg={theme === 'dark' ? '#23272e' : '#eee'} />
          <div style={{ marginTop: 24 }}>
            <ControlPanel {...controlPanelProps} />
          </div>
        </div>
        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: t.panel, borderRadius: 20, boxShadow: `4px 4px 0 ${t.panelShadow}`, padding: 24, transition: 'background 0.3s', zIndex: 1 }}>
          <Editor
            userImage={userImage}
            overlay={overlay}
            selected={selected}
            setSelected={setSelected}
            userProps={userProps}
            setUserProps={setUserProps}
            overlayProps={overlayProps}
            setOverlayProps={setOverlayProps}
          />
        </div>
      </div>
    </div>
  );
}

export default App; 