import React from 'react';
import { Book, BookOpen, FileText, Sparkles, Volume2, Moon, Sun } from 'lucide-react';

const Home = ({ darkMode, chapters, onChapterClick, onJuzClick }) => {
  const totalVerses = chapters.reduce((sum, chapter) => sum + chapter.verses_count, 0);
  const totalSurahs = chapters.length;
  const totalJuz = 30;

  const stats = [
    {
      icon: Book,
      label: 'Total Surat',
      value: totalSurahs,
      description: 'Lengkap dengan terjemahan dan audio murotal berkualitas tinggi',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: BookOpen,
      label: 'Total Juz',
      value: totalJuz,
      description: 'Navigasi mudah berdasarkan pembagian juz untuk bacaan harian',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      icon: FileText,
      label: 'Total Ayat',
      value: totalVerses.toLocaleString('id-ID'),
      description: 'Total ayat dalam Al-Quran dengan terjemahan Bahasa Indonesia',
      gradient: 'from-teal-500 to-emerald-600'
    }
  ];

  const features = [
    {
      icon: Book,
      title: 'Teks Arab Uthmani',
      description: 'Tulisan Arab yang indah dan mudah dibaca dengan font berkualitas tinggi',
      color: 'emerald'
    },
    {
      icon: FileText,
      title: 'Terjemahan Indonesia',
      description: 'Terjemahan lengkap Bahasa Indonesia',
      color: 'emerald'
    },
    {
      icon: Volume2,
      title: 'Audio Murotal',
      description: 'Audio per ayat dan per surat dari qari terbaik dengan kualitas HD',
      color: 'emerald'
    },
    {
      icon: darkMode ? Moon : Sun,
      title: 'Dark Mode',
      description: 'Nyaman dibaca kapan saja, siang atau malam dengan tema yang dapat disesuaikan',
      color: 'emerald'
    }
  ];

  const colorMap = {
    emerald: darkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border-emerald-300'
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative p-12 text-center">
          <div className="inline-block mb-6 px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20">
            <Sparkles className="w-5 h-5 inline-block mr-2 text-emerald-500" />
            <span className={`text-sm font-semibold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
              Al-Quran Digital
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight" style={{ fontFamily: 'serif' }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </h2>
          
          <h3 className={`text-2xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Selamat Datang di Al-Quran Digital
          </h3>
          
          <p className={`text-sm md:text-xl max-w-3xl mx-auto leading-relaxed mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Baca dan dengarkan Al-Quran dengan mudah. Aplikasi ini menyediakan teks Arab, 
            terjemahan Bahasa Indonesia, dan audio murotal berkualitas tinggi.
          </p>

          {/* Tombol Navigasi */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onChapterClick}
              className="group relative overflow-hidden px-8 py-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center justify-center gap-2">
                <Book className="w-5 h-5" />
                <span>Mulai Baca Surat</span>
              </div>
            </button>

            <button
              onClick={onJuzClick}
              className={`group relative overflow-hidden px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 w-full sm:w-auto ${
                darkMode 
                  ? 'bg-gray-800 border-emerald-500 text-white hover:bg-gray-700' 
                  : 'bg-white border-emerald-500 text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="relative flex items-center justify-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <span>Baca per Juz</span>
              </div>
            </button>
          </div>
        </div>
      

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                darkMode ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-white via-emerald-50/30 to-white border-gray-200'
              } border shadow-lg`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className="relative p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {stat.label}
                    </p>
                    <h3 className={`text-3xl font-bold bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.value}
                    </h3>
                  </div>
                </div>
                
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Features Section */}
     <div className="space-y-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h4 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Fitur Unggulan
          </h4>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${colorMap[feature.color]}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-emerald-500/20' : 'bg-emerald-500'} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h5 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {feature.title}
                    </h5>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
