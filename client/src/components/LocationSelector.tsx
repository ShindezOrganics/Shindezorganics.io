import { useState, useEffect } from 'react';
import { getStates, getCitiesForState } from '@/data/locations';

interface LocationSelectorProps {
  selectedState?: string;
  selectedCity?: string;
  onStateChange: (state: string) => void;
  onCityChange: (city: string) => void;
  disabled?: boolean;
  showLabels?: boolean;
  className?: string;
}

export default function LocationSelector({
  selectedState = '',
  selectedCity = '',
  onStateChange,
  onCityChange,
  disabled = false,
  showLabels = true,
  className = ''
}: LocationSelectorProps) {
  const [states] = useState(getStates());
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    if (selectedState) {
      const stateCities = getCitiesForState(selectedState);
      setCities(stateCities);
      
      // If the current selected city is not available in the new state's cities, clear it
      if (selectedCity && !stateCities.includes(selectedCity)) {
        onCityChange('');
      }
    } else {
      setCities([]);
      if (selectedCity) {
        onCityChange('');
      }
    }
  }, [selectedState, selectedCity, onCityChange]);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    onStateChange(newState);
    // City will be cleared by the useEffect above
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCityChange(e.target.value);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* State Selection */}
      <div>
        {showLabels && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
        )}
        <select
          value={selectedState}
          onChange={handleStateChange}
          disabled={disabled}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-forest-green focus:border-forest-green disabled:bg-gray-100 disabled:cursor-not-allowed"
          required
        >
          <option value="">Select a state</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* City Selection */}
      <div>
        {showLabels && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
        )}
        <select
          value={selectedCity}
          onChange={handleCityChange}
          disabled={disabled || !selectedState || cities.length === 0}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-forest-green focus:border-forest-green disabled:bg-gray-100 disabled:cursor-not-allowed"
          required
        >
          <option value="">
            {!selectedState ? "Select a state first" : "Select a city"}
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}