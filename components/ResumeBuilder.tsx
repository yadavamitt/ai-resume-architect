import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ResumeData, TemplateKey } from '../types';
import { INITIAL_RESUME_DATA } from '../constants';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import { DownloadIcon, BrandIcon, PlusIcon, MinusIcon, ExpandIcon, ChevronDownIcon, WordIcon, PdfIcon, SunIcon, MoonIcon } from './icons';
import { generatePdf } from '../utils/pdfGenerator';
import { generateWord } from '../utils/wordGenerator';
import TemplateSelector from './TemplateSelector';

const RESUME_CONTENT_WIDTH = 794; // A4 width in pixels at 96 DPI

interface ResumeBuilderProps {
  onGoHome: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ onGoHome, isDarkMode, toggleTheme }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('modern');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadDropdownOpen, setIsDownloadDropdownOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  
  const previewRef = useRef<HTMLDivElement>(null);
  const previewWrapperRef = useRef<HTMLDivElement>(null);
  const downloadDropdownRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = useCallback(async () => {
    setIsDownloadDropdownOpen(false);
    if (previewRef.current) {
      setIsDownloading(true);
      // Brief timeout to allow UI to update before heavy task
      setTimeout(async () => {
        try {
          await generatePdf(previewRef.current);
        } catch (error) {
          console.error("Failed to generate PDF:", error);
          alert("Could not generate PDF. Please try again.");
        } finally {
          setIsDownloading(false);
        }
      }, 100);
    }
  }, []);
  
  const handleDownloadWord = useCallback(async () => {
    setIsDownloadDropdownOpen(false);
    if (previewRef.current) {
      setIsDownloading(true);
      setTimeout(async () => {
        try {
          await generateWord(previewRef.current);
        } catch (error) {
          console.error("Failed to generate Word doc:", error);
          alert("Could not generate Word document. Please try again.");
        } finally {
          setIsDownloading(false);
        }
      }, 100);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (downloadDropdownRef.current && !downloadDropdownRef.current.contains(event.target as Node)) {
        setIsDownloadDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFitScreen = useCallback(() => {
    if (previewWrapperRef.current) {
      const availableWidth = previewWrapperRef.current.clientWidth;
      const newZoom = (availableWidth - 32) / RESUME_CONTENT_WIDTH;
      setZoom(newZoom);
    }
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(handleFitScreen);
    const currentWrapper = previewWrapperRef.current;
    
    if (currentWrapper) observer.observe(currentWrapper);
    handleFitScreen();

    return () => {
      if (currentWrapper) observer.unobserve(currentWrapper);
    };
  }, [handleFitScreen]);

  const handleZoomIn = () => setZoom(prev => Math.min(2, prev + 0.15));
  const handleZoomOut = () => setZoom(prev => Math.max(0.2, prev - 0.15));

  return (
    <div className="min-h-screen bg-bg-main dark:bg-gray-900 font-sans text-text-primary flex flex-col transition-colors duration-300">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-20 border-b border-medium-gray/70 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <button onClick={onGoHome} className="flex items-center space-x-3 group transition-opacity hover:opacity-80">
              <BrandIcon />
              <h1 className="text-xl font-bold text-text-primary dark:text-gray-200">AI Resume Architect</h1>
            </button>
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-muted dark:text-gray-400 hover:bg-secondary dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
            >
                {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8 flex-grow w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto p-6 lg:p-8 order-2 lg:order-1 transition-colors duration-300">
            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
          </div>

          <div className="lg:sticky top-[88px] order-1 lg:order-2">
            <div className="flex flex-col gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 flex flex-col sm:flex-row flex-wrap justify-between items-center gap-3 transition-colors duration-300">
                <div className="w-full sm:w-auto">
                  <TemplateSelector selected={selectedTemplate} onSelect={setSelectedTemplate} />
                </div>
                <div className="w-full sm:w-auto flex items-center justify-center sm:justify-end gap-3">
                  <div className="flex items-center justify-center bg-secondary dark:bg-gray-700 rounded-lg p-0.5">
                    <button onClick={handleZoomOut} title="Zoom Out" className="p-1.5 text-muted dark:text-gray-400 hover:bg-medium-gray/60 dark:hover:bg-gray-600 rounded-md transition-colors"><MinusIcon /></button>
                    <button onClick={handleFitScreen} title="Fit to Screen" className="p-1.5 text-muted dark:text-gray-400 hover:bg-medium-gray/60 dark:hover:bg-gray-600 rounded-md transition-colors"><ExpandIcon /></button>
                    <button onClick={handleZoomIn} title="Zoom In" className="p-1.5 text-muted dark:text-gray-400 hover:bg-medium-gray/60 dark:hover:bg-gray-600 rounded-md transition-colors"><PlusIcon /></button>
                  </div>
                  
                  <div ref={downloadDropdownRef} className="relative">
                    <button
                      onClick={() => setIsDownloadDropdownOpen(prev => !prev)}
                      disabled={isDownloading}
                      className="flex items-center justify-center space-x-2 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      <DownloadIcon />
                      <span>{isDownloading ? 'Downloading...' : 'Download'}</span>
                       <span className="border-l border-white/30 pl-2">
                          <ChevronDownIcon />
                       </span>
                    </button>
                    {isDownloadDropdownOpen && (
                      <div className="absolute top-full right-0 mt-2 w-52 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-medium-gray/50 dark:border-gray-600 py-1 z-10">
                        <button onClick={handleDownloadPdf} className="w-full flex items-center space-x-3 text-left px-3 py-2 text-sm text-text-secondary dark:text-gray-300 hover:bg-secondary dark:hover:bg-gray-600 transition-colors">
                          <PdfIcon /> <span>Download as PDF</span>
                        </button>
                        <button onClick={handleDownloadWord} className="w-full flex items-center space-x-3 text-left px-3 py-2 text-sm text-text-secondary dark:text-gray-300 hover:bg-secondary dark:hover:bg-gray-600 transition-colors">
                          <WordIcon /> <span>Download as Word Doc</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div ref={previewWrapperRef} className="w-full lg:max-h-[calc(100vh-210px)] overflow-auto rounded-xl bg-light-gray/60 dark:bg-gray-800/50 p-4 shadow-inner transition-colors duration-300">
                <div 
                  className="w-[794px] mx-auto" 
                  style={{ 
                    transform: `scale(${zoom})`, 
                    transformOrigin: 'top center',
                    transition: 'transform 0.2s ease-out'
                  }}
                >
                  <ResumePreview ref={previewRef} data={resumeData} template={selectedTemplate} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-light-gray dark:bg-gray-800 border-t border-medium-gray/80 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-dark-gray dark:text-gray-400">&copy; {new Date().getFullYear()} AI Resume Architect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ResumeBuilder;