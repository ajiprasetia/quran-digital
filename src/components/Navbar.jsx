import React from 'react';
import { Moon, Sun, Menu, X, Home, BookOpen, Book } from 'lucide-react';

const Navbar = ({ 
  darkMode, 
  setDarkMode, 
  activeTab, 
  setActiveTab, 
  onHomeClick,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-lg ${
      darkMode ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-200'
    } border-b shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={onHomeClick}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <img 
                src="/logo.png" 
                alt="Al-Quran Digital Logo" 
                className="relative w-10 h-10 rounded-full object-cover shadow-lg ring-2 ring-emerald-500/20"
              />
            </div>
            <div>
              <h1 className={`text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent`}>
                Al-Quran Digital
              </h1>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={onHomeClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'home' 
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30' 
                  : `${darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </button>
            <button
              onClick={() => setActiveTab('surah')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'surah' 
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30' 
                  : `${darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`
              }`}
            >
              <Book className="w-4 h-4" />
              Surat
            </button>
            <button
              onClick={() => setActiveTab('juz')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'juz' 
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30' 
                  : `${darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Juz
            </button>
            <div className={`w-px h-6 mx-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl transition-all duration-300 ${
                darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden pb-4 pt-2 space-y-2 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <button
              onClick={() => { onHomeClick(); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-all duration-300 ${
                activeTab === 'home' 
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg' 
                  : `${darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`
              }`}
            >
              <Home className="w-5 h-5" />
              Home
            </button>
            <button
              onClick={() => { setActiveTab('surah'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-all duration-300 ${
                activeTab === 'surah' 
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg' 
                  : `${darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`
              }`}
            >
              <Book className="w-5 h-5" />
              Daftar Surat
            </button>
            <button
              onClick={() => { setActiveTab('juz'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-all duration-300 ${
                activeTab === 'juz' 
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg' 
                  : `${darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Daftar Juz
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;