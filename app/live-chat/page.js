'use client';
import { useState } from 'react';

export default function LiveChat() {
  const [videoId, setVideoId] = useState('');
  const [inputVideoId, setInputVideoId] = useState('');

  const handleStartChat = (e) => {
    e.preventDefault();
    if (!inputVideoId.trim()) return;
    setVideoId(inputVideoId.trim());
  };

  // TAMPILAN 1: Form Input ID (Persis Foto Sebelumnya)
  if (!videoId) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif', padding: '20px' }}>
        <h3 style={{ marginBottom: '5px', fontWeight: 'bold' }}>Masukkan ID Live Streaming YouTube</h3>
        <p style={{ color: '#888', fontSize: '12px', marginBottom: '20px' }}>Contoh dari URL foto lo: <span style={{ color: '#ff4757', fontWeight: 'bold' }}>fnO5MKDgBps</span></p>
        
        <form onSubmit={handleStartChat} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', width: '100%', maxWidth: '350px' }}>
          <input 
            type="text" 
            placeholder="Contoh: fnO5MKDgBps"
            value={inputVideoId}
            onChange={(e) => setInputVideoId(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#1c1c1e', color: '#fff', fontSize: '14px', textAlign: 'center' }}
          />
          <button 
            type="submit"
            style={{ backgroundColor: '#e50914', color: '#fff', border: 'none', borderRadius: '6px', padding: '12px 24px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', width: '100%', maxWidth: '200px' }}
          >
            Buka Chat
          </button>
        </form>
      </div>
    );
  }

  // TAMPILAN 2: Langsung Nampilin Chat Asli YouTube via Iframe
  // PENTING: ganti 'sakalianaja.vercel.app' dengan domain Vercel asli lo nanti
  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', backgroundColor: '#111', borderBottom: '1px solid #222' }}>
        <span style={{ color: '#fff', fontSize: '14px' }}>Memonitor ID: {videoId}</span>
        <button onClick={() => setVideoId('')} style={{ background: 'none', border: '1px solid #444', color: '#aaa', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
          Ganti ID
        </button>
      </div>
      <iframe
        title="YouTube Live Chat"
        src={`https://www.youtube.com/live_chat?v=${videoId}&embed_domain=sakalianaja.vercel.app`}
        style={{ width: '100%', flex: 1, border: 'none', minHeight: 'calc(100vh - 45px)' }}
      />
    </div>
  );
}