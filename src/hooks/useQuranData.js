import { useState, useEffect } from 'react';
import { quranApi } from '../services/quranApi';

export const useQuranData = () => {
  const [chapters, setChapters] = useState([]);
  const [juzList, setJuzList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [chaptersData, juzData] = await Promise.all([
        quranApi.fetchChapters(),
        quranApi.fetchJuzList()
      ]);
      setChapters(chaptersData);
      setJuzList(juzData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { chapters, juzList, loading, error };
};