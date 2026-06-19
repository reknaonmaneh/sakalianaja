'use client';
import { useState, useEffect } from 'react';

export default function LiveChat() {
  const [messages, setMessages] = useState([]);
  const [liveChatId, setLiveChatId] = useState('MASUKKAN_LIVE_CHAT_ID_LO'); 
  const API_KEY = 'MASUKKAN_API_KEY_YOUTUBE_LO';

  useEffect(() => {
    if (!liveChatId) return;

    const fetchChat = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatId}&part=snippet,authorDetails&key=${API_KEY}`
        );
        const data = await res.json();
        if (data.items) {
          // Ambil chat terbaru
          setMessages(data.items);
        }
      } catch (error) {
        console.error("Gagal ambil chat:", error);
      }
    };

    // Polling tiap 3 detik sekali
    const interval = setInterval(fetchChat, 3000);
    return () => clearInterval(interval);
  }, [liveChatId]);

  return (
    <div style={{ padding: '16px', fontFamily: 'sans-serif', backgroundColor: '#121212', color: '#fff', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', borderBottom: '1px solid #333', paddingBottom: '10px' }}>YouTube Live Chat</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ background: '#1e1e1e', padding: '10px', borderRadius: '8px' }}>
            <strong style={{ color: '#ff4757' }}>{msg.authorDetails.displayName}: </strong>
            <span>{msg.snippet.displayMessage}</span>
          </div>
        ))}
        {messages.length === 0 && <p style={{ textAlign: 'center', color: '#888' }}>Menunggu chat masuk...</p>}
      </div>
    </div>
  );
}