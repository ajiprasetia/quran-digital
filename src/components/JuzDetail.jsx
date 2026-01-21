import React, { useRef, useState, useEffect } from 'react';
import { BookOpen, Play, Pause, Loader2 } from 'lucide-react';
import { stripHtmlTags, getVerseAudioUrl } from '../config/api';

const JuzDetail = ({ 
  darkMode, 
  juzNumber, 
  verses, 
  translations
}) => {
  const [currentPlayingVerse, setCurrentPlayingVerse] = useState(null);
  const [loadingVerse, setLoadingVerse] = useState(null);
  const verseAudioRef = useRef(null);

  // Cleanup audio saat komponen unmount atau keluar halaman
  useEffect(() => {
    return () => {
      // Stop audio per ayat
      if (verseAudioRef.current) {
        verseAudioRef.current.pause();
        verseAudioRef.current.currentTime = 0;
      }
      
      setCurrentPlayingVerse(null);
      setLoadingVerse(null);
    };
  }, []);

  const toggleVerseAudio = (verseKey) => {
    const [chapterNum, verseNum] = verseKey.split(':').map(Number);

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

  // Konversi nomor ke angka Arab
  const arabicNumbers = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۱۰', '۱۱', '۱۲', '۱۳', '۱۴', '۱۵', '۱۶', '۱۷', '۱۸', '۱۹', '۲۰', '۲۱', '۲۲', '۲۳', '۲۴', '۲۵', '۲۶', '۲۷', '۲۸', '۲۹', '۳۰'];

  return (
    <div className="space-y-6">
      <div className={`relative overflow-hidden rounded-2xl ${
        darkMode ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-white via-emerald-50/30 to-white border-gray-200'
      } border shadow-lg p-8`}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative">
          {/* Header Section - Info Juz */}
          <div className="text-center">
            {/* Badge Juz Number */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg mb-4">
              <span className="text-white font-bold text-3xl" style={{ fontFamily: 'serif' }}>
                {arabicNumbers[juzNumber - 1]}
              </span>
            </div>

            {/* Judul Juz */}
            <h2 className={`text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Juz {juzNumber}
            </h2>

            {/* Teks Arab */}
            <p className="text-4xl mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight" style={{ fontFamily: 'serif' }}>
              جُزْءُ {arabicNumbers[juzNumber - 1]}
            </p>

            {/* Badge Jumlah Ayat */}
            <div className="flex items-center justify-center">
              <span className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 ${
                darkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border-emerald-300'
              }`}>
                <span className="text-base">📖</span>
                {verses.length} Ayat
              </span>
            </div>
          </div>
        </div>
      </div>

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

export default JuzDetail;