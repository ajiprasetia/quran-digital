export const API_CONFIG = {
  CHAPTERLISTS_URL: 'https://api.quran.com/api/v4/chapters',
  CHAPTERDETAIL_URL: 'https://api.quran.com/api/v4/chapters/',
  LANGUAGE_URL: 'language=id',
  JUZLISTS_URL: 'https://api.quran.com/api/v4/juzs',
  AYAHSURAH_URL: 'https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=',
  TRANSLATIONSURAH_URL: 'https://api.quran.com/api/v4/quran/translations/33?chapter_number=',
  AUDIOSURAH_URL: 'https://api.quran.com/api/v4/chapter_recitations/7/',
  AUDIOAYAH_URL: 'https://verses.quran.com/',
  INFOSURAH_URL: 'https://api.quran.com/api/v4/chapters/',
  INFOLANGUANGE_URL: '/info?language=id',
  AYAHJUZ_URL: 'https://api.quran.com/api/v4/quran/verses/uthmani?juz_number=',
  TRANSLATIONJUZ_URL: 'https://api.quran.com/api/v4/quran/translations/33?juz_number=',
  AUDIOJUZ_URL: 'https://api.quran.com/api/v4/recitations/7/by_juz/',
  PAGEJUZ_URL: '?per_page=999999',
  RECITATIONS_URL: 'https://api.quran.com/api/v4/quran/recitations/7?chapter_number='
};

// Fungsi helper untuk membersihkan HTML tags dari terjemahan
export const stripHtmlTags = (html) => {
  if (!html) return '';
  
  // Buat temporary div untuk parse HTML
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  
  // Ambil text content tanpa tags
  return tmp.textContent || tmp.innerText || '';
};

// Fungsi untuk mendapatkan URL audio per ayat
export const getVerseAudioUrl = (chapterNumber, verseNumber) => {
  // Format: https://verses.quran.com/AbdulBaset/Mujawwad/mp3/001001.mp3
  const paddedChapter = String(chapterNumber).padStart(3, '0');
  const paddedVerse = String(verseNumber).padStart(3, '0');
  return `https://verses.quran.com/AbdulBaset/Mujawwad/mp3/${paddedChapter}${paddedVerse}.mp3`;
};

export const fetchChapters = async () => {
  const response = await fetch(`${API_CONFIG.CHAPTERLISTS_URL}?${API_CONFIG.LANGUAGE_URL}`);
  const data = await response.json();
  return data.chapters || [];
};

export const fetchJuzList = async () => {
  const response = await fetch(API_CONFIG.JUZLISTS_URL);
  const data = await response.json();
  return data.juzs || [];
};

export const fetchChapterDetail = async (chapterId) => {
  const [versesRes, translationsRes, infoRes, audioRes] = await Promise.all([
    fetch(`${API_CONFIG.AYAHSURAH_URL}${chapterId}`),
    fetch(`${API_CONFIG.TRANSLATIONSURAH_URL}${chapterId}`),
    fetch(`${API_CONFIG.INFOSURAH_URL}${chapterId}${API_CONFIG.INFOLANGUANGE_URL}`),
    fetch(`${API_CONFIG.AUDIOSURAH_URL}${chapterId}`)
  ]);

  const [versesData, translationsData, infoData, audioData] = await Promise.all([
    versesRes.json(),
    translationsRes.json(),
    infoRes.json(),
    audioRes.json()
  ]);

  return {
    verses: versesData.verses || [],
    translations: translationsData.translations || [],
    info: infoData.chapter_info || null,
    audioUrl: audioData.audio_file?.audio_url || ''
  };
};

export const fetchJuzDetail = async (juzNumber) => {
  const [versesRes, translationsRes] = await Promise.all([
    fetch(`${API_CONFIG.AYAHJUZ_URL}${juzNumber}${API_CONFIG.PAGEJUZ_URL}`),
    fetch(`${API_CONFIG.TRANSLATIONJUZ_URL}${juzNumber}${API_CONFIG.PAGEJUZ_URL}`)
  ]);

  const [versesData, translationsData] = await Promise.all([
    versesRes.json(),
    translationsRes.json()
  ]);

  return {
    verses: versesData.verses || [],
    translations: translationsData.translations || []
  };
};