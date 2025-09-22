import React, { useState, useRef, useEffect } from 'react';
import type { TemplateKey } from '../types';
import { ChevronDownIcon, CheckIcon } from './icons';

interface TemplateSelectorProps {
  selected: TemplateKey;
  onSelect: (template: TemplateKey) => void;
}

const templates: { key: TemplateKey; name: string }[] = [
  { key: 'modern', name: 'Modern' },
  { key: 'classic', name: 'Classic' },
  { key: 'creative', name: 'Creative' },
  { key: 'minimalist', name: 'Minimalist' },
  { key: 'professional', name: 'Professional' },
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedTemplateName = templates.find(t => t.key === selected)?.name;

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  
  const handleSelect = (templateKey: TemplateKey) => {
    onSelect(templateKey);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full sm:w-48" ref={wrapperRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-secondary dark:bg-gray-700 text-text-secondary dark:text-gray-300 font-semibold py-2 px-3 rounded-lg transition-colors duration-200 hover:bg-medium-gray/60 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-sm">Template: {selectedTemplateName}</span>
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDownIcon />
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 top-full mt-2 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-medium-gray/50 dark:border-gray-700 py-1" role="listbox">
          {templates.map(({ key, name }) => (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between transition-colors duration-150 ${
                selected === key ? 'text-primary font-semibold' : 'text-text-secondary dark:text-gray-300 hover:bg-secondary dark:hover:bg-gray-700'
              }`}
              role="option"
              aria-selected={selected === key}
            >
              {name}
              {selected === key && <CheckIcon />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;