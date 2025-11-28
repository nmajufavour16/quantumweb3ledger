'use client';

import { useEffect, useState } from 'react';
import { Languages } from 'lucide-react';

const SimpleGoogleTranslate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');

  // Define languages manually
  const languages = [
    { value: 'en', text: 'English' },
    { value: 'es', text: 'Spanish' },
    { value: 'fr', text: 'French' },
    { value: 'de', text: 'German' },
    { value: 'it', text: 'Italian' },
    { value: 'pt', text: 'Portuguese' },
    { value: 'ru', text: 'Russian' },
    { value: 'ja', text: 'Japanese' },
    { value: 'ko', text: 'Korean' },
    { value: 'zh-CN', text: 'Chinese (Simplified)' },
    { value: 'ar', text: 'Arabic' },
    { value: 'hi', text: 'Hindi' },
    { value: 'id', text: 'Indonesian' },
    { value: 'th', text: 'Thai' },
    { value: 'tr', text: 'Turkish' },
    { value: 'vi', text: 'Vietnamese' }
  ];

  useEffect(() => {
    // Add Google Translate script
    const addScript = () => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    };

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'ar,zh-CN,fr,de,hi,id,it,ja,ko,pt,ru,es,th,tr,vi',
            autoDisplay: false,
          },
          'google_translate_element'
        );
      } catch (error) {
        console.error('Error initializing Google Translate:', error);
      }
    };

    // Add the script to the page
    addScript();

    // Cleanup function
    return () => {
      // No cleanup needed
    };
  }, []);

  const toggleTranslate = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (e) => {
    const selectedValue = e.target.value;
    const selectedText = e.target.options[e.target.selectedIndex].text;
    setCurrentLanguage(selectedText);
    setIsOpen(false);
    
    // Try to manually trigger translation
    if (window.google && window.google.translate) {
      try {
        const select = document.querySelector('.goog-te-combo');
        if (select) {
          select.value = selectedValue;
          select.dispatchEvent(new Event('change'));
        }
      } catch (error) {
        console.error('Error manually changing language:', error);
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.translate-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-50 translate-container">
      <div id="google_translate_element" className="hidden"></div>
      
      <div className="relative">
        <button 
          onClick={toggleTranslate}
          className="flex items-center gap-2 bg-black/70 hover:bg-black/90 text-white px-4 py-2 rounded-full transition-all"
        >
          <Languages size={18} />
          <span className="text-sm">{currentLanguage}</span>
        </button>
        
        {isOpen && (
          <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg p-2 shadow-lg min-w-[200px] border border-white/10">
            <div className="text-white text-sm mb-2">Select Language</div>
            <select 
              className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 text-sm"
              onChange={handleLanguageChange}
              value={currentLanguage}
            >
              {languages.map((lang, index) => (
                <option key={index} value={lang.value}>
                  {lang.text}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleGoogleTranslate; 