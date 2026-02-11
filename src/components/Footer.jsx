import React from "react";
import { Heart, ExternalLink, Code, Database } from "lucide-react";

const Footer = ({ darkMode }) => {
  return (
    <footer
      className={`relative overflow-hidden mt-12 ${
        darkMode
          ? "bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 border-gray-700"
          : "bg-gradient-to-br from-white via-emerald-50/30 to-white border-gray-200"
      } border-t shadow-lg`}
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-6">
          {/* Logo & Title */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            <img
              src="/logo.png"
              alt="Al-Quran Digital Logo"
              className="w-12 h-12 rounded-full object-cover shadow-lg ring-2 ring-emerald-500/20"
            />
            <div>
              <h3
                className={`text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent`}
              >
                Al-Quran Digital
              </h3>
            </div>
          </div>

          {/* Credits Section - Always 2 Columns */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
            {/* Data Source */}
            <div
              className={`p-3 sm:p-4 rounded-xl border-2 ${
                darkMode
                  ? "bg-gray-700/50 border-gray-600"
                  : "bg-white border-gray-200"
              } shadow-lg`}
            >
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2">
                <Database
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}
                />
                <p
                  className={`text-xs sm:text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Sumber Data
                </p>
              </div>
              <a
                href="https://quran.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs sm:text-sm text-emerald-600 hover:text-emerald-700 font-semibold transition-all duration-300 hover:scale-105"
              >
                Quran.com
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
            </div>

            {/* API Documentation */}
            <div
              className={`p-3 sm:p-4 rounded-xl border-2 ${
                darkMode
                  ? "bg-gray-700/50 border-gray-600"
                  : "bg-white border-gray-200"
              } shadow-lg`}
            >
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2">
                <Code
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}
                />
                <p
                  className={`text-xs sm:text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  API Documentation
                </p>
              </div>
              <a
                href="https://api-docs.quran.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs sm:text-sm text-emerald-600 hover:text-emerald-700 font-semibold transition-all duration-300 hover:scale-105"
              >
                Quran.com API
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>

          {/* Divider */}
          <div
            className={`border-t-2 ${darkMode ? "border-gray-700" : "border-gray-200"} pt-6`}
          >
            {/* Copyright */}
            <p
              className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              © {new Date().getFullYear()} Al-Quran Digital
            </p>
            <p
              className={`text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}
            >
              Developed by{" "}
              <span className="font-semibold text-emerald-600">
                Aji Prasetia
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
