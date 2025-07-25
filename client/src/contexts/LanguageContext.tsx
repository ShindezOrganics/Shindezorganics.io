import { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple translations object - in production, use i18next
const translations: Record<string, Record<string, string>> = {
  en: {
    selectLanguage: 'Select Language',
    dashboard: 'Dashboard',
    equipment: 'Equipment',
    bookings: 'My Bookings',
    listings: 'My Listings',
    messages: 'Messages',
    education: 'Farming Education',
    home: 'Home',
    profile: 'Profile',
    login: 'Login',
    logout: 'Logout',
    bookNow: 'Book Now',
    viewDetails: 'View Details',
    chat: 'Chat'
  },
  hi: {
    selectLanguage: 'भाषा चुनें',
    dashboard: 'डैशबोर्ड',
    equipment: 'उपकरण',
    bookings: 'मेरी बुकिंग',
    listings: 'मेरी सूची',
    messages: 'संदेश',
    education: 'कृषि शिक्षा',
    home: 'घर',
    profile: 'प्रोफ़ाइल',
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    bookNow: 'अभी बुक करें',
    viewDetails: 'विवरण देखें',
    chat: 'चैट'
  },
  mr: {
    selectLanguage: 'भाषा निवडा',
    dashboard: 'डॅशबोर्ड',
    equipment: 'उपकरणे',
    bookings: 'माझी बुकिंग',
    listings: 'माझी यादी',
    messages: 'संदेश',
    education: 'शेती शिक्षण',
    home: 'घर',
    profile: 'प्रोफाइल',
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    bookNow: 'आता बुक करा',
    viewDetails: 'तपशील पहा',
    chat: 'चॅट'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
