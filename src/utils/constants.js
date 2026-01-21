export const API_BASE = 'https://api.quran.com/api/v4';

export const API_ENDPOINTS = {
  CHAPTERS: `${API_BASE}/chapters`,
  CHAPTER_DETAIL: (id) => `${API_BASE}/chapters/${id}`,
  CHAPTER_INFO: (id) => `${API_BASE}/chapters/${id}/info`,
  JUZ_LIST: `${API_BASE}/juzs`,
  VERSES: (chapterNum) => `${API_BASE}/quran/verses/uthmani?chapter_number=${chapterNum}`,
  VERSES_JUZ: (juzNum) => `${API_BASE}/quran/verses/uthmani?juz_number=${juzNum}&per_page=999999`,
  TRANSLATION: (chapterNum) => `${API_BASE}/quran/translations/33?chapter_number=${chapterNum}`,
  TRANSLATION_JUZ: (juzNum) => `${API_BASE}/quran/translations/33?juz_number=${juzNum}&per_page=999999`,
  AUDIO_CHAPTER: (chapterId) => `${API_BASE}/chapter_recitations/7/${chapterId}`,
  AUDIO_VERSE: (verseKey) => `https://verses.quran.com/${verseKey.replace(':', '/')}.mp3`,
  RECITATIONS: (chapterNum) => `${API_BASE}/quran/recitations/7?chapter_number=${chapterNum}`
};

export const LANGUAGE = 'id';