const fs = require('fs');
const Pdfmake = require('pdfmake');
const testData = require('./testData');
const { formatCurrency } = require('./utils/formatters');

// GET TEST DATA
let rawData = fs.readFileSync('testData.json');
let testDataObj = JSON.parse(rawData);
const comp = testDataObj[0];
const allComps = testDataObj;
console.log(comp);
const createCompHeader = require('./pdfGenerators/createCompHeader');
const createCompSection1 = require('./pdfGenerators/createCompSection1');
const createCompSection2 = require('./pdfGenerators/createCompSection2');
const createSectionSeparator = require('./pdfGenerators/createSectionSeparator');
const createCompSection3 = require('./pdfGenerators/createCompSection3');
const createCompSection4 = require('./pdfGenerators/createCompSection4');

let compsObj = [];
for (let i = 0; i < allComps.length; i++) {
  compsObj.push(createCompHeader(allComps[i], i));
  compsObj.push(createCompSection1(allComps[i]));
  compsObj.push(createSectionSeparator());
  compsObj.push(createCompSection2(allComps[i]));
  compsObj.push(createSectionSeparator());
  compsObj.push(createCompSection3(allComps[i]));
  compsObj.push(createSectionSeparator());
  compsObj.push(createCompSection4(allComps[i]));
}

const createPdf = () => {
  var fonts = {
    Roboto: {
      normal: 'fonts/roboto/Roboto-Regular.ttf',
      bold: 'fonts/roboto/Roboto-Medium.ttf',
      italics: 'fonts/roboto/Roboto-Italic.ttf',
      bolditalics: 'fonts/roboto/Roboto-MediumItalic.ttf',
    },
  };

  let pdfmake = new Pdfmake(fonts);
  let docDefinition = {
    content: [...compsObj],
    footer: function (currentPage, pageCount) {
      return [
        { text: `Page ${currentPage} of ${pageCount}`, alignment: 'center' },
      ];
    },
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
        fillColor: 'blue',
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black',
      },
      compTableHeader: {
        bold: true,
        fontSize: 16,
        color: 'white',
      },
      compTableHeaderText: {
        fontSize: 16,
        color: 'white',
      },
      pageHeaderComp: {
        fillColor: 'blue',
      },
      compTableHeaderAddress: {
        fontSize: 14,
        color: 'white',
      },
      adjustedSubjectValue: {
        color: 'blue',
      },
      textBold: {
        bold: true,
      },
      adjustmentsHeader: {
        fontSize: 16,
        bold: true,
        color: 'blue',
      },
    },
    defaultStyle: {
      // alignment: 'justify'
    },
  };

  let chunks = [];

  let pdfDoc = pdfmake.createPdfKitDocument(docDefinition, {});
  pdfDoc.pipe(fs.createWriteStream('pdfs/test.pdf'));
  pdfDoc.end();

  pdfDoc.on('data', (chunk) => {
    chunks.push(chunk);
  });

  pdfDoc.on('end', () => {
    const result = Buffer.concat(chunks);
    console.log('DONE');
    //var s3 = new AWS.S3();

    // s3.putObject(
    //   {
    //     Bucket: s3UserFilesBucket,
    //     Key: "filename.pdf",
    //     Body: result
    //   },
    //   function(resp) {}
    // );
  });
};

module.exports = { createPdf };
