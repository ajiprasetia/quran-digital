import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import SurahList from "./components/SurahList";
import JuzList from "./components/JuzList";
import SurahDetail from "./components/SurahDetail";
import JuzDetail from "./components/JuzDetail";
import {
  fetchChapters,
  fetchJuzList,
  fetchChapterDetail,
  fetchJuzDetail,
} from "./config/api";
import "./App.css";

function SurahDetailWrapper({ darkMode, chapters }) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchChapterDetail(Number(id));
        const currentChapter = chapters.find((ch) => ch.id === Number(id));

        const completeChapterInfo = {
          ...result.info,
          name_simple: currentChapter?.name_simple || result.info?.name_simple,
          name_arabic: currentChapter?.name_arabic || result.info?.name_arabic,
          translated_name:
            currentChapter?.translated_name || result.info?.translated_name,
          revelation_place:
            currentChapter?.revelation_place || result.info?.revelation_place,
          verses_count: currentChapter?.verses_count || result.verses.length,
        };

        setData({
          verses: result.verses,
          translations: result.translations,
          chapterInfo: completeChapterInfo,
          audioUrl: result.audioUrl,
        });
      } catch (error) {
        console.error("Error fetching chapter detail:", error);
      }
      setLoading(false);
    };

    loadData();
  }, [id, chapters]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        <p className="mt-4">Memuat...</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <SurahDetail
      darkMode={darkMode}
      chapterInfo={data.chapterInfo}
      verses={data.verses}
      translations={data.translations}
      audioUrl={data.audioUrl}
    />
  );
}

function JuzDetailWrapper({ darkMode }) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchJuzDetail(Number(id));
        setData(result);
      } catch (error) {
        console.error("Error fetching juz detail:", error);
      }
      setLoading(false);
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        <p className="mt-4">Memuat...</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <JuzDetail
      darkMode={darkMode}
      juzNumber={Number(id)}
      verses={data.verses}
      translations={data.translations}
    />
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("darkMode");
      if (saved !== null) {
        return JSON.parse(saved);
      }

      if (window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      }

      return false;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return false;
    }
  });

  const [chapters, setChapters] = useState([]);
  const [juzList, setJuzList] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      localStorage.setItem("darkMode", JSON.stringify(darkMode));

      if (darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [darkMode]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [chaptersData, juzData] = await Promise.all([
        fetchChapters(),
        fetchJuzList(),
      ]);
      setChapters(chaptersData);
      setJuzList(juzData);
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  };

  const handleChapterClick = (chapterId) => {
    navigate(`/surah/${chapterId}`);
  };

  const handleJuzClick = (juzNumber) => {
    navigate(`/juz/${juzNumber}`);
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleTabChange = (tab) => {
    if (tab === "home") {
      navigate("/");
    } else if (tab === "surah") {
      navigate("/surah");
    } else if (tab === "juz") {
      navigate("/juz");
    }
  };

  const getActiveTab = () => {
    const path = window.location.pathname;
    if (path === "/" || path === "") return "home";
    if (path.startsWith("/surah")) return "surah";
    if (path.startsWith("/juz")) return "juz";
    return "home";
  };

  const bgClass = darkMode ? "bg-slate-950" : "bg-gray-50";
  const textClass = darkMode ? "text-white" : "text-gray-900";

  return (
    <div
      className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300 flex flex-col`}
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeTab={getActiveTab()}
        setActiveTab={handleTabChange}
        onHomeClick={handleHomeClick}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                darkMode={darkMode}
                chapters={chapters}
                onChapterClick={handleChapterClick}
              />
            }
          />
          <Route
            path="/surah"
            element={
              <SurahList
                darkMode={darkMode}
                chapters={chapters}
                onChapterClick={handleChapterClick}
              />
            }
          />
          <Route
            path="/surah/:id"
            element={
              <SurahDetailWrapper darkMode={darkMode} chapters={chapters} />
            }
          />
          <Route
            path="/juz"
            element={
              <JuzList
                darkMode={darkMode}
                juzList={juzList}
                onJuzClick={handleJuzClick}
              />
            }
          />
          <Route
            path="/juz/:id"
            element={<JuzDetailWrapper darkMode={darkMode} />}
          />
        </Routes>
      </div>

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
