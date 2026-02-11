import React, { useState, useMemo } from "react";
import { Search, X, Book, FileText } from "lucide-react";

const SurahList = ({ darkMode, chapters, onChapterClick }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter chapters berdasarkan search query
  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return chapters;

    const query = searchQuery.toLowerCase();
    return chapters.filter((chapter) => {
      const nameSimple = chapter.name_simple?.toLowerCase() || "";
      const nameArabic = chapter.name_arabic || "";
      const translatedName = chapter.translated_name?.name?.toLowerCase() || "";
      const chapterNumber = chapter.id.toString();

      return (
        nameSimple.includes(query) ||
        nameArabic.includes(query) ||
        translatedName.includes(query) ||
        chapterNumber === query
      );
    });
  }, [chapters, searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative space-y-6">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
            <Book className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2
              className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              Daftar Surat
            </h2>
            <p
              className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              114 Surat dalam Al-Quran
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div>
          <div className="relative">
            <Search
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder="Cari surat (nama, nomor, atau terjemahan)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-12 py-4 rounded-full border-2 ${
                darkMode
                  ? "bg-gray-700/50 text-white placeholder-gray-400 border-gray-600 focus:border-emerald-500"
                  : "bg-white text-gray-900 placeholder-gray-500 border-gray-200 focus:border-emerald-500"
              } focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition shadow-sm`}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className={`absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg ${
                  darkMode
                    ? "hover:bg-gray-600 text-gray-400"
                    : "hover:bg-gray-100 text-gray-500"
                } transition`}
                title="Hapus pencarian"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Search Results Info */}
          {searchQuery && (
            <div className={`mt-3 flex items-center gap-2 px-1`}>
              <FileText
                className={`w-4 h-4 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}
              />
              <p
                className={`text-sm font-medium ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}
              >
                {filteredChapters.length > 0
                  ? `Ditemukan ${filteredChapters.length} surat`
                  : "Tidak ada surat yang ditemukan"}
              </p>
            </div>
          )}
        </div>

        {/* Surah Grid */}
        {filteredChapters.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredChapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => onChapterClick(chapter.id)}
                className={`group relative overflow-hidden p-5 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  darkMode
                    ? "bg-gray-700/50 border-gray-600 hover:border-emerald-500/50"
                    : "bg-white border-gray-200 hover:border-emerald-500/50"
                } shadow-lg text-left`}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative">
                  {/* Header dengan nomor dan jumlah ayat */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm">
                          {chapter.id}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                        darkMode
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      {chapter.verses_count} Ayat
                    </div>
                  </div>

                  {/* Nama surat */}
                  <h4
                    className={`font-bold text-lg mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {chapter.name_simple}
                  </h4>

                  {/* Nama Arab */}
                  <p
                    className={`text-2xl text-right mb-3 leading-relaxed ${
                      darkMode ? "text-emerald-400" : "text-emerald-600"
                    }`}
                    style={{ fontFamily: "serif" }}
                  >
                    {chapter.name_arabic}
                  </p>

                  {/* Terjemahan */}
                  <div
                    className={`pt-3 border-t ${darkMode ? "border-gray-600" : "border-gray-200"}`}
                  >
                    <p
                      className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      {chapter.translated_name?.name}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-12">
            <div
              className={`text-6xl mb-4 ${darkMode ? "text-gray-600" : "text-gray-300"}`}
            >
              🔍
            </div>
            <p
              className={`text-xl font-bold mb-2 ${darkMode ? "text-gray-200" : "text-gray-800"}`}
            >
              Tidak ada hasil ditemukan
            </p>
            <p
              className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Coba kata kunci lain untuk mencari surat
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <div
              className={`text-6xl mb-4 ${darkMode ? "text-gray-600" : "text-gray-300"}`}
            >
              ⏳
            </div>
            <p
              className={`text-xl font-bold mb-2 ${darkMode ? "text-gray-200" : "text-gray-800"}`}
            >
              Memuat data...
            </p>
            <p
              className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Mohon tunggu sebentar
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurahList;
