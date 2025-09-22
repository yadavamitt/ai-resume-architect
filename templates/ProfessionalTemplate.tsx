import React from 'react';
import type { ResumeData } from '../types';

interface TemplateProps {
  data: ResumeData;
}

const ProfessionalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills } = data;
  
  const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <section className={`mb-5 ${className}`}>
      <h3 className="text-md font-bold uppercase text-primary tracking-wider border-b-2 border-medium-gray pb-1 mb-3">{title}</h3>
      {children}
    </section>
  );

  return (
    <div className="bg-white p-8 font-serif text-sm text-text-primary" style={{ minHeight: '1123px' }}>
      <header className="text-center mb-6 pb-4 border-b-4 border-primary">
        <h1 className="text-4xl font-bold tracking-tight">{personalInfo.fullName}</h1>
        <h2 className="text-lg font-light text-dark-gray mt-1">{personalInfo.jobTitle}</h2>
      </header>
      
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column (Main Content) */}
        <main className="col-span-2">
          <Section title="Summary">
            <p className="leading-relaxed text-text-secondary">{summary}</p>
          </Section>
          
          <Section title="Experience">
            {experience.map(exp => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{exp.jobTitle}</h4>
                    <p className="text-xs font-semibold text-text-secondary">{exp.company} | {exp.location}</p>
                  </div>
                  <p className="text-xs text-dark-gray font-sans">{exp.startDate} - {exp.endDate}</p>
                </div>
                <ul className="mt-1 list-disc list-inside text-text-secondary space-y-1 text-xs">
                  {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^•\s*/, '')}</li>)}
                </ul>
              </div>
            ))}
          </Section>
        </main>
        
        {/* Right Column (Sidebar) */}
        <aside className="col-span-1">
          <Section title="Contact">
            <ul className="space-y-1 text-xs text-text-secondary">
              <li>{personalInfo.email}</li>
              <li>{personalInfo.phone}</li>
              <li>{personalInfo.address}</li>
              <li className="text-primary hover:underline"><a href={`https://${personalInfo.linkedin}`}>{personalInfo.linkedin}</a></li>
              <li className="text-primary hover:underline"><a href={`https://${personalInfo.website}`}>{personalInfo.website}</a></li>
            </ul>
          </Section>
          
          <Section title="Education">
             {education.map(edu => (
              <div key={edu.id} className="mb-3">
                <h4 className="font-bold">{edu.degree}</h4>
                <p className="text-xs font-semibold text-text-secondary">{edu.school}</p>
                <p className="text-xs text-dark-gray">{edu.gradDate}</p>
              </div>
             ))}
          </Section>
          
          <Section title="Skills">
            <ul className="list-disc list-inside text-xs text-text-secondary">
                {skills.map((skill, index) => <li key={index}>{skill}</li>)}
            </ul>
          </Section>
        </aside>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
