'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#121212', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      
      <h1 style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '28px', color: '#fff' }}>Saka Stream Tools</h1>
      <p style={{ color: '#888', marginBottom: '40px', fontSize: '14px', textAlign: 'center' }}>Pilih fitur monitoring untuk streaming lo</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '350px' }}>
        
        {/* Shortcut ke Live Chat */}
        <Link href="/live-chat" style={{ textDecoration: 'none' }}>
          <div style={{ backgroundColor: '#1e1e1e', padding: '25px', borderRadius: '12px', textAlign: 'center', border: '1px solid #333', cursor: 'pointer', transition: 'transform 0.2s' }}>
            <span style={{ fontSize: '32px' }}>💬</span>
            <h3 style={{ margin: '10px 0 5px 0', color: '#e50914', fontWeight: 'bold' }}>YouTube Live Chat</h3>
            <p style={{ margin: 0, color: '#aaa', fontSize: '13px' }}>Pantau chat streaming YouTube via iframe</p>
          </div>
        </Link>

        {/* Shortcut ke Counter */}
        <Link href="/count" style={{ textDecoration: 'none' }}>
          <div style={{ backgroundColor: '#1e1e1e', padding: '25px', borderRadius: '12px', textAlign: 'center', border: '1px solid #333', cursor: 'pointer', transition: 'transform 0.2s' }}>
            <span style={{ fontSize: '32px' }}>📊</span>
            <h3 style={{ margin: '10px 0 5px 0', color: '#2ed573', fontWeight: 'bold' }}>Win / Loss Counter</h3>
            <p style={{ margin: 0, color: '#aaa', fontSize: '13px' }}>Hitung skor menang kalah saat streaming</p>
          </div>
        </Link>

      </div>

      <footer style={{ marginTop: '5px', color: '#444', fontSize: '12px', position: 'absolute', bottom: '20px' }}>
        v1.0.0 • Hosted on Vercel
      </footer>
    </div>
  );
}