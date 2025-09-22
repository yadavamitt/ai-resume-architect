
import React from 'react';
import type { ResumeData } from '../types';

interface TemplateProps {
  data: ResumeData;
}

const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="font-sans text-sm text-text-primary" style={{ minHeight: '1123px' }}>
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-1/3 bg-primary text-white p-8">
          <h1 className="text-3xl font-bold">{personalInfo.fullName}</h1>
          <h2 className="text-lg font-light mt-1">{personalInfo.jobTitle}</h2>
          
          <div className="mt-10">
            <h3 className="text-sm font-semibold uppercase tracking-wider border-b-2 border-white/50 pb-1">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {personalInfo.email && <li>{personalInfo.email}</li>}
              {personalInfo.phone && <li>{personalInfo.phone}</li>}
              {personalInfo.address && <li>{personalInfo.address}</li>}
              {personalInfo.linkedin && <li>{personalInfo.linkedin}</li>}
              {personalInfo.website && <li>{personalInfo.website}</li>}
            </ul>
          </div>
          
          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider border-b-2 border-white/50 pb-1">Skills</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {skills.map((skill, index) => <li key={index}>{skill}</li>)}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider border-b-2 border-white/50 pb-1">Education</h3>
            <div className="mt-4">
              {education.map(edu => (
                <div key={edu.id} className="mb-4">
                  <h4 className="font-bold">{edu.degree}</h4>
                  <p className="text-sm">{edu.school}</p>
                  <p className="text-xs">{edu.location} | {edu.gradDate}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-2/3 p-8">
          <section>
            <h3 className="text-xl font-bold text-primary uppercase tracking-wider">Summary</h3>
            <p className="mt-4 text-text-secondary leading-relaxed">{summary}</p>
          </section>

          <section className="mt-8">
            <h3 className="text-xl font-bold text-primary uppercase tracking-wider">Experience</h3>
            <div className="mt-4">
              {experience.map(exp => (
                <div key={exp.id} className="mb-6">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-lg font-semibold">{exp.jobTitle}</h4>
                    <p className="text-sm text-dark-gray">{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <p className="text-md text-text-secondary">{exp.company} | {exp.location}</p>
                  <ul className="mt-2 list-disc list-inside text-text-secondary space-y-1">
                    {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^•\s*/, '')}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ModernTemplate;
