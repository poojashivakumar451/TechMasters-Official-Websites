import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

/**
 * Generates a professional certificate PDF based on the institutional template.
 * @param {Object} student - The student enrollment details.
 * @returns {Promise<Uint8Array>} The PDF bytes.
 */
export const generateCertificatePDF = async (student) => {
  try {
    // 1. Create a fresh PDF document
    const pdfDoc = await PDFDocument.create();
    
    // 2. Add an A4 landscape page (typical for certificates)
    const page = pdfDoc.addPage([841.89, 595.28]); // A4 Landscape
    const { width, height } = page.getSize();

    // 3. Load the Template
    // We try to load the PDF template if it exists, otherwise we fallback to the image.
    let templateBytes;
    try {
      const response = await fetch('/certificate-template.pdf');
      if (!response.ok) throw new Error('PDF not found');
      templateBytes = await response.arrayBuffer();
      
      // If we got a PDF, we can embed its first page
      const [templatePage] = await pdfDoc.embedPdf(templateBytes);
      page.drawPage(templatePage, {
        x: 0,
        y: 0,
        width: width,
        height: height,
      });
    } catch (e) {
      console.warn('Certificate PDF template not found, trying image fallback...');
      // Fallback to the institutional image
      try {
        const imageResponse = await fetch('/logo.jpg'); // Fallback background
        const imageBytes = await imageResponse.arrayBuffer();
        const templateImage = await pdfDoc.embedJpg(imageBytes);
        page.drawImage(templateImage, {
          x: 0,
          y: 0,
          width: width,
          height: height,
        });
      } catch (imgErr) {
        console.error('No certificate template background found.');
      }
    }

    // 4. Load professional fonts
    const serifFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // 5. Overlay Dynamic Fields
    // (Coordinates based on the visual layout provided in Image 4)

    // Student Name (Center)
    const name = (student.name || 'Student Name').toUpperCase();
    const nameFontSize = 36;
    const nameWidth = serifFont.widthOfTextAtSize(name, nameFontSize);
    page.drawText(name, {
      x: (width - nameWidth) / 2,
      y: height * 0.48, // Centered on the blank line
      size: nameFontSize,
      font: serifFont,
      color: rgb(0.06, 0.09, 0.16),
    });

    // Course Completion Body Text
    const courseTitle = student.course || 'the training program';
    const startDate = student.start_date || 'TBD';
    const endDate = student.end_date || 'TBD';
    
    // We use a multi-line wrap approach or just center lines
    const line1 = `successfully completing the ${courseTitle}`;
    const line2 = `program conducted by Techmasters Trainings from ${startDate} to ${endDate},`;
    const line3 = `signifying successful acquisition of specialized professional skills.`;

    const textFontSize = 14;
    const bodyTextY = height * 0.38;

    [line1, line2, line3].forEach((line, idx) => {
      const lineWidth = regularFont.widthOfTextAtSize(line, textFontSize);
      page.drawText(line, {
        x: (width - lineWidth) / 2,
        y: bodyTextY - (idx * 20),
        size: textFontSize,
        font: regularFont,
        color: rgb(0.12, 0.16, 0.23),
      });
    });

    // Date Issued (Bottom Left)
    const today = new Date().toLocaleDateString('en-GB');
    page.drawText(`Date Issued: ${today}`, {
      x: 100,
      y: 95,
      size: 14,
      font: boldFont,
      color: rgb(0.06, 0.09, 0.16),
    });

    // Verification ID (Tiny footer)
    const certCode = `TM/CERT/${today.replace(/\//g, '')}/${(student.id || 100).toString().slice(-3)}`;
    page.drawText(`Verify: ${certCode}`, {
      x: 100,
      y: 75,
      size: 9,
      font: regularFont,
      color: rgb(0.4, 0.45, 0.5),
    });

    // Director Signature Placeholder
    page.drawText('Sachin Anil', {
      x: 580,
      y: 110,
      size: 18,
      font: boldFont,
      color: rgb(0.06, 0.09, 0.16),
    });
    page.drawText('Course Director', {
      x: 570,
      y: 85,
      size: 12,
      font: regularFont,
      color: rgb(0.3, 0.35, 0.4),
    });

    // 6. Finalize
    return await pdfDoc.save();
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    throw error;
  }
};
