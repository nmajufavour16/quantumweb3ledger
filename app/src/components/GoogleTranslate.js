'use client';

import { useEffect, useState, useRef } from 'react';
import { Languages } from 'lucide-react';

const GoogleTranslate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [languages, setLanguages] = useState([]);
  const translateRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);

  // Define languages manually in case the API doesn't load properly
  const defaultLanguages = [
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
    { value: 'vi', text: 'Vietnamese' },
    { value: 'ig', text: 'Igbo' }
  ];

  useEffect(() => {
    // Set default languages initially
    setLanguages(defaultLanguages);
    setIsInitialized(true);

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      try {
        // Check if the Google Translate API is fully loaded
        if (!window.google || !window.google.translate || !window.google.translate.TranslateElement) {
          console.warn('Google Translate API not fully loaded yet');
          return;
        }

        // Check if InlineLayout is available
        if (!window.google.translate.TranslateElement.InlineLayout) {
          console.warn('Google Translate InlineLayout not available');
          return;
        }

        translateRef.current = new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'ar,zh-CN,fr,de,hi,id,it,ja,ko,pt,ru,es,th,tr,vi',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        );

        setApiLoaded(true);

        // Wait for the Google Translate element to be fully initialized
        setTimeout(() => {
          const select = document.querySelector('.goog-te-combo');
          if (select) {
            // Extract available languages
            const options = Array.from(select.options).map(option => ({
              value: option.value,
              text: option.text
            }));
            setLanguages(options);
            
            // Set up event listener for language changes
            select.addEventListener('change', (e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];
              setCurrentLanguage(selectedOption.text);
              setIsOpen(false);
            });
          }
        }, 1000);
      } catch (error) {
        console.error('Error initializing Google Translate:', error);
      }
    };

    // Check if Google Translate API is already loaded
    if (window.google && window.google.translate && window.google.translate.TranslateElement && window.google.translate.TranslateElement.InlineLayout) {
      window.googleTranslateElementInit();
    } else {
      // If not loaded, wait for the script to load
      const checkGoogleTranslate = setInterval(() => {
        if (window.google && window.google.translate && window.google.translate.TranslateElement && window.google.translate.TranslateElement.InlineLayout) {
          window.googleTranslateElementInit();
          clearInterval(checkGoogleTranslate);
        }
      }, 100);

      // Clear interval after 10 seconds to prevent infinite checking
      setTimeout(() => {
        clearInterval(checkGoogleTranslate);
      }, 10000);
    }

    // Cleanup function
    return () => {
      // No need to remove the script as it's added by the ClientGoogleTranslate component
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
    if (apiLoaded && window.google && window.google.translate) {
      try {
        const select = document.querySelector('.goog-te-combo');
        if (select) {
          select.value = selectedValue;
          select.dispatchEvent(new Event('change'));
        } else {
          // If select is not found, try to find it in the iframe
          const iframe = document.querySelector('.goog-te-menu-frame');
          if (iframe) {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const selectElement = iframeDoc.querySelector('select.goog-te-combo');
            if (selectElement) {
              selectElement.value = selectedValue;
              selectElement.dispatchEvent(new Event('change'));
            }
          }
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

export default GoogleTranslate; 
