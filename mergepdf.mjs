import PDFMerger from 'pdf-merger-js';
import path from 'path';
import fs from 'fs';

const mergepdfs = async (filePaths) => {
  try {
    const merger = new PDFMerger();

    for (const filePath of filePaths) {
      await merger.add(filePath);
    }

    const outputPath = './pdf/merged.pdf';
    await merger.save(outputPath);

    console.log('PDF files merged successfully:', outputPath);
    return outputPath;
  } catch (error) {
    console.error('Error merging PDF files:', error);
    throw error;
  }
};


export default mergepdfs;

