// This assumes html-docx-js is loaded from a CDN in index.html
declare const htmlDocx: any;

export const generateWord = async (element: HTMLElement, fileName: string = 'resume') => {
  if (!element) {
    console.error("Element for Word generation not found.");
    return;
  }
  
  // The html-docx-js library works by converting an HTML string.
  // We'll provide the outerHTML of the preview element.
  const content = element.outerHTML;

  // We wrap the content in a basic HTML structure with some styles
  // to improve formatting in the final Word document.
  // Note: CSS support in Word is limited; simple, inline styles work best.
  const static_html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          /* A simple reset and font styles for better Word rendering */
          body { 
            font-family: 'Inter', sans-serif; 
            font-size: 10pt;
            margin: 0.8in; /* Standard Word document margins */
          }
          ul { list-style-position: inside; padding-left: 0; }
          li { padding-left: 1em; text-indent: -1em; }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;
  
  try {
    // Convert the HTML string to a Blob
    const fileBuffer = htmlDocx.asBlob(static_html);
    
    // Create a temporary link to trigger the download
    const url = URL.createObjectURL(fileBuffer);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.docx`;
    document.body.appendChild(link);
    link.click();
    
    // Clean up the temporary link and URL object
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error("Error generating Word document:", error);
    alert("Could not generate Word document. Please try again.");
  }
};
