import React, { useState, useCallback, useEffect } from 'react';
import type { ResumeData, Experience, Education } from '../types';
import { GoogleGenAI } from '@google/genai';
import { AddIcon, DeleteIcon, MagicIcon, ChevronDownIcon, ResetIcon, WarningIcon } from './icons';
import { INITIAL_RESUME_DATA } from '../constants';

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="border-b border-medium-gray/70 dark:border-gray-700/70 last:border-b-0 pb-6 mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left mb-2 group"
        aria-expanded={isOpen}
      >
        <h2 className="text-xl font-bold text-text-primary dark:text-gray-200 group-hover:text-primary transition-colors">{title}</h2>
        <span className={`text-muted dark:text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDownIcon />
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px]' : 'max-h-0'}`}>
        <div className="pt-4">
          {children}
        </div>
      </div>
    </div>
  );
};


const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
  <div>
    <label className="block text-xs font-semibold text-muted dark:text-gray-400 mb-1.5 uppercase tracking-wider">{label}</label>
    <input className="w-full bg-secondary/60 dark:bg-gray-700/50 text-text-primary dark:text-gray-200 py-2 px-3 border-2 border-transparent rounded-lg focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-primary transition-all duration-200" {...props} />
  </div>
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, ...props }) => (
  <div>
    <label className="block text-xs font-semibold text-muted dark:text-gray-400 mb-1.5 uppercase tracking-wider">{label}</label>
    <textarea rows={5} className="w-full bg-secondary/60 dark:bg-gray-700/50 text-text-primary dark:text-gray-200 py-2 px-3 border-2 border-transparent rounded-lg focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-primary transition-all duration-200" {...props}></textarea>
  </div>
);


