'use client';
import { useState, useEffect } from 'react';

export default function LiveChat() {
  const [videoId, setVideoId] = useState('');
  const [inputVideoId, setInputVideoId] = useState('');
  const [liveChatId, setLiveChatId] = useState('');
  const [messages, setMessages] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const API_KEY = 'MASUKKAN_API_KEY_YOUTUBE_LO_DI_SINI'; 

  // Fungsi 1: Cari Live Chat ID berdasarkan Video ID
  const handleStartChat = async (e) => {
    e.preventDefault();
    if (!inputVideoId.trim()) return;

    setLoadingChat(true);
    setErrorMsg('');
    setMessages([]);

    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${inputVideoId.trim()}&part=liveStreamingDetails&key=${API_KEY}`
      );
      const data = await res.json();

      if (data.items && data.items.length > 0) {
        const chatId = data.items[0].liveStreamingDetails?.activeLiveChatId;
        if (chatId) {
          setLiveChatId(chatId);
          setVideoId(inputVideoId.trim()); // Mulai proses polling chat
        } else {
          setErrorMsg('Video ini bukan live streaming yang sedang aktif.');
          setLoadingChat(false);
        }
      } else {
        setErrorMsg('Video ID tidak ditemukan. Periksa kembali.');
        setLoadingChat(false);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('Gagal terhubung ke YouTube API.');
      setLoadingChat(false);
    }
  };

  // Fungsi 2: Ambil chat berkala (Polling) tiap 3 detik jika liveChatId ketemu
  useEffect(() => {
    if (!liveChatId) return;

    const fetchChat = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatId}&part=snippet,authorDetails&key=${API_KEY}`
        );
        const data = await res.json();
        if (data.items) {
          setMessages(data.items);
          setLoadingChat(false);
        }
      } catch (error) {
        console.error("Gagal ambil chat:", error);
      }
    };

    fetchChat(); // Ambil langsung pertama kali
    const interval = setInterval(fetchChat, 3000);
    return () => clearInterval(interval);
  }, [liveChatId]);

  // TAMPILAN 1: Form Input ID (Persis Foto Kedua)
  if (!videoId) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif', padding: '20px' }}>
        <h3 style={{ marginBottom: '5px', fontWeight: 'bold' }}>Masukkan ID Live Streaming YouTube</h3>
        <p style={{ color: '#888', fontSize: '12px', marginBottom: '20px' }}>Contoh: youtube.com/watch?v=<span style={{ color: '#ff4757', fontWeight: 'bold' }}>AbCdEfG</span> (Masukkan yang warna merah saja)</p>
        
        <form onSubmit={handleStartChat} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', width: '100%', maxWidth: '350px' }}>
          <input 
            type="text" 
            placeholder="Contoh: AbCdEfG"
            value={inputVideoId}
            onChange={(e) => setInputVideoId(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#1c1c1e', color: '#fff', fontSize: '14px', textAlign: 'center' }}
          />
          <button 
            type="submit"
            style={{ backgroundColor: '#e50914', color: '#fff', border: 'none', borderRadius: '6px', padding: '12px 24px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', width: '100%', maxWidth: '200px' }}
          >
            {loadingChat ? 'Menghubungkan...' : 'Buka Chat (Zoom 150%)'}
          </button>
        </form>
        {errorMsg && <p style={{ color: '#ff4757', marginTop: '15px', fontSize: '14px' }}>{errorMsg}</p>}
      </div>
    );
  }

  // TAMPILAN 2: Ruang Chatting
  return (
    <div style={{ padding: '16px', fontFamily: 'sans-serif', backgroundColor: '#121212', color: '#fff', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        <h3 style={{ margin: 0 }}>YouTube Live Chat</h3>
        <button onClick={() => setVideoId('')} style={{ background: 'none', border: '1px solid #444', color: '#aaa', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
          Ganti ID
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ background: '#1e1e1e', padding: '12px', borderRadius: '8px' }}>
            <strong style={{ color: '#ff4757' }}>{msg.authorDetails.displayName}: </strong>
            <span>{msg.snippet.displayMessage}</span>
          </div>
        ))}
        {messages.length === 0 && <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>Menunggu chat masuk...</p>}
      </div>
    </div>
  );
}