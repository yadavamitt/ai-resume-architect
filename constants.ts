import { ResumeData } from './types';

export const INITIAL_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: "Alex Doe",
    jobTitle: "Senior Frontend Developer",
    email: "alex.doe@example.com",
    phone: "(123) 456-7890",
    address: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexdoe",
    website: "alexdoe.dev",
    photoUrl: ""
  },
  summary: "Innovative Senior Frontend Developer with 8+ years of experience building and maintaining responsive and scalable web applications. Proficient in React, TypeScript, and modern JavaScript frameworks. Passionate about creating seamless user experiences and writing clean, efficient code.",
  experience: [
    {
      id: "exp1",
      jobTitle: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      startDate: "Jan 2020",
      endDate: "Present",
      description: "• Led the development of a new customer-facing dashboard using React, TypeScript, and Redux, resulting in a 20% increase in user engagement.\n• Mentored junior developers and conducted code reviews to ensure code quality and best practices.\n• Collaborated with UI/UX designers to translate wireframes and mockups into high-quality, functional components."
    },
    {
      id: "exp2",
      jobTitle: "Frontend Developer",
      company: "Web Innovators",
      location: "Boston, MA",
      startDate: "Jun 2016",
      endDate: "Dec 2019",
      description: "• Developed and maintained client websites using HTML, CSS, JavaScript, and jQuery.\n• Optimized web applications for speed and performance, improving load times by 30%.\n• Worked closely with the backend team to integrate APIs and ensure seamless data flow."
    }
  ],
  education: [
    {
      id: "edu1",
      degree: "B.S. in Computer Science",
      school: "University of Technology",
      location: "Cambridge, MA",
      gradDate: "May 2016"
    }
  ],
  skills: ["React", "TypeScript", "JavaScript (ES6+)", "Next.js", "GraphQL", "Node.js", "Tailwind CSS", "Webpack", "Jest", "CI/CD", "Agile Methodologies"]
};
