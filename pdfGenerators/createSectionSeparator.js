const createSectionSeparator = () => {
  return {
    margin: [0, 10, 0, 10],
    table: {
      headerRows: 1,
      widths: ['100%'],
      body: [[''], ['']],
    },
    layout: 'headerLineOnly',
  };
};

module.exports = createSectionSeparator;
