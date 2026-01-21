import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, BookOpen, Loader2, MapPin, FileText } from 'lucide-react';
import { stripHtmlTags, getVerseAudioUrl } from '../config/api';

const SurahDetail = ({ 
  darkMode, 
  chapterInfo, 
  verses, 
  translations, 
  audioUrl
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingVerse, setCurrentPlayingVerse] = useState(null);
  const [loadingVerse, setLoadingVerse] = useState(null);
  const audioRef = useRef(null);
  const verseAudioRef = useRef(null);

  // Cleanup audio saat komponen unmount atau keluar halaman
  useEffect(() => {
    return () => {
      // Stop audio full surat
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      
      // Stop audio per ayat
      if (verseAudioRef.current) {
        verseAudioRef.current.pause();
        verseAudioRef.current.currentTime = 0;
      }
      
      setIsPlaying(false);
      setCurrentPlayingVerse(null);
      setLoadingVerse(null);
    };
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Stop verse audio if playing
        if (verseAudioRef.current) {
          verseAudioRef.current.pause();
          setCurrentPlayingVerse(null);
        }
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleVerseAudio = (verseKey) => {
    const [chapterNum, verseNum] = verseKey.split(':').map(Number);
    
    // Stop surah audio if playing
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPlaying(false);
    }

    if (currentPlayingVerse === verseKey) {
      // Pause current verse
      if (verseAudioRef.current) {
        verseAudioRef.current.pause();
      }
      setCurrentPlayingVerse(null);
    } else {
      // Play new verse
      const audioUrl = getVerseAudioUrl(chapterNum, verseNum);
      
      if (verseAudioRef.current) {
        verseAudioRef.current.pause();
      }
      
      setLoadingVerse(verseKey);
      verseAudioRef.current = new Audio(audioUrl);
      
      verseAudioRef.current.addEventListener('canplay', () => {
        setLoadingVerse(null);
      });
      
      verseAudioRef.current.addEventListener('ended', () => {
        setCurrentPlayingVerse(null);
      });
      
      verseAudioRef.current.addEventListener('error', () => {
        setLoadingVerse(null);
        setCurrentPlayingVerse(null);
        alert('Gagal memutar audio ayat');
      });
      
      verseAudioRef.current.play()
        .then(() => {
          setCurrentPlayingVerse(verseKey);
        })
        .catch((error) => {
          console.error('Error playing verse audio:', error);
          setLoadingVerse(null);
          setCurrentPlayingVerse(null);
        });
    }
  };

  return (
    <div className="space-y-6">
      {chapterInfo && (
        <div className={`relative overflow-hidden rounded-2xl ${
          darkMode ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-white via-emerald-50/30 to-white border-gray-200'
        } border shadow-lg p-8`}>
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative space-y-6">
            {/* Header Section - Nama Surat & Jumlah Ayat */}
            <div className="text-center">
              {/* Nama Surat Latin */}
              <h2 className={`text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {chapterInfo.name_simple}
              </h2>
              
              {/* Nama Surat Arab */}
              <p className="text-5xl mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight" style={{ fontFamily: 'serif' }}>
                {chapterInfo.name_arabic}
              </p>
              
              {/* Terjemahan Nama */}
              <p className={`text-xl mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {chapterInfo.translated_name?.name || ''}
              </p>
              
              {/* Badges Info */}
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <span className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 ${
                  darkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                }`}>
                  <span className="text-base">📖</span>
                  {verses.length} Ayat
                </span>
                {chapterInfo.revelation_place && (
                  <span className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 ${
                    darkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  }`}>
                    <span className="text-base">{chapterInfo.revelation_place === 'makkah' ? '🕋' : '🕌'}</span>
                    {chapterInfo.revelation_place === 'makkah' ? 'Makkiyah' : 'Madaniyah'}
                  </span>
                )}
              </div>
            </div>

            {/* Audio Player */}
            {audioUrl && (
              <div className={`p-6 rounded-full border-2 ${
                darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-white border-gray-200'
              } shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={toggleAudio}
                      className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                    </button>
                    <div>
                      <p className={`font-bold text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Audio Full Surat
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {isPlaying ? 'Sedang diputar...' : 'Klik untuk memutar'}
                      </p>
                    </div>
                  </div>
                  <Volume2 className={`w-6 h-6 ${isPlaying ? 'text-emerald-600 animate-pulse' : darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <audio 
                  ref={audioRef} 
                  src={audioUrl} 
                  onEnded={() => setIsPlaying(false)} 
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Ayat-ayat */}
      <div className="space-y-4">
        {verses.map((verse, index) => {
          const translation = translations[index];
          const cleanTranslation = translation ? stripHtmlTags(translation.text) : '';
          const isCurrentlyPlaying = currentPlayingVerse === verse.verse_key;
          const isCurrentlyLoading = loadingVerse === verse.verse_key;
          
          return (
            <div 
              key={verse.id} 
              className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                isCurrentlyPlaying 
                  ? 'ring-4 ring-emerald-500/50 border-emerald-500 shadow-2xl' 
                  : darkMode 
                    ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 border-gray-700 hover:border-gray-600' 
                    : 'bg-gradient-to-br from-white via-emerald-50/30 to-white border-gray-200 hover:border-gray-300'
              } shadow-lg p-6`}
            >
              {isCurrentlyPlaying && (
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5"></div>
              )}

              <div className="relative">
                {/* Header Ayat */}
                <div className="flex items-start justify-between mb-5">
                  <span className="inline-block px-3 py-1.5 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-full text-sm font-semibold shadow-lg">
                    {verse.verse_key}
                  </span>
                  
                  <button
                    onClick={() => toggleVerseAudio(verse.verse_key)}
                    disabled={isCurrentlyLoading}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg ${
                      isCurrentlyPlaying
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white hover:shadow-xl hover:scale-105'
                        : darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 border-2 border-gray-600' 
                          : 'bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200'
                    } ${isCurrentlyLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title={isCurrentlyPlaying ? 'Pause ayat' : 'Putar ayat'}
                  >
                    {isCurrentlyLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isCurrentlyPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    <span className="hidden sm:inline">
                      {isCurrentlyLoading ? 'Memuat...' : isCurrentlyPlaying ? 'Pause' : 'Putar'}
                    </span>
                  </button>
                </div>

                {/* Teks Arab */}
                <p className="text-right mb-6 text-3xl leading-loose arabic-text" dir="rtl">
                  {verse.text_uthmani}
                </p>

                {/* Terjemahan */}
                {cleanTranslation && (
                  <div className={`pt-4 border-t-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                      {cleanTranslation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SurahDetail;