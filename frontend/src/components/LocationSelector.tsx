import React, { useState, useEffect } from 'react';
import { indiaStatesDistricts, languages, State, District } from '../data/indiaStatesDistricts';

interface LocationSelectorProps {
  onLocationChange?: (state: string, district: string) => void;
  onLanguageChange?: (language: string) => void;
  className?: string;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  onLocationChange,
  onLanguageChange,
  className = ""
}) => {
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [availableDistricts, setAvailableDistricts] = useState<District[]>([]);
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  useEffect(() => {
    if (selectedState) {
      const state = indiaStatesDistricts.find(s => s.code === selectedState);
      if (state) {
        setAvailableDistricts(state.districts);
        setSelectedDistrict(''); // Reset district when state changes
      }
    } else {
      setAvailableDistricts([]);
      setSelectedDistrict('');
    }
  }, [selectedState]);

  useEffect(() => {
    if (onLocationChange && selectedState && selectedDistrict) {
      const stateName = indiaStatesDistricts.find(s => s.code === selectedState)?.name || '';
      const districtName = availableDistricts.find(d => d.code === selectedDistrict)?.name || '';
      onLocationChange(stateName, districtName);
    }
  }, [selectedState, selectedDistrict, onLocationChange, availableDistricts]);

  useEffect(() => {
    if (onLanguageChange) {
      onLanguageChange(selectedLanguage);
    }
  }, [selectedLanguage, onLanguageChange]);

  const handleStateSelect = (stateCode: string) => {
    setSelectedState(stateCode);
    setIsStateDropdownOpen(false);
  };

  const handleDistrictSelect = (districtCode: string) => {
    setSelectedDistrict(districtCode);
    setIsDistrictDropdownOpen(false);
  };

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setIsLanguageDropdownOpen(false);
  };

  const selectedStateName = indiaStatesDistricts.find(s => s.code === selectedState)?.name || 'Select State';
  const selectedDistrictName = availableDistricts.find(d => d.code === selectedDistrict)?.name || 'Select District';
  const selectedLanguageName = languages.find(l => l.code === selectedLanguage)?.nativeName || 'English';

  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      {/* State Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
          className="w-full sm:w-48 px-4 py-3 bg-gradient-to-r from-purple-800/40 to-indigo-800/40 border border-cyan-400/30 rounded-xl text-white font-medium text-left flex items-center justify-between hover:from-purple-700/50 hover:to-indigo-700/50 transition-all backdrop-blur-sm shadow-lg"
        >
          <span className="truncate">{selectedStateName}</span>
          <svg className={`w-5 h-5 text-cyan-300 transition-transform ${isStateDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isStateDropdownOpen && (
          <div className="absolute z-50 w-full mt-2 bg-gradient-to-br from-purple-900/95 to-indigo-900/95 border border-cyan-400/30 rounded-xl shadow-2xl backdrop-blur-md max-h-60 overflow-y-auto">
            {indiaStatesDistricts.map((state) => (
              <button
                key={state.code}
                onClick={() => handleStateSelect(state.code)}
                className="w-full px-4 py-3 text-left text-purple-100 hover:bg-cyan-400/20 hover:text-white transition-colors first:rounded-t-xl last:rounded-b-xl"
              >
                {state.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* District Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsDistrictDropdownOpen(!isDistrictDropdownOpen)}
          disabled={!selectedState}
          className={`w-full sm:w-48 px-4 py-3 border rounded-xl text-left flex items-center justify-between transition-all backdrop-blur-sm shadow-lg ${
            selectedState 
              ? 'bg-gradient-to-r from-purple-800/40 to-indigo-800/40 border-cyan-400/30 text-white font-medium hover:from-purple-700/50 hover:to-indigo-700/50' 
              : 'bg-gray-600/40 border-gray-500/30 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span className="truncate">{selectedDistrictName}</span>
          <svg className={`w-5 h-5 transition-transform ${isDistrictDropdownOpen ? 'rotate-180' : ''} ${selectedState ? 'text-cyan-300' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isDistrictDropdownOpen && selectedState && (
          <div className="absolute z-50 w-full mt-2 bg-gradient-to-br from-purple-900/95 to-indigo-900/95 border border-cyan-400/30 rounded-xl shadow-2xl backdrop-blur-md max-h-60 overflow-y-auto">
            {availableDistricts.map((district) => (
              <button
                key={district.code}
                onClick={() => handleDistrictSelect(district.code)}
                className="w-full px-4 py-3 text-left text-purple-100 hover:bg-cyan-400/20 hover:text-white transition-colors first:rounded-t-xl last:rounded-b-xl"
              >
                {district.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Language Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
          className="w-full sm:w-40 px-4 py-3 bg-gradient-to-r from-purple-800/40 to-indigo-800/40 border border-cyan-400/30 rounded-xl text-white font-medium text-left flex items-center justify-between hover:from-purple-700/50 hover:to-indigo-700/50 transition-all backdrop-blur-sm shadow-lg"
        >
          <span className="truncate">{selectedLanguageName}</span>
          <svg className={`w-5 h-5 text-cyan-300 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isLanguageDropdownOpen && (
          <div className="absolute z-50 w-full mt-2 bg-gradient-to-br from-purple-900/95 to-indigo-900/95 border border-cyan-400/30 rounded-xl shadow-2xl backdrop-blur-md max-h-60 overflow-y-auto">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                className="w-full px-4 py-3 text-left text-purple-100 hover:bg-cyan-400/20 hover:text-white transition-colors first:rounded-t-xl last:rounded-b-xl"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{language.nativeName}</span>
                  <span className="text-sm text-purple-300">{language.name}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSelector;
