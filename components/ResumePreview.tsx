import React from 'react';
import type { ResumeData, TemplateKey } from '../types';
import ModernTemplate from '../templates/ModernTemplate';
import ClassicTemplate from '../templates/ClassicTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';
import MinimalistTemplate from '../templates/MinimalistTemplate';
import ProfessionalTemplate from '../templates/ProfessionalTemplate';

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateKey;
}

const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  creative: CreativeTemplate,
  minimalist: MinimalistTemplate,
  professional: ProfessionalTemplate,
};

const ResumePreview = React.forwardRef<HTMLDivElement, ResumePreviewProps>(({ data, template }, ref) => {
  const TemplateComponent = templates[template] || ModernTemplate;

  return (
    <div className="bg-white shadow-resume" ref={ref}>
      <TemplateComponent data={data} />
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;
