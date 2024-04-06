const express = require('express');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const port = process.env.PORT || 3000;
const fs = require('fs').promises;


const app = express();


app.use('/static', express.static('public'));


app.post('/merge', upload.array('pdfs', 10), async (req, res) => {
  try {
    
    const { default: mergepdfs } = await import('./mergepdf.mjs');

    
    if (!req.files || req.files.length < 2) {
      console.error('Error: Please upload at least two PDF files.');
      return res.status(400).send('Please upload at least two PDF files.');
    }

  
    const filePaths = req.files.map(file => file.path);

  
    const mergedPdfPath = await mergepdfs(filePaths);

    
    console.log('Merged PDF file path:', mergedPdfPath);
    res.sendFile(path.resolve(mergedPdfPath));
  } catch (error) {
    console.error('Error occurred during file merging:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

