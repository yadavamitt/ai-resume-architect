
import React from 'react';
import type { ResumeData } from '../types';

interface TemplateProps {
  data: ResumeData;
}

const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills } = data;
  
  const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <section className={`mb-6 ${className}`}>
      <h3 className="text-lg font-bold uppercase text-text-secondary tracking-widest border-b-2 border-medium-gray pb-1 mb-3">{title}</h3>
      {children}
    </section>
  );

  return (
    <div className="bg-white p-10 font-serif text-text-primary" style={{ minHeight: '1123px' }}>
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">{personalInfo.fullName}</h1>
        <h2 className="text-xl font-normal text-dark-gray mt-1">{personalInfo.jobTitle}</h2>
        <div className="flex justify-center items-center space-x-4 mt-3 text-sm text-text-secondary">
          <span>{personalInfo.email}</span>
          <span>&bull;</span>
          <span>{personalInfo.phone}</span>
          <span>&bull;</span>
          <span>{personalInfo.address}</span>
        </div>
        <div className="flex justify-center items-center space-x-4 mt-1 text-sm text-primary">
          <a href={`https://${personalInfo.linkedin}`} className="hover:underline">{personalInfo.linkedin}</a>
          <a href={`https://${personalInfo.website}`} className="hover:underline">{personalInfo.website}</a>
        </div>
      </header>

      <main>
        <Section title="Summary">
          <p className="leading-relaxed text-text-secondary">{summary}</p>
        </Section>
        
        <Section title="Experience">
          {experience.map(exp => (
            <div key={exp.id} className="mb-5">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-md font-bold">{exp.jobTitle}</h4>
                  <p className="text-sm font-semibold text-text-secondary">{exp.company} &bull; {exp.location}</p>
                </div>
                <p className="text-sm text-dark-gray font-mono">{exp.startDate} - {exp.endDate}</p>
              </div>
              <ul className="mt-1 list-disc list-inside text-text-secondary space-y-1 text-sm">
                 {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^•\s*/, '')}</li>)}
              </ul>
            </div>
          ))}
        </Section>
        
        <Section title="Education">
           {education.map(edu => (
            <div key={edu.id} className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-md font-bold">{edu.degree}</h4>
                <p className="text-sm font-semibold text-text-secondary">{edu.school} &bull; {edu.location}</p>
              </div>
              <p className="text-sm text-dark-gray font-mono">{edu.gradDate}</p>
            </div>
           ))}
        </Section>
        
        <Section title="Skills">
          <p className="leading-relaxed text-text-secondary">{skills.join(' | ')}</p>
        </Section>
      </main>
    </div>
  );
};

export default ClassicTemplate;
