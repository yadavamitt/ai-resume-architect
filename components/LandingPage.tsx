import React from 'react';
import { BrandIcon, AiIcon, TemplatesIcon, PdfIcon, SunIcon, MoonIcon } from './icons';

interface LandingPageProps {
  onStartBuilding: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
    <div className="flex-shrink-0 bg-secondary dark:bg-gray-700 text-primary p-4 rounded-full">
      {icon}
    </div>
    <h3 className="mt-5 text-xl font-semibold text-text-primary dark:text-gray-200">{title}</h3>
    <p className="mt-2 text-text-secondary dark:text-gray-400">{children}</p>
  </div>
);

const HowItWorksStep: React.FC<{ number: string; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-6">
            <div className="flex items-center justify-center w-12 h-12 border-2 border-primary text-primary rounded-full font-bold text-lg">
                {number}
            </div>
            <div className="w-px h-full bg-medium-gray dark:bg-gray-700 mt-2"></div>
        </div>
        <div>
            <h3 className="text-xl font-semibold mb-2 text-text-primary dark:text-gray-200">{title}</h3>
            <p className="text-text-secondary dark:text-gray-400">{children}</p>
        </div>
    </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onStartBuilding, isDarkMode, toggleTheme }) => {
  return (
    <div className="bg-white dark:bg-gray-900 text-text-primary dark:text-gray-200 font-sans">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg sticky top-0 z-30 border-b border-medium-gray/80 dark:border-gray-700/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <BrandIcon />
              <h1 className="text-2xl font-bold">AI Resume Architect</h1>
            </div>
            <div className="flex items-center space-x-4">
               <button
                  onClick={onStartBuilding}
                  className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-5 rounded-lg transition-colors duration-200 shadow-sm"
                >
                  Create My Resume
                </button>
                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-muted dark:text-gray-400 hover:bg-secondary dark:hover:bg-gray-800 transition-colors"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <SunIcon /> : <MoonIcon />}
                </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-secondary to-white dark:from-gray-800/30 dark:to-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary dark:text-white tracking-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Craft Your Future, <span className="text-primary">Instantly.</span>
              </h1>
              <p className="mt-6 max-w-lg mx-auto lg:mx-0 text-lg text-text-secondary dark:text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Build a professional, AI-enhanced resume in minutes. Stand out from the crowd and land your dream job faster with our powerful and intuitive builder.
              </p>
              <button
                onClick={onStartBuilding}
                className="mt-10 bg-primary hover:bg-primary-dark text-white font-bold py-4 px-10 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg animate-fade-in-up"
                style={{ animationDelay: '0.6s' }}
              >
                Get Started for Free
              </button>
            </div>
            <div className="hidden lg:block relative animate-fade-in" style={{ animationDelay: '0.5s' }}>
               <div className="w-full max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 animate-subtle-bob">
                 <div className="flex items-center space-x-4 mb-5">
                   <div className="w-16 h-16 bg-medium-gray dark:bg-gray-700 rounded-full"></div>
                   <div className="flex-1 space-y-2">
                     <div className="h-4 bg-primary/80 rounded w-4/5"></div>
                     <div className="h-3 bg-medium-gray dark:bg-gray-600 rounded w-3/5"></div>
                   </div>
                 </div>
                 <div className="space-y-3">
                    <div className="h-3 bg-light-gray dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-light-gray dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-light-gray dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-5 bg-primary/20 dark:bg-primary/30 rounded w-1/3 mt-4"></div>
                    <div className="h-3 bg-light-gray dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-light-gray dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-light-gray dark:bg-gray-700 rounded w-3/4"></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-24 bg-light-gray dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary dark:text-gray-200">Everything You Need to Succeed</h2>
            <p className="mt-4 text-lg text-text-secondary dark:text-gray-400">Our features are designed to help you create a resume that truly stands out.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard icon={<AiIcon />} title="AI-Powered Writing">
              Let our AI assistant write your professional summary and job descriptions, tailored to your experience.
            </FeatureCard>
            <FeatureCard icon={<TemplatesIcon />} title="Stunning Templates">
              Choose from a variety of professionally designed templates to match your industry and personal style.
            </FeatureCard>
            <FeatureCard icon={<PdfIcon />} title="Instant PDF Download">
              Export your polished resume as a high-quality PDF, ready to impress recruiters and hiring managers.
            </FeatureCard>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 sm:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-text-primary dark:text-gray-200">Get Your Resume in 3 Easy Steps</h2>
                <p className="mt-4 text-lg text-text-secondary dark:text-gray-400">A straightforward process designed for speed and quality.</p>
            </div>
            <div className="space-y-12">
                <HowItWorksStep number="01" title="Fill In Your Details">
                    Easily add your personal info, work experience, education, and skills into our intuitive form.
                </HowItWorksStep>
                <HowItWorksStep number="02" title="Choose Your Template">
                    Select from our library of modern, professional, and creative templates to find the perfect look.
                </HowItWorksStep>
                <div className="flex">
                    <div className="flex flex-col items-center mr-6">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full font-bold text-lg">
                            03
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-text-primary dark:text-gray-200">Download & Apply</h3>
                        <p className="text-text-secondary dark:text-gray-400">Instantly download your resume as a high-quality PDF and start applying for your dream job.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-secondary dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-extrabold text-text-primary dark:text-gray-200 tracking-tight">Ready to Build Your Future?</h2>
              <p className="mt-4 text-lg text-text-secondary dark:text-gray-400">Join thousands of successful professionals who landed their dream jobs with our resume builder.</p>
              <button
                onClick={onStartBuilding}
                className="mt-8 bg-primary hover:bg-primary-dark text-white font-bold py-4 px-10 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Create My Resume Now
              </button>
          </div>
      </section>

      {/* Footer */}
      <footer className="bg-light-gray dark:bg-gray-800/50 border-t border-medium-gray/80 dark:border-gray-700/80">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-dark-gray dark:text-gray-400">&copy; {new Date().getFullYear()} AI Resume Architect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;