const fs = require('fs');

const Pdfmake = require('pdfmake');

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl.';

const generatePdf = () => {
  var fonts = {
    Roboto: {
      normal: 'fonts/roboto/Roboto-Regular.ttf',
      bold: 'fonts/roboto/Roboto-Medium.ttf',
      italics: 'fonts/roboto/Roboto-Italic.ttf',
      bolditalics: 'fonts/roboto/Roboto-MediumItalic.ttf',
    },
  };

  let pdfmake = new Pdfmake(fonts);
  let docDefination = {
    content: ['Hello World!'],
  };

  let pdfDoc = pdfmake.createPdfKitDocument(docDefination, {});
  pdfDoc.pipe(fs.createWriteStream('pdfs/test.pdf'));
  pdfDoc.end();
};

module.exports = { generatePdf };
