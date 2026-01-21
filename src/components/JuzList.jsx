import React from 'react';
import { BookOpen, FileText } from 'lucide-react';

const JuzList = ({ darkMode, juzList, onJuzClick }) => {
  // Filter untuk memastikan tidak ada duplikat juz_number
  const uniqueJuzList = juzList.reduce((acc, juz) => {
    if (!acc.find(item => item.juz_number === juz.juz_number)) {
      acc.push(juz);
    }
    return acc;
  }, []);

  // Jika API tidak mengembalikan semua juz, buat array 1-30
  const completeJuzList = uniqueJuzList.length === 30 
    ? uniqueJuzList 
    : Array.from({ length: 30 }, (_, i) => {
        const existingJuz = uniqueJuzList.find(j => j.juz_number === i + 1);
        return existingJuz || { juz_number: i + 1, verse_mapping: {} };
      });

  // Check if data is still loading
  const isLoading = juzList.length === 0;

  // Fungsi untuk menghitung total ayat dalam juz
  const getTotalVerses = (verseMapping) => {
    if (!verseMapping) return 0;
    
    let total = 0;
    Object.values(verseMapping).forEach(range => {
      if (typeof range === 'string') {
        const [start, end] = range.split('-').map(Number);
        if (end) {
          total += (end - start + 1);
        } else {
          total += 1;
        }
      }
    });
    return total;
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl ${
      darkMode ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-white via-emerald-50/30 to-white border-gray-200'
    } border shadow-lg p-8`}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative space-y-6">
        {/* Header Section */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Daftar Juz
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              30 Juz dalam Al-Quran
            </p>
          </div>
        </div>

        {/* Juz Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className={`text-6xl mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>
              ⏳
            </div>
            <p className={`text-xl font-bold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Memuat data...
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Mohon tunggu sebentar
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {completeJuzList.map((juz) => {
            const totalVerses = getTotalVerses(juz.verse_mapping);
            
            return (
              <button
                key={`juz-${juz.juz_number}`}
                onClick={() => onJuzClick(juz.juz_number)}
                className={`group relative overflow-hidden p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  darkMode 
                    ? 'bg-gray-700/50 border-gray-600 hover:border-emerald-500/50' 
                    : 'bg-white border-gray-200 hover:border-emerald-500/50'
                } shadow-lg text-center`}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  {/* Badge Juz Number */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg mb-3">
                    <span className="text-white font-bold text-2xl" style={{ fontFamily: 'serif' }}>
                      {['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۱۰', '۱۱', '۱۲', '۱۳', '۱۴', '۱۵', '۱۶', '۱۷', '۱۸', '۱۹', '۲۰', '۲۱', '۲۲', '۲۳', '۲۴', '۲۵', '۲۶', '۲۷', '۲۸', '۲۹', '۳۰'][juz.juz_number - 1]}
                    </span>
                  </div>
                  
                  {/* Label Juz */}
                  <h3 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Juz {juz.juz_number}
                  </h3>
                  
                  {/* Divider */}
                  <div className={`border-t-2 mb-3 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}></div>
                  
                  {/* Jumlah Ayat */}
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                    darkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    <FileText className="w-3.5 h-3.5" />
                    {totalVerses > 0 ? `${totalVerses} Ayat` : 'Memuat...'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        )}
      </div>
    </div>
  );
};

export default JuzList;