import React from 'react';
import type { ResumeData } from '../types';

interface TemplateProps {
  data: ResumeData;
}

const MinimalistTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills } = data;
  
  const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <section className={`mb-8 ${className}`}>
      <h3 className="text-xs font-bold uppercase text-dark-gray tracking-[.2em] mb-4">{title}</h3>
      {children}
    </section>
  );

  return (
    <div className="bg-white p-12 font-sans text-text-primary" style={{ minHeight: '1123px' }}>
      <header className="text-left mb-12">
        <h1 className="text-5xl font-serif font-bold tracking-tight">{personalInfo.fullName}</h1>
        <h2 className="text-xl font-sans font-light text-text-secondary mt-2">{personalInfo.jobTitle}</h2>
        <div className="flex items-center space-x-3 mt-4 text-xs text-dark-gray">
          <span>{personalInfo.email}</span>
          <span>/</span>
          <span>{personalInfo.phone}</span>
          <span>/</span>
          <span>{personalInfo.linkedin}</span>
           <span>/</span>
          <span>{personalInfo.website}</span>
        </div>
      </header>

      <hr className="mb-12 border-medium-gray" />

      <main>
        <Section title="Profile">
          <p className="text-sm leading-loose text-text-secondary">{summary}</p>
        </Section>
        
        <Section title="Experience">
          {experience.map(exp => (
            <div key={exp.id} className="mb-6 grid grid-cols-4 gap-4">
              <div className="col-span-1 text-xs text-dark-gray">
                <p>{exp.startDate} - {exp.endDate}</p>
                <p>{exp.location}</p>
              </div>
              <div className="col-span-3">
                <h4 className="text-md font-semibold">{exp.jobTitle}</h4>
                <p className="text-sm text-text-secondary">{exp.company}</p>
                <ul className="mt-2 text-text-secondary space-y-1 text-xs leading-relaxed">
                 {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^•\s*/, '')}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </Section>
        
        <Section title="Education">
           {education.map(edu => (
            <div key={edu.id} className="grid grid-cols-4 gap-4 mb-2">
              <div className="col-span-1 text-xs text-dark-gray">
                 <p>{edu.gradDate}</p>
              </div>
              <div className="col-span-3">
                <h4 className="text-md font-semibold">{edu.degree}</h4>
                <p className="text-sm text-text-secondary">{edu.school}, {edu.location}</p>
              </div>
            </div>
           ))}
        </Section>
        
        <Section title="Skills">
          <p className="text-sm leading-relaxed text-text-secondary">{skills.join(', ')}</p>
        </Section>
      </main>
    </div>
  );
};

export default MinimalistTemplate;