const ResumeForm: React.FC<ResumeFormProps> = ({ resumeData, setResumeData }) => {

  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isGeneratingSkills, setIsGeneratingSkills] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') {
        setIsResetModalOpen(false);
       }
    };
    if (isResetModalOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isResetModalOpen]);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value }
    }));
  };
  
  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeData(prev => ({ ...prev, summary: e.target.value }));
  };

  const generateSummary = useCallback(async () => {
    setIsGeneratingSummary(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const prompt = `Based on the following resume experience and skills, write a professional and concise summary of 2-4 sentences.
      Experience: ${JSON.stringify(resumeData.experience)}
      Skills: ${resumeData.skills.join(', ')}`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      
      const generatedText = response.text;
      if (generatedText) {
        setResumeData(prev => ({ ...prev, summary: generatedText }));
      }

    } catch (error) {
      console.error("Error generating summary:", error);
      alert("Failed to generate summary. Please check your API key and try again.");
    } finally {
      setIsGeneratingSummary(false);
    }
  }, [resumeData.experience, resumeData.skills, setResumeData]);

  const generateSkills = useCallback(async () => {
    setIsGeneratingSkills(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const prompt = `Based on the job title "${resumeData.personalInfo.jobTitle}" and the following work experience, suggest a list of 10-15 relevant technical and soft skills. Return the skills as a single comma-separated string.
      Experience: ${resumeData.experience.map(e => e.description).join('\n')}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      const generatedText = response.text;
      if (generatedText) {
        const newSkills = generatedText.split(',').map(skill => skill.trim()).filter(Boolean);
        setResumeData(prev => {
          const existingSkills = new Set(prev.skills);
          newSkills.forEach(skill => existingSkills.add(skill));
          return { ...prev, skills: Array.from(existingSkills) };
        });
      }
    } catch (error) {
      console.error("Error generating skills:", error);
      alert("Failed to generate skills. Please check your API key and try again.");
    } finally {
      setIsGeneratingSkills(false);
    }
  }, [resumeData.personalInfo.jobTitle, resumeData.experience, setResumeData]);

  const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newExperience = [...resumeData.experience];
    newExperience[index] = { ...newExperience[index], [name]: value };
    setResumeData(prev => ({ ...prev, experience: newExperience }));
  };

  const addExperience = () => {
    const newExp: Experience = { id: `exp${Date.now()}`, jobTitle: '', company: '', location: '', startDate: '', endDate: '', description: '' };
    setResumeData(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
  };
  
  const removeExperience = (id: string) => {
    setResumeData(prev => ({ ...prev, experience: prev.experience.filter(exp => exp.id !== id) }));
  };

  const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [name]: value };
    setResumeData(prev => ({ ...prev, education: newEducation }));
  };

  const addEducation = () => {
    const newEdu: Education = { id: `edu${Date.now()}`, degree: '', school: '', location: '', gradDate: '' };
    setResumeData(prev => ({ ...prev, education: [...prev.education, newEdu] }));
  };
  
  const removeEducation = (id: string) => {
    setResumeData(prev => ({ ...prev, education: prev.education.filter(edu => edu.id !== id) }));
  };
  
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeData(prev => ({ ...prev, skills: e.target.value.split(',').map(skill => skill.trim()) }));
  };

  const handleResetForm = () => {
    setResumeData(INITIAL_RESUME_DATA);
    setIsResetModalOpen(false);
    // Optional: scroll to the top of the form after reset
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div>
      <Section title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <Input label="Full Name" name="fullName" value={resumeData.personalInfo.fullName} onChange={handlePersonalInfoChange} />
          <Input label="Job Title" name="jobTitle" value={resumeData.personalInfo.jobTitle} onChange={handlePersonalInfoChange} />
          <Input label="Email" name="email" type="email" value={resumeData.personalInfo.email} onChange={handlePersonalInfoChange} />
          <Input label="Phone" name="phone" type="tel" value={resumeData.personalInfo.phone} onChange={handlePersonalInfoChange} />
          <Input label="Address" name="address" value={resumeData.personalInfo.address} onChange={handlePersonalInfoChange} />
          <Input label="LinkedIn" name="linkedin" value={resumeData.personalInfo.linkedin} onChange={handlePersonalInfoChange} />
          <Input label="Website" name="website" value={resumeData.personalInfo.website} onChange={handlePersonalInfoChange} />
          <div className="md:col-span-2">
             <Input label="Photo URL (for creative templates)" name="photoUrl" value={resumeData.personalInfo.photoUrl} onChange={handlePersonalInfoChange} placeholder="https://example.com/your-photo.jpg"/>
          </div>
        </div>
      </Section>
      
      <Section title="Professional Summary">
        <div>
          <Textarea label="Summary" value={resumeData.summary} onChange={handleSummaryChange} />
          <div className="flex justify-end mt-2">
             <button 
                onClick={generateSummary}
                disabled={isGeneratingSummary}
                className="flex items-center space-x-2 bg-primary/10 hover:bg-primary/20 text-primary font-semibold py-1.5 px-3 rounded-full text-sm transition-colors duration-200 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-wait dark:bg-primary/20 dark:hover:bg-primary/30 dark:disabled:bg-gray-600 dark:disabled:text-gray-400"
                >
                <MagicIcon />
                <span>{isGeneratingSummary ? 'Generating...' : 'AI Generate'}</span>
              </button>
          </div>
        </div>
      </Section>
      
      <Section title="Work Experience">
        <div className="space-y-4">
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="bg-secondary/60 dark:bg-gray-700/50 p-4 rounded-lg relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-4">
                <Input label="Job Title" name="jobTitle" value={exp.jobTitle} onChange={(e) => handleExperienceChange(index, e)} />
                <Input label="Company" name="company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} />
                <Input label="Location" name="location" value={exp.location} onChange={(e) => handleExperienceChange(index, e)} />
                <Input label="Start Date" name="startDate" value={exp.startDate} onChange={(e) => handleExperienceChange(index, e)} />
                <Input label="End Date" name="endDate" value={exp.endDate} onChange={(e) => handleExperienceChange(index, e)} />
              </div>
              <Textarea label="Description" name="description" value={exp.description} onChange={(e) => handleExperienceChange(index, e)} />
               <button onClick={() => removeExperience(exp.id)} className="absolute top-3 right-3 text-muted dark:text-gray-400 hover:text-red-500 transition-colors">
                <DeleteIcon />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addExperience} className="mt-4 flex items-center space-x-2 bg-secondary text-primary font-semibold hover:bg-primary/20 py-2 px-4 rounded-lg transition-colors dark:bg-primary/20 dark:hover:bg-primary/30">
          <AddIcon />
          <span>Add Experience</span>
        </button>
      </Section>

      <Section title="Education">
        <div className="space-y-4">
          {resumeData.education.map((edu, index) => (
             <div key={edu.id} className="bg-secondary/60 dark:bg-gray-700/50 p-4 rounded-lg relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  <Input label="Degree" name="degree" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} />
                  <Input label="School" name="school" value={edu.school} onChange={(e) => handleEducationChange(index, e)} />
                  <Input label="Location" name="location" value={edu.location} onChange={(e) => handleEducationChange(index, e)} />
                  <Input label="Graduation Date" name="gradDate" value={edu.gradDate} onChange={(e) => handleEducationChange(index, e)} />
                </div>
                <button onClick={() => removeEducation(edu.id)} className="absolute top-3 right-3 text-muted dark:text-gray-400 hover:text-red-500 transition-colors">
                  <DeleteIcon />
                </button>
              </div>
          ))}
        </div>
        <button onClick={addEducation} className="mt-4 flex items-center space-x-2 bg-secondary text-primary font-semibold hover:bg-primary/20 py-2 px-4 rounded-lg transition-colors dark:bg-primary/20 dark:hover:bg-primary/30">
          <AddIcon />
          <span>Add Education</span>
        </button>
      </Section>
      
      <Section title="Skills">
         <div>
            <label className="block text-xs font-semibold text-muted dark:text-gray-400 mb-1.5 uppercase tracking-wider">Skills (comma separated)</label>
            <div className="relative">
              <input
                className="w-full bg-secondary/60 dark:bg-gray-700/50 text-text-primary dark:text-gray-200 py-2 pl-3 pr-36 rounded-lg focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-primary transition-all duration-200"
                value={resumeData.skills.join(', ')}
                onChange={handleSkillsChange}
                placeholder="e.g., React, TypeScript, Node.js"
              />
              <button
                onClick={generateSkills}
                disabled={isGeneratingSkills}
                className="absolute inset-y-0 right-2 my-auto h-fit flex items-center space-x-2 bg-primary/10 hover:bg-primary/20 text-primary font-semibold py-1.5 px-3 rounded-full text-sm transition-colors duration-200 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-wait dark:bg-primary/20 dark:hover:bg-primary/30 dark:disabled:bg-gray-600 dark:disabled:text-gray-400"
              >
                <MagicIcon />
                <span>{isGeneratingSkills ? 'Suggesting...' : 'AI Suggest'}</span>
              </button>
            </div>
          </div>
      </Section>
      
      <div className="mt-8 pt-6 border-t border-medium-gray/70 dark:border-gray-700/70 flex justify-end">
        <button
          type="button"
          onClick={() => setIsResetModalOpen(true)}
          className="flex items-center space-x-2 text-sm font-semibold text-muted dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
        >
          <ResetIcon />
          <span>Reset Form to Default</span>
        </button>
      </div>

      {isResetModalOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsResetModalOpen(false)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full animate-fade-in-up"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="flex items-start space-x-4">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/50 sm:mx-0 sm:h-10 sm:w-10">
                    <WarningIcon />
                </div>
                <div className="mt-0 text-left">
                    <h3 className="text-lg leading-6 font-bold text-text-primary dark:text-gray-100">
                        Reset Form
                    </h3>
                    <div className="mt-2">
                        <p className="text-sm text-text-secondary dark:text-gray-400">
                            Are you sure you want to reset the form? All your current changes will be lost and the form will be reset to the default example data.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse sm:px-2">
                <button
                    type="button"
                    onClick={handleResetForm}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
                >
                    Reset
                </button>
                <button
                    type="button"
                    onClick={() => setIsResetModalOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-500 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-text-secondary dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:w-auto sm:text-sm transition-colors"
                >
                    Cancel
                </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ResumeForm;