'use client';
import { useState } from 'react';

export default function Counter() {
  const [menang, setMenang] = useState(0);
  const [kalah, setKalah] = useState(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#121212', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h2 style={{ marginBottom: '30px' }}>Win / Loss Counter</h2>
      
      <div style={{ display: 'flex', gap: '20px', width: '100%', maxWidth: '400px' }}>
        {/* Kotak Menang */}
        <div style={{ flex: 1, backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '12px', textAlign: 'center', border: '2px solid #2ed573' }}>
          <h3 style={{ margin: 0, color: '#2ed573' }}>MENANG</h3>
          <div style={{ fontSize: '64px', fontWeight: 'bold', margin: '20px 0' }}>{menang}</div>
          <button 
            onClick={() => setMenang(menang + 1)}
            style={{ width: '100%', padding: '15px', fontSize: '18px', fontWeight: 'bold', backgroundColor: '#2ed573', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            +1 Win
          </button>
        </div>

        {/* Kotak Kalah */}
        <div style={{ flex: 1, backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '12px', textAlign: 'center', border: '2px solid #ff4757' }}>
          <h3 style={{ margin: 0, color: '#ff4757' }}>KALAH</h3>
          <div style={{ fontSize: '64px', fontWeight: 'bold', margin: '20px 0' }}>{kalah}</div>
          <button 
            onClick={() => setKalah(kalah + 1)}
            style={{ width: '100%', padding: '15px', fontSize: '18px', fontWeight: 'bold', backgroundColor: '#ff4757', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            +1 Loss
          </button>
        </div>
      </div>

      {/* Tombol Reset */}
      <button 
        onClick={() => { setMenang(0); setKalah(0); }}
        style={{ marginTop: '40px', padding: '10px 20px', backgroundColor: 'transparent', color: '#888', border: '1px solid #444', borderRadius: '6px', cursor: 'pointer' }}
      >
        Reset Score
      </button>
    </div>
  );
}