import React from 'react';
import type { ResumeData } from '../types';

interface TemplateProps {
  data: ResumeData;
}

const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills } = data;

  const PhotoPlaceholder = () => (
    <div className="w-32 h-32 rounded-full bg-medium-gray flex items-center justify-center mx-auto">
      <svg className="w-16 h-16 text-dark-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </div>
  );
  
  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-6">
      <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-b-2 border-primary pb-1 mb-3">{title}</h3>
      {children}
    </section>
  );

  return (
    <div className="font-sans text-text-primary" style={{ minHeight: '1123px' }}>
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-1/3 bg-light-gray p-6">
          <div className="text-center">
            {personalInfo.photoUrl ? (
                <img src={personalInfo.photoUrl} alt={personalInfo.fullName} className="w-32 h-32 rounded-full mx-auto object-cover" />
            ) : (
                <PhotoPlaceholder />
            )}
            <h1 className="text-2xl font-bold mt-4">{personalInfo.fullName}</h1>
            <h2 className="text-md text-dark-gray mt-1">{personalInfo.jobTitle}</h2>
          </div>
          
          <div className="mt-8 text-sm text-center">
            <h3 className="font-semibold uppercase text-dark-gray tracking-wider">Contact</h3>
             <ul className="mt-2 space-y-1 text-text-secondary">
                {personalInfo.email && <li>{personalInfo.email}</li>}
                {personalInfo.phone && <li>{personalInfo.phone}</li>}
                {personalInfo.address && <li>{personalInfo.address}</li>}
                {personalInfo.linkedin && <li>{personalInfo.linkedin}</li>}
                {personalInfo.website && <li>{personalInfo.website}</li>}
             </ul>
          </div>

          <div className="mt-8 text-sm">
            <h3 className="font-semibold uppercase text-dark-gray tracking-wider text-center">Skills</h3>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
                {skills.map((skill, index) => (
                    <span key={index} className="bg-medium-gray text-text-secondary text-xs font-semibold px-3 py-1 rounded-full">{skill}</span>
                ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-2/3 p-8">
          <Section title="Summary">
            <p className="text-sm leading-relaxed text-text-secondary">{summary}</p>
          </Section>

          <Section title="Experience">
            {experience.map(exp => (
              <div key={exp.id} className="mb-5">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-md font-bold">{exp.jobTitle}</h4>
                  <p className="text-xs text-dark-gray">{exp.startDate} - {exp.endDate}</p>
                </div>
                <p className="text-sm font-semibold text-text-secondary">{exp.company} | {exp.location}</p>
                <ul className="mt-2 list-disc list-inside text-text-secondary space-y-1 text-xs">
                  {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^•\s*/, '')}</li>)}
                </ul>
              </div>
            ))}
          </Section>

          <Section title="Education">
            {education.map(edu => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                   <h4 className="text-md font-bold">{edu.degree}</h4>
                   <p className="text-xs text-dark-gray">{edu.gradDate}</p>
                </div>
                <p className="text-sm font-semibold text-text-secondary">{edu.school} | {edu.location}</p>
              </div>
            ))}
          </Section>
        </main>
      </div>
    </div>
  );
};

export default CreativeTemplate;
