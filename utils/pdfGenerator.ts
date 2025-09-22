
// This assumes jspdf and html2canvas are loaded from a CDN in index.html
declare const jspdf: any;
declare const html2canvas: any;

export const generatePdf = async (element: HTMLElement) => {
  const { jsPDF } = jspdf;

  const canvas = await html2canvas(element, {
    scale: 2, // Higher scale for better quality
    useCORS: true,
  });

  const imgData = canvas.toDataURL('image/png');
  
  // A4 paper dimensions in mm: 210 x 297
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  
  const ratio = canvasWidth / canvasHeight;
  const imgHeight = pdfWidth / ratio;
  
  // Check if content exceeds one page
  let height = imgHeight;
  let position = 0;
  
  if (height > pdfHeight) {
    height = pdfHeight; // Max height for a page
  }

  pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
  let pageCount = 1;

  let remainingHeight = imgHeight - height;
  
  while (remainingHeight > 0) {
    position = -(height * pageCount);
    pdf.addPage();
    pageCount++;
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
    remainingHeight -= height;
  }
  
  pdf.save('resume.pdf');
};
