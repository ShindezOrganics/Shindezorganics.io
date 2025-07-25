import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  ];

  return (
    <section className="bg-white py-6 px-4 border-b border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-gray-800">
            {t('selectLanguage')} / भाषा चुनें
          </h2>
          <div className="flex space-x-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  language === lang.code
                    ? 'bg-forest-green text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {lang.nativeName}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
