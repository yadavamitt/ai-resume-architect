// This assumes XLSX (SheetJS) is loaded from a CDN in index.html
declare const XLSX: any;

import type { ResumeData } from '../types';

export const generateExcel = (data: ResumeData) => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // --- Personal Info & Summary Sheet ---
  const infoAndSummaryData = [
    ["Full Name", data.personalInfo.fullName],
    ["Job Title", data.personalInfo.jobTitle],
    ["Email", data.personalInfo.email],
    ["Phone", data.personalInfo.phone],
    ["Address", data.personalInfo.address],
    ["LinkedIn", data.personalInfo.linkedin],
    ["Website", data.personalInfo.website],
    [], // Spacer row
    ["Professional Summary"],
    [data.summary]
  ];
  const wsInfo = XLSX.utils.aoa_to_sheet(infoAndSummaryData);
  // Set column widths
  wsInfo['!cols'] = [{ wch: 20 }, { wch: 80 }];
  XLSX.utils.book_append_sheet(wb, wsInfo, "Info & Summary");

  // --- Experience Sheet ---
  // Exclude the internal 'id' property from the export
  const experienceData = data.experience.map(({ id, ...rest }) => rest);
  const wsExp = XLSX.utils.json_to_sheet(experienceData);
  wsExp['!cols'] = [
    { wch: 30 }, { wch: 30 }, { wch: 20 }, { wch: 15 }, { wch: 15 }, { wch: 100 }
  ];
  XLSX.utils.book_append_sheet(wb, wsExp, "Experience");

  // --- Education Sheet ---
  const educationData = data.education.map(({ id, ...rest }) => rest);
  const wsEdu = XLSX.utils.json_to_sheet(educationData);
  wsEdu['!cols'] = [
    { wch: 40 }, { wch: 40 }, { wch: 20 }, { wch: 20 }
  ];
  XLSX.utils.book_append_sheet(wb, wsEdu, "Education");

  // --- Skills Sheet ---
  const skillsData = data.skills.map(skill => ({ Skill: skill }));
  const wsSkills = XLSX.utils.json_to_sheet(skillsData);
  wsSkills['!cols'] = [{ wch: 50 }];
  XLSX.utils.book_append_sheet(wb, wsSkills, "Skills");

  // Trigger the file download
  XLSX.writeFile(wb, "resume.xlsx");
};